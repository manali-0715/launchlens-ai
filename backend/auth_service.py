import os
import sqlite3
import hashlib
import secrets
import datetime
from typing import Optional, Dict, Any

DB_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), 'data', 'auth.db'))

class AuthService:
    def __init__(self, db_path: str = DB_PATH):
        self.db_path = db_path
        os.makedirs(os.path.dirname(self.db_path), exist_ok=True)
        self._init_db()

    def _get_connection(self):
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        return conn

    def _init_db(self):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    email TEXT UNIQUE NOT NULL,
                    password_hash TEXT NOT NULL,
                    salt TEXT NOT NULL,
                    full_name TEXT NOT NULL,
                    role TEXT NOT NULL,
                    created_at TEXT NOT NULL
                )
            ''')
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS sessions (
                    token TEXT PRIMARY KEY,
                    user_id INTEGER NOT NULL,
                    created_at TEXT NOT NULL,
                    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
                )
            ''')
            conn.commit()

        # Seed initial demo accounts if empty
        self._seed_default_users()

    def _hash_password(self, password: str, salt_hex: str) -> str:
        salt = bytes.fromhex(salt_hex)
        key = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100_000)
        return key.hex()

    def _seed_default_users(self):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT COUNT(*) as cnt FROM users')
            count = cursor.fetchone()['cnt']
            if count == 0:
                self.register_user(
                    email="founder@launchlens.ai",
                    password="password123",
                    full_name="Alex Founder",
                    role="Startup Founder"
                )
                self.register_user(
                    email="evaluator@atharva.edu",
                    password="password123",
                    full_name="Academic Evaluator",
                    role="Project Guide / Evaluator"
                )

    def register_user(self, email: str, password: str, full_name: str, role: str = "Founder") -> Dict[str, Any]:
        email_clean = email.strip().lower()
        if not email_clean or "@" not in email_clean:
            raise ValueError("Invalid email format.")
        if len(password) < 6:
            raise ValueError("Password must be at least 6 characters long.")
        if not full_name.strip():
            raise ValueError("Full name is required.")

        salt_hex = secrets.token_hex(16)
        pw_hash = self._hash_password(password, salt_hex)
        now_iso = datetime.datetime.now(datetime.timezone.utc).isoformat()

        try:
            with self._get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute('''
                    INSERT INTO users (email, password_hash, salt, full_name, role, created_at)
                    VALUES (?, ?, ?, ?, ?, ?)
                ''', (email_clean, pw_hash, salt_hex, full_name.strip(), role.strip(), now_iso))
                user_id = cursor.lastrowid
                conn.commit()
                
            return {
                "id": user_id,
                "email": email_clean,
                "full_name": full_name.strip(),
                "role": role.strip()
            }
        except sqlite3.IntegrityError:
            raise ValueError("An account with this email already exists.")

    def authenticate_user(self, email: str, password: str) -> Dict[str, Any]:
        email_clean = email.strip().lower()
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM users WHERE email = ?', (email_clean,))
            user = cursor.fetchone()

        if not user:
            raise ValueError("Invalid email or password.")

        expected_hash = self._hash_password(password, user['salt'])
        if not secrets.compare_digest(expected_hash, user['password_hash']):
            raise ValueError("Invalid email or password.")

        # Create session token
        token = secrets.token_hex(32)
        now_iso = datetime.datetime.now(datetime.timezone.utc).isoformat()

        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO sessions (token, user_id, created_at)
                VALUES (?, ?, ?)
            ''', (token, user['id'], now_iso))
            conn.commit()

        return {
            "token": token,
            "user": {
                "id": user['id'],
                "email": user['email'],
                "full_name": user['full_name'],
                "role": user['role']
            }
        }

    def verify_token(self, token: str) -> Optional[Dict[str, Any]]:
        if not token:
            return None
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                SELECT u.id, u.email, u.full_name, u.role
                FROM sessions s
                JOIN users u ON s.user_id = u.id
                WHERE s.token = ?
            ''', (token,))
            row = cursor.fetchone()

        if not row:
            return None

        return {
            "id": row['id'],
            "email": row['email'],
            "full_name": row['full_name'],
            "role": row['role']
        }

    def logout_token(self, token: str) -> bool:
        if not token:
            return False
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('DELETE FROM sessions WHERE token = ?', (token,))
            conn.commit()
            return cursor.rowcount > 0

auth_service = AuthService()
