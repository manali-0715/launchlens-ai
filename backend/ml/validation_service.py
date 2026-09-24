class ValidationService:
    def generate_validation_insights(self, data: dict) -> dict:
        startup_name = data.get('startup_name', 'Your Startup')
        industry = data.get('industry', 'SaaS')
        problem = data.get('problem', '')
        solution = data.get('solution', '')
        business_model = data.get('business_model', 'B2B SaaS')
        target_audience = data.get('target_audience', 'Founders, SMEs, and Tech Teams')
        country = data.get('country', 'United States')
        competition_level = data.get('competition_level', 'Medium')
        planned_funding = float(data.get('planned_funding_usd') or 500000)

        # 1. Dynamic SWOT Analysis
        swot = {
            "strengths": [
                f"Direct, focused solution addressing a specific acute pain point in {industry}.",
                f"Modern, streamlined architecture leveraging automated workflows and AI-assisted intelligence.",
                f"Scalable unit economics supported by the {business_model} delivery model.",
                "Lean operating model with significantly lower fixed overhead compared to legacy incumbents."
            ],
            "weaknesses": [
                f"Early brand awareness and initial customer trust deficit relative to established players in {country}.",
                "Limited initial data moat; requires aggressive early user onboarding to calibrate predictive models.",
                "Dependencies on third-party APIs and cloud infrastructure for core service uptime.",
                "Single-threaded founding team or early-stage development velocity limitations."
            ],
            "opportunities": [
                f"Rapid structural shift towards digital-first and AI-augmented tools across {industry}.",
                "Unbundling complex, expensive enterprise software suites into modular, accessible software.",
                f"Expansion into underserved secondary regional markets across {country} and global equivalents.",
                "Strategic data partnerships and marketplace ecosystem integrations."
            ],
            "threats": [
                f"Incumbents rapidly shipping fast-follower features or bundling similar tools into existing subscriptions.",
                f"Rising customer acquisition costs (CAC) across digital ad channels in {industry}.",
                "Potential macroeconomic tightening affecting enterprise software budget approvals.",
                "Changing data privacy and regulatory compliance requirements (GDPR, SOC2, CCPA)."
            ]
        }

        # 2. Target Audience & Ideal Customer Profile (ICP)
        target_persona = {
            "primary_icp": {
                "segment_name": "Primary Adopters & High-Intent Operators",
                "demographics": f"Early-to-growth stage entrepreneurs, functional managers, and product leads in {industry}.",
                "organization_size": "10 - 250 employees or ambitious solo founders / boutique agencies.",
                "geography": f"{country} & High-density tech hubs.",
                "core_pain_points": [
                    f"Spending 15+ hours weekly manually analyzing problems solved by {solution[:60]}...",
                    "High cost and friction of hiring external consultants or navigating fragmented legacy tools.",
                    "Inability to make high-confidence strategic decisions due to lack of real-time market data."
                ],
                "willingness_to_pay": "High ($49 – $499 / month) if ROI can be proven within the first 14 days."
            },
            "secondary_icp": {
                "segment_name": "Consultants, Incubators & Advisory Partners",
                "description": "Venture studios, university startup incubators, accelerators, and independent advisors seeking standardized audit tools.",
                "willingness_to_pay": "Annual enterprise license ($2,500 – $10,000 / year)."
            },
            "acquisition_channels": [
                {
                    "channel": "Inbound Content & Programmatic SEO",
                    "tactics": f"Publishing deep-dive teardowns, benchmark data reports on {industry}, and free interactive ROI calculators.",
                    "cac_estimate": "$25 - $60 per qualified lead"
                },
                {
                    "channel": "Direct Founder Outreach & Communities",
                    "tactics": "Engaging on Product Hunt, Hacker News, Indie Hackers, LinkedIn, and specialized founder Slack/Discord groups.",
                    "cac_estimate": "$10 - $35 per organic signup"
                },
                {
                    "channel": "Ecosystem Partnerships",
                    "tactics": "Co-marketing with startup incubators, cloud credits providers (AWS Activate, Google Cloud), and academic institutions.",
                    "cac_estimate": "Revenue-share / minimal direct cash outlay"
                }
            ]
        }

        # 3. Business Model & Pricing Recommendations
        pricing_strategy = {
            "recommended_model": business_model,
            "monetization_logic": "Value-based tiered recurring subscription with self-serve onboarding and annual discount incentives.",
            "tiers": [
                {
                    "tier_name": "Starter / Solo",
                    "price": "$29/mo ($290/yr)",
                    "target": "Individual founders, researchers, and early ideators",
                    "features": [
                        "Up to 3 Active Project Validations",
                        "Automated Feasibility Score & Basic SWOT",
                        "Standard Competitor Directory Access",
                        "Community Discord Support"
                    ],
                    "cta": "Start Validating"
                },
                {
                    "tier_name": "Pro / Growth (Recommended)",
                    "price": "$89/mo ($890/yr)",
                    "target": "Active founders, startups raising capital, and growth teams",
                    "features": [
                        "Unlimited Idea Validations",
                        "Full ML Feasibility Breakdown & Confidence Metrics",
                        "Interactive 2x2 Competitor Positioning Matrix",
                        "Custom Ideal Customer Profile Generator",
                        "Full 8-Chapter Business Plan Generator (PDF Export)",
                        "AI Startup Co-Pilot Chatbot with Unlimited Prompts",
                        "Priority Email & Chat Support"
                    ],
                    "popular": True,
                    "cta": "Upgrade to Pro"
                },
                {
                    "tier_name": "Enterprise / Accelerator",
                    "price": "$299/mo or Custom",
                    "target": "Incubators, university labs, VC scouting teams, and agencies",
                    "features": [
                        "Everything in Pro with Team Multi-Seats (5+ Seats)",
                        "Bulk Idea Batch Scoring via REST API",
                        "Custom White-Label Business Plan Reports",
                        "Dedicated Account Manager & Strategy Review"
                    ],
                    "cta": "Contact Sales"
                }
            ],
            "projected_unit_economics": {
                "estimated_cac": "$85",
                "average_revenue_per_user_arpu": "$89 / mo",
                "estimated_customer_lifetime_months": "16 months",
                "projected_ltv": "$1,424",
                "ltv_to_cac_ratio": "16.7x (Exceptional unit economics efficiency)",
                "gross_margin": "82%",
                "months_to_cac_payback": "1.1 months"
            }
        }

        # 4. Comprehensive Risk Matrix
        risks = [
            {
                "category": "Market & Demand Risk",
                "risk": "Target customers may find free workaround solutions or exhibit slower purchasing velocity.",
                "likelihood": "Medium",
                "impact": "High",
                "score": 6,
                "mitigation": "Launch an interactive landing page waitlist and pre-sell pilot slots to validate willingness to pay before full production development."
            },
            {
                "category": "Competitive & Incumbent Risk",
                "risk": f"Large incumbents in {industry} could attempt to duplicate core functionality as an ancillary feature.",
                "likelihood": "High" if competition_level == "High" else "Medium",
                "impact": "Medium",
                "score": 6 if competition_level == "High" else 4,
                "mitigation": "Focus on high-speed vertical specialization, superior UX, and proprietary data pipelines that incumbents are too slow to prioritize."
            },
            {
                "category": "Execution & Velocity Risk",
                "risk": "Scope creep delaying MVP release and increasing burn rate beyond initial budget.",
                "likelihood": "Medium",
                "impact": "High",
                "score": 6,
                "mitigation": "Enforce a strict 6-week MVP timeline focusing solely on the core value loop. Use agile sprint iterations and user telemetry."
            },
            {
                "category": "Financial & Runway Risk",
                "risk": f"Planned funding of ${planned_funding:,.0f} may require capital discipline before reaching break-even.",
                "likelihood": "Low" if planned_funding >= 500000 else "Medium",
                "impact": "High",
                "score": 4 if planned_funding >= 500000 else 6,
                "mitigation": "Prioritize cash-flow positive enterprise pre-orders and annual upfront subscriptions to maintain self-sustaining runway."
            }
        ]

        return {
            "swot_analysis": swot,
            "target_persona": target_persona,
            "pricing_strategy": pricing_strategy,
            "risk_assessment": risks
        }

validation_service = ValidationService()
