class ChatService:
    def generate_chat_response(self, message: str, context: dict) -> dict:
        msg_lower = message.lower().strip()
        startup_name = context.get('startup_name', 'Your Startup')
        industry = context.get('industry', 'SaaS')
        problem = context.get('problem', '')
        solution = context.get('solution', '')
        business_model = context.get('business_model', 'B2B SaaS')
        feasibility_score = context.get('feasibility_score', 75)

        # Contextual prompt answering logic
        if any(w in msg_lower for w in ['pitch', 'deck', 'investor', 'raise', 'vc', 'angel']):
            reply = f"""### Pitch Deck & Investor Advisory for {startup_name}

Based on your **{feasibility_score}/100 Feasibility Score** in the **{industry}** sector, angel and seed investors will focus heavily on:

1. **Problem Urgency (Slide 2)**: Clearly show how severe the problem is (*"{problem[:80]}..."*). Quantify the financial or time lost by the customer per week without your solution.
2. **The "Why Now?" (Slide 4)**: Why hasn't this been solved before? Explain how recent shifts in technology or market demands have unlocked this opportunity.
3. **The Unfair Advantage (Slide 6)**: With {business_model}, your competitive moat must rely on proprietary workflows, speed-to-value, or data flywheel dynamics that incumbents cannot easily copy.
4. **Unit Economics & Traction (Slide 8)**: Show early proof of customer demand (letters of intent, waitlist signups, beta feedback). Aim to demonstrate a CAC payback period under 6 months.

**Pro-Tip**: Keep your deck to 10-12 slides. Don't drown investors in technical jargon—lead with customer pain and ROI."""

        elif any(w in msg_lower for w in ['mvp', 'feature', 'build', 'tech', 'stack', 'roadmap']):
            reply = f"""### Lean MVP Scoping Blueprint for {startup_name}

The #1 trap founders face is building too much before launching. Here is how you should scope your MVP:

- **Must-Have Core Loop (Week 1-4)**:
  * Single high-value workflow that directly solves: *"{problem[:70]}..."*
  * User onboarding + instant insight generation.
  * Simple Stripe/Paddle payment integration.
- **Defer to Post-Launch (Cut from MVP)**:
  * Complex multi-tenant enterprise role permissions.
  * Fancy AI agent orchestrations that don't directly add measurable value.
  * Custom white-labeling and secondary third-party integrations.

**Target Launch Date**: Ship a working beta to your first 15 target users within 4 to 6 weeks. Watch them use it live over Zoom to spot UX drop-offs."""

        elif any(w in msg_lower for w in ['customer', 'marketing', 'acquire', 'growth', 'sales', 'gtm', 'lead']):
            reply = f"""### Tactical Go-To-Market (GTM) Strategy for {startup_name}

To get your first 100 paying customers in {industry}:

1. **Do Things That Don't Scale (Day 1 - 30)**:
   * Direct personalized outreach to 150 ideal customer profiles on LinkedIn. Mention their specific pain point directly.
   * Offer a free 30-day white-glove onboarding in exchange for a recorded case study and video testimonial.
2. **Interactive Lead Magnets (Day 30 - 60)**:
   * Build a lightweight free calculator or diagnostic tool related to {industry} that captures user emails.
3. **Founder-Led Content**:
   * Share behind-the-scenes teardowns and lessons learned on Twitter/X, LinkedIn, and relevant Reddit/Substack communities.
4. **Referral Incentive Loop**:
   * Offer 2 months free subscription for every paying business they refer."""

        elif any(w in msg_lower for w in ['price', 'pricing', 'charge', 'money', 'revenue', 'monetize']):
            reply = f"""### Pricing & Monetization Optimization for {startup_name}

Since you are running a **{business_model}** model:

- **Avoid Underpricing**: Most early founders charge $9 or $19 and burn out on support costs. For B2B value, start at minimum **$49/mo** for Starter and **$149/mo** for Pro.
- **Value Metric**: Anchor your price to the metric that grows as they succeed (e.g. per project analyzed, per seat, or per volume tier).
- **Annual Discount**: Offer 2 months free for annual upfront payments (e.g. $890/year instead of $89/mo). This generates immediate upfront cash flow and slashes monthly churn.
- **Self-Serve Onboarding**: Let users start with a 14-day free trial or sample report without requiring credit cards upfront to maximize top-of-funnel velocity."""

        elif any(w in msg_lower for w in ['risk', 'competitor', 'threat', 'fail', 'weakness']):
            reply = f"""### Competitive Defense & Risk De-Risking for {startup_name}

Here is how you navigate competitive pressure in **{industry}**:

1. **Counter Incumbent Giants**: Larger incumbents move at bureaucratic speeds (6-9 month release cycles). Your primary weapon is **velocity and hyper-specialization**. Solve one problem 5x better than their bloated suite.
2. **Defensive Data Moats**: Accumulate proprietary user feedback loops that make your platform smarter with every interaction.
3. **Customer Retention**: High switching costs come from being deeply embedded in the user's daily workflow. Make export and integration seamless."""

        else:
            reply = f"""### LaunchLens Advisory Analysis

Regarding **{startup_name}** in the **{industry}** domain:

Your startup tackles: *"{problem if problem else 'an acute market challenge'}"* via: *"{solution if solution else 'an innovative AI-driven approach'}"*.

Key strategic recommendations:
1. **Validate Willingness to Pay First**: Before building complex secondary features, confirm that customers will commit cash or signed LOIs to solve this problem.
2. **Focus on Unit Economics**: With a {business_model} approach, maintaining a CAC payback period under 6 months and gross margins above 75% will make future fundraising straightforward.
3. **Leverage the LaunchLens Data**: Explore the real market benchmarks in the Dashboard to study how similar startups funded and scaled.

Ask me about your **pitch deck slides**, **pricing tiers**, **MVP feature list**, or **customer acquisition playbook**!"""

        return {
            "reply": reply,
            "startup_name": startup_name,
            "feasibility_score": feasibility_score
        }

chat_service = ChatService()
