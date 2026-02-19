/** Supported languages */
export type Lang = "az" | "en";

/** Full translation dictionary keyed by language */
export const translations: Record<Lang, Record<string, string>> = {
  az: {
    // ── Navbar ──
    nav_home: "Ana Səhifə",
    nav_plan: "Plan Yarat",
    nav_dashboard: "İdarə Paneli",
    nav_ai_badge: "AI Dəstəkli",

    // ── Footer ──
    footer_brand: "Child Investment Plan",
    footer_description:
      "Uşağınızın gələcəyini bu gündən təmin edin. İnvestisiya və həyat sığortası ilə etibarlı plan.",
    footer_quick_links: "Sürətli Keçidlər",
    footer_contact: "Əlaqə",
    footer_disclaimer:
      "© 2026 Child Investment Plan. Bütün hüquqlar qorunur. Bu demo məhsuludur və real maliyyə məsləhəti deyil. İnvestisiya qərarları şəxsi araşdırmaya əsaslanmalıdır.",

    // ── Landing: Hero ──
    hero_badge: "AI-dəstəkli investisiya platforması",
    hero_title_1: "Uşağının gələcəyini",
    hero_title_2: "bu gündən qur.",
    hero_subtitle:
      "İnvestisiya + Həyat Sığortası + AI dəstəyi ilə uşağınızın 18 yaşına qədər maliyyə gələcəyini təmin edin. Hər ay kiçik məbləğlər, böyük nəticələr.",
    hero_cta: "Plan yarat",
    hero_cta_secondary: "Daha ətraflı",
    stat_active_plans: "Aktiv Plan",
    stat_total_investment: "Ümumi İnvestisiya",
    stat_satisfaction: "Müştəri Məmnuniyyəti",
    stat_avg_return: "Orta İllik Gəlir",

    // ── Landing: Features ──
    features_title_1: "Niyə",
    features_title_2: "Child Plan",
    features_subtitle:
      "Bir platformada investisiya, sığorta və süni intellekt dəstəyi ilə uşağınız üçün ən yaxşı planı qurun.",
    feature_portfolio_title: "İnvestisiya Portfeli",
    feature_portfolio_desc:
      "ABŞ ETF, Qlobal İndeks və Texnologiya fondlarına aylıq investisiya ilə uşağınızın gələcəyini qurun.",
    feature_insurance_title: "Həyat Sığortası",
    feature_insurance_desc:
      "Valideyn vəfat edərsə plan davam edəcək. Uşağınızın gələcəyi hər şəraitdə təmin olunur.",
    feature_ai_title: "AI Dəstəyi",
    feature_ai_desc:
      "Süni intellekt ilə təhsil xərcləri proqnozu, investisiya məsləhəti və maliyyə planlaşdırması.",

    // ── Landing: How it works ──
    how_title: "Necə işləyir?",
    how_subtitle: "4 sadə addımda uşağınızın maliyyə gələcəyini planlaşdırın",
    how_step1_title: "Planınızı yaradın",
    how_step1_desc:
      "Uşağınızın yaşını, plan müddətini və aylıq investisiya məbləğini seçin.",
    how_step2_title: "Risk profilinizi seçin",
    how_step2_desc:
      "Aşağı, orta və ya yüksək risk profilindən birini seçərək portfelinizi formalaşdırın.",
    how_step3_title: "AI ilə optimallaşdırın",
    how_step3_desc:
      "AI Məsləhətçi sizə ən uyğun strategiyanı tövsiyə edəcək.",
    how_step4_title: "Gələcəyi izləyin",
    how_step4_desc:
      "İdarə panelindən investisiyanızın böyüməsini real vaxt rejimində izləyin.",

    // ── Landing: Benefits ──
    benefits_title_1: "Uşağınız üçün",
    benefits_title_2: "ən yaxşı investisiya",
    benefit_1: "Gündəlik 1 ₼-dən başlayan aylıq investisiya planları",
    benefit_2: "ABŞ və Avropa bazarlarına birbaşa çıxış",
    benefit_3: "Həyat sığortası ilə tam qorunma",
    benefit_4: "AI dəstəkli maliyyə məsləhətçisi",
    benefit_5: "Təhsil xərcləri proqnozu və planlaşdırma",
    benefit_6: "18 yaş sonrası davamlılıq planları",
    benefits_cta: "İndi başla",
    card_projected_value: "Proqnozlaşdırılan dəyər",
    card_return: "+234% gəlir (18 il)",
    card_insurance_label: "Həyat Sığortası",
    card_insurance_active: "Tam qorunma aktiv",
    card_rating: "4.9/5 Reytinq",

    // ── Landing: CTA ──
    cta_title: "Gələcəyə investisiya bu gün başlayır",
    cta_subtitle:
      "Hər keçən gün uşağınızın gələcəyi üçün bir fürsətdir. İndi plan yaradın və sabit maliyyə gələcəyini təmin edin.",

    // ── Plan Wizard: Step Titles ──
    step_personal: "Şəxsi Məlumatlar",
    step_investment: "İnvestisiya",
    step_portfolio: "Portfel",
    step_insurance: "Sığorta",
    step_summary: "Nəticə",

    // ── Plan Step 1 ──
    s1_title: "Şəxsi Məlumatlar",
    s1_subtitle: "Planı fərdiləşdirmək üçün əsas məlumatları daxil edin",
    s1_parent_age: "Valideyn yaşı",
    s1_child_age: "Uşağın yaşı",
    s1_plan_duration: "Plan müddəti",
    s1_age_suffix: "yaş",
    s1_year_suffix: "il",
    s1_until_age: "Uşaq {age} yaşına çatana qədər",

    // ── Plan Step 2 ──
    s2_title: "İnvestisiya Parametrləri",
    s2_subtitle: "Aylıq investisiya məbləği və risk profilini seçin",
    s2_plan_type: "Plan tipi",
    s2_plan_standard_desc:
      "Aylıq məbləğin 100%-i investisiyaya yönləndirilir.",
    s2_plan_safe_desc:
      "Aylıq məbləğin {savings}%-i yığıma, {investment}%-i investisiyaya yönləndirilir.",
    s2_plan_standard_info:
      "Aylıq məbləğin 100%-i investisiyaya yönləndirilir.",
    s2_plan_safe_info:
      "Aylıq məbləğin {savings}%-i təminatlı yığıma (illik 5%), {investment}%-i investisiya portfelinə yönləndirilir.",
    s2_monthly_amount: "Aylıq investisiya məbləği",
    s2_per_month: "/ay",
    s2_risk_selection: "Risk seçimi",
    risk_low: "Aşağı risk",
    risk_medium: "Orta risk",
    risk_high: "Yüksək risk",
    risk_low_desc: "Sabit gəlir, minimal dalğalanma",
    risk_medium_desc: "Balanslaşdırılmış, optimal gəlir",
    risk_high_desc: "Maksimal gəlir potensialı",
    risk_annual: "illik",

    // ── Plan Step 3 ──
    s3_title: "Portfel Bölgüsü",
    s3_subtitle: "Seçilmiş risk profilinə uyğun portfel strukturu",
    s3_subtitle_safe: "Təhlükəsiz plan: yığım + investisiya portfeli",
    s3_monthly_split: "Aylıq bölgü",
    s3_savings_part: "Yığım hissəsi",
    s3_investment_part: "İnvestisiya hissəsi",
    s3_guaranteed: "İllik 5% təminatlı",
    s3_portfolio_based: "Portfel əsaslı",
    s3_per_month: "/ay",
    s3_portfolio_pct: "portfel",
    s3_projected_growth: "Proqnozlaşdırılan Artım",
    s3_total_invested: "Ümumi İnvestisiya",
    s3_total_payment: "Ümumi Ödəniş",
    s3_projected_value: "Proqnoz Dəyəri",
    s3_net_profit: "Xalis Mənfəət",
    s3_total_forecast: "Cəmi proqnoz",

    // ── Plan Step 4 ──
    s4_title: "Həyat Sığortası",
    s4_subtitle: "Uşağınızın gələcəyini hər şəraitdə təmin edin",
    s4_plan_title: "Həyat Sığortası Planı",
    s4_coverage: "Sığorta Məbləği",
    s4_premium: "Aylıq Premium",
    s4_benefit1_title: "Valideyn vəfat edərsə plan davam edəcək",
    s4_benefit1_desc:
      "Sığorta şirkəti qalan investisiya haqlarını ödəyəcək və plan müddəti bitənə qədər davam edəcək.",
    s4_benefit2_title: "Tam təminat",
    s4_benefit2_desc:
      "Proqnozlaşdırılan dəyərin 120%-i qədər sığorta təminatı ilə uşağınız tam qorunur.",
    s4_note_title: "Qeyd",
    s4_note_desc:
      "Sığorta premium məbləği investisiya haqlarına əlavə olaraq tutulur. Real premium məbləğ sığorta müqaviləsinə əsasən dəyişə bilər.",

    // ── Plan Step 5 ──
    s5_title: "Plan Xülasəsi",
    s5_subtitle: "Planınızı yoxlayın və təsdiqləyin",
    s5_parent_age: "Valideyn Yaşı",
    s5_child_age: "Uşağın Yaşı",
    s5_plan_duration: "Plan Müddəti",
    s5_monthly_amount: "Aylıq Məbləğ",
    s5_plan_type: "Plan Tipi",
    s5_risk_profile: "Risk Profili",
    s5_safe_split_title: "Təhlükəsiz Plan Bölgüsü",
    s5_total_payment: "Ümumi Ödəniş",
    s5_projected_value: "Proqnoz Dəyəri",
    s5_insurance_coverage: "Sığorta Təminatı",
    s5_monthly_total_payment: "Aylıq Ümumi Ödəniş",
    s5_monthly_total_sub: "İnvestisiya + Sığorta Premium",

    // ── Plan Navigation ──
    nav_back: "Geri",
    nav_continue: "Davam et",
    nav_confirm: "Planı Təsdiqlə",

    // ── Dashboard ──
    dash_title: "İdarə Paneli",
    dash_subtitle: "Uşağınızın investisiya planının ümumi görünüşü",
    dash_no_plan_title: "Hələ plan yaradılmayıb",
    dash_no_plan_desc:
      "İdarə panelinə baxmaq üçün əvvəlcə investisiya planınızı yaradın.",
    dash_create_plan: "Plan Yarat",
    dash_current_value: "Cari Portfel Dəyəri",
    dash_total_balance: "Ümumi balans",
    dash_projected_value: "Proqnoz Dəyəri (18 yaş)",
    dash_insurance: "Sığorta Təminatı",
    dash_active: "Aktiv",
    dash_net_profit: "Xalis Mənfəət",
    dash_safe_balances_title: "Təhlükəsiz Plan Balansları",
    dash_safe_balances_desc: "Aylıq {amount} ₼: {savings}% yığım + {investment}% investisiya",
    dash_savings_balance: "Yığım balansı",
    dash_investment_balance: "İnvestisiya balansı",
    dash_overall_balance: "Ümumi balans",
    dash_forecast: "Proqnoz",
    dash_chart_title: "İnvestisiya Artım Qrafiki",
    dash_chart_title_safe: "Yığım + İnvestisiya Artım Qrafiki",
    dash_chart_subtitle: "İnvestisiya vs Proqnoz dəyəri",
    dash_chart_subtitle_safe: "Yığım, İnvestisiya və Cəmi proqnoz",
    dash_chart_invested: "İnvestisiya",
    dash_chart_payment: "Ödəniş",
    dash_chart_savings: "Yığım",
    dash_chart_projected: "Proqnoz",
    dash_chart_total: "Cəmi",
    dash_edu_title: "Təhsil Xərcləri Müqayisəsi",
    dash_edu_subtitle: "{years} il sonra universitetin proqnoz xərcləri (4 illik)",
    dash_edu_current: "Cari Xərc",
    dash_edu_projected: "Proqnoz Xərc",
    dash_edu_your_amount: "Sizin proqnozlaşdırılan məbləğ:",
    dash_ai_title: "AI Anlayışları",
    dash_ai_subtitle: "Planınız haqqında süni intellekt qeydləri",
    dash_portfolio_title: "Portfel Bölgüsü",
    dash_plan_details: "Plan Detalları",
    dash_plan_type: "Plan Tipi",
    dash_monthly_amount: "Aylıq Məbləğ",
    dash_savings_part: "Yığım hissəsi",
    dash_investment_part: "İnvestisiya hissəsi",
    dash_plan_duration: "Plan Müddəti",
    dash_child_age: "Uşağın Yaşı",
    dash_target_age: "Hədəf Yaş",
    dash_risk_profile: "Risk Profili",
    dash_progress: "İrəliləmə",
    label_age: "yaş",
    label_year: "il",
    label_per_month: "/ay",

    // ── AI Advisor ──
    ai_title: "AI Maliyyə Məsləhətçisi",
    ai_subtitle: "Süni intellekt ilə maliyyə analizi",
    ai_action_education: "Təhsil xərcləri proqnozu",
    ai_action_advice: "İnvestisiya məsləhəti",
    ai_action_post18: "18 yaş sonrası planlar",
    ai_placeholder: "Sualınızı yazın...",
    ai_welcome:
      "Salam! Mən sizin AI Maliyyə Məsləhətçinizəm.\n\nPlanınızı analiz etdim. İlk müşahidəm:\n\n{insight}\n\nMənə suallarınızı verə bilərsiniz!",
    ai_keyword_education: "təhsil",
    ai_keyword_university: "universit",
    ai_keyword_study: "oxu",
    ai_keyword_advice: "məsləhət",
    ai_keyword_increase: "artır",
    ai_keyword_investment: "investisiya",
    ai_keyword_after: "sonra",
    ai_keyword_plan: "plan",

    // ── Chart labels ──
    chart_age: "Yaş",

    // ── Shared labels ──
    plan_type_standard: "Standart (İnvestisiya əsaslı)",
    plan_type_safe: "Təhlükəsiz (Yığım + İnvestisiya)",
    plan_type_standard_short: "Standart",
    plan_type_safe_short: "Təhlükəsiz",
  },

  en: {
    // ── Navbar ──
    nav_home: "Home",
    nav_plan: "Create Plan",
    nav_dashboard: "Dashboard",
    nav_ai_badge: "AI Powered",

    // ── Footer ──
    footer_brand: "Child Investment Plan",
    footer_description:
      "Secure your child's future starting today. A reliable plan with investment and life insurance.",
    footer_quick_links: "Quick Links",
    footer_contact: "Contact",
    footer_disclaimer:
      "© 2026 Child Investment Plan. All rights reserved. This is a demo product and not real financial advice. Investment decisions should be based on personal research.",

    // ── Landing: Hero ──
    hero_badge: "AI-powered investment platform",
    hero_title_1: "Build your child's future",
    hero_title_2: "starting today.",
    hero_subtitle:
      "Secure your child's financial future until age 18 with investment + life insurance + AI support. Small monthly amounts, big results.",
    hero_cta: "Create plan",
    hero_cta_secondary: "Learn more",
    stat_active_plans: "Active Plans",
    stat_total_investment: "Total Investment",
    stat_satisfaction: "Customer Satisfaction",
    stat_avg_return: "Avg. Annual Return",

    // ── Landing: Features ──
    features_title_1: "Why",
    features_title_2: "Child Plan",
    features_subtitle:
      "Build the best plan for your child with investment, insurance, and AI support on one platform.",
    feature_portfolio_title: "Investment Portfolio",
    feature_portfolio_desc:
      "Build your child's future with monthly investments in US ETF, Global Index, and Technology funds.",
    feature_insurance_title: "Life Insurance",
    feature_insurance_desc:
      "If the parent passes away, the plan continues. Your child's future is secured in all circumstances.",
    feature_ai_title: "AI Support",
    feature_ai_desc:
      "Education cost forecasts, investment advice, and financial planning powered by artificial intelligence.",

    // ── Landing: How it works ──
    how_title: "How does it work?",
    how_subtitle:
      "Plan your child's financial future in 4 simple steps",
    how_step1_title: "Create your plan",
    how_step1_desc:
      "Choose your child's age, plan duration, and monthly investment amount.",
    how_step2_title: "Select risk profile",
    how_step2_desc:
      "Shape your portfolio by choosing from low, medium, or high risk profiles.",
    how_step3_title: "Optimize with AI",
    how_step3_desc:
      "The AI Advisor will recommend the most suitable strategy for you.",
    how_step4_title: "Track the future",
    how_step4_desc:
      "Monitor your investment growth in real-time from the dashboard.",

    // ── Landing: Benefits ──
    benefits_title_1: "The best investment",
    benefits_title_2: "for your child",
    benefit_1: "Monthly investment plans starting from 1 ₼/day",
    benefit_2: "Direct access to US and European markets",
    benefit_3: "Full protection with life insurance",
    benefit_4: "AI-powered financial advisor",
    benefit_5: "Education cost forecasting and planning",
    benefit_6: "Post-18 continuity plans",
    benefits_cta: "Start now",
    card_projected_value: "Projected value",
    card_return: "+234% return (18 yrs)",
    card_insurance_label: "Life Insurance",
    card_insurance_active: "Full protection active",
    card_rating: "4.9/5 Rating",

    // ── Landing: CTA ──
    cta_title: "Investing in the future starts today",
    cta_subtitle:
      "Every passing day is an opportunity for your child's future. Create a plan now and secure a stable financial future.",

    // ── Plan Wizard: Step Titles ──
    step_personal: "Personal Info",
    step_investment: "Investment",
    step_portfolio: "Portfolio",
    step_insurance: "Insurance",
    step_summary: "Summary",

    // ── Plan Step 1 ──
    s1_title: "Personal Information",
    s1_subtitle: "Enter basic information to personalize the plan",
    s1_parent_age: "Parent age",
    s1_child_age: "Child's age",
    s1_plan_duration: "Plan duration",
    s1_age_suffix: "yrs",
    s1_year_suffix: "yrs",
    s1_until_age: "Until the child reaches age {age}",

    // ── Plan Step 2 ──
    s2_title: "Investment Parameters",
    s2_subtitle: "Choose monthly investment amount and risk profile",
    s2_plan_type: "Plan type",
    s2_plan_standard_desc:
      "100% of the monthly amount goes to investment.",
    s2_plan_safe_desc:
      "{savings}% of the monthly amount goes to savings, {investment}% to investment.",
    s2_plan_standard_info:
      "100% of the monthly amount is directed to investment.",
    s2_plan_safe_info:
      "{savings}% of the monthly amount goes to guaranteed savings (5% annual), {investment}% to the investment portfolio.",
    s2_monthly_amount: "Monthly investment amount",
    s2_per_month: "/mo",
    s2_risk_selection: "Risk selection",
    risk_low: "Low risk",
    risk_medium: "Medium risk",
    risk_high: "High risk",
    risk_low_desc: "Stable income, minimal fluctuation",
    risk_medium_desc: "Balanced, optimal returns",
    risk_high_desc: "Maximum return potential",
    risk_annual: "annual",

    // ── Plan Step 3 ──
    s3_title: "Portfolio Allocation",
    s3_subtitle: "Portfolio structure based on selected risk profile",
    s3_subtitle_safe: "Safe plan: savings + investment portfolio",
    s3_monthly_split: "Monthly split",
    s3_savings_part: "Savings portion",
    s3_investment_part: "Investment portion",
    s3_guaranteed: "5% annual guaranteed",
    s3_portfolio_based: "Portfolio based",
    s3_per_month: "/mo",
    s3_portfolio_pct: "portfolio",
    s3_projected_growth: "Projected Growth",
    s3_total_invested: "Total Invested",
    s3_total_payment: "Total Payment",
    s3_projected_value: "Projected Value",
    s3_net_profit: "Net Profit",
    s3_total_forecast: "Total forecast",

    // ── Plan Step 4 ──
    s4_title: "Life Insurance",
    s4_subtitle: "Secure your child's future in all circumstances",
    s4_plan_title: "Life Insurance Plan",
    s4_coverage: "Coverage Amount",
    s4_premium: "Monthly Premium",
    s4_benefit1_title: "Plan continues if parent passes away",
    s4_benefit1_desc:
      "The insurance company will cover remaining investment payments and the plan will continue until maturity.",
    s4_benefit2_title: "Full coverage",
    s4_benefit2_desc:
      "Your child is fully protected with insurance coverage of 120% of the projected value.",
    s4_note_title: "Note",
    s4_note_desc:
      "Insurance premium is charged in addition to investment fees. Actual premium may vary based on the insurance contract.",

    // ── Plan Step 5 ──
    s5_title: "Plan Summary",
    s5_subtitle: "Review and confirm your plan",
    s5_parent_age: "Parent Age",
    s5_child_age: "Child's Age",
    s5_plan_duration: "Plan Duration",
    s5_monthly_amount: "Monthly Amount",
    s5_plan_type: "Plan Type",
    s5_risk_profile: "Risk Profile",
    s5_safe_split_title: "Safe Plan Breakdown",
    s5_total_payment: "Total Payment",
    s5_projected_value: "Projected Value",
    s5_insurance_coverage: "Insurance Coverage",
    s5_monthly_total_payment: "Monthly Total Payment",
    s5_monthly_total_sub: "Investment + Insurance Premium",

    // ── Plan Navigation ──
    nav_back: "Back",
    nav_continue: "Continue",
    nav_confirm: "Confirm Plan",

    // ── Dashboard ──
    dash_title: "Dashboard",
    dash_subtitle: "Overview of your child's investment plan",
    dash_no_plan_title: "No plan created yet",
    dash_no_plan_desc:
      "Create your investment plan first to view the dashboard.",
    dash_create_plan: "Create Plan",
    dash_current_value: "Current Portfolio Value",
    dash_total_balance: "Total balance",
    dash_projected_value: "Projected Value (Age 18)",
    dash_insurance: "Insurance Coverage",
    dash_active: "Active",
    dash_net_profit: "Net Profit",
    dash_safe_balances_title: "Safe Plan Balances",
    dash_safe_balances_desc: "Monthly {amount} ₼: {savings}% savings + {investment}% investment",
    dash_savings_balance: "Savings balance",
    dash_investment_balance: "Investment balance",
    dash_overall_balance: "Total balance",
    dash_forecast: "Forecast",
    dash_chart_title: "Investment Growth Chart",
    dash_chart_title_safe: "Savings + Investment Growth Chart",
    dash_chart_subtitle: "Investment vs Projected value",
    dash_chart_subtitle_safe: "Savings, Investment and Total forecast",
    dash_chart_invested: "Investment",
    dash_chart_payment: "Payment",
    dash_chart_savings: "Savings",
    dash_chart_projected: "Projected",
    dash_chart_total: "Total",
    dash_edu_title: "Education Cost Comparison",
    dash_edu_subtitle: "Projected university costs in {years} years (4-year)",
    dash_edu_current: "Current Cost",
    dash_edu_projected: "Projected Cost",
    dash_edu_your_amount: "Your projected amount:",
    dash_ai_title: "AI Insights",
    dash_ai_subtitle: "AI notes about your plan",
    dash_portfolio_title: "Portfolio Allocation",
    dash_plan_details: "Plan Details",
    dash_plan_type: "Plan Type",
    dash_monthly_amount: "Monthly Amount",
    dash_savings_part: "Savings portion",
    dash_investment_part: "Investment portion",
    dash_plan_duration: "Plan Duration",
    dash_child_age: "Child's Age",
    dash_target_age: "Target Age",
    dash_risk_profile: "Risk Profile",
    dash_progress: "Progress",
    label_age: "yrs",
    label_year: "yrs",
    label_per_month: "/mo",

    // ── AI Advisor ──
    ai_title: "AI Financial Advisor",
    ai_subtitle: "Financial analysis with AI",
    ai_action_education: "Education cost forecast",
    ai_action_advice: "Investment advice",
    ai_action_post18: "Post-18 plans",
    ai_placeholder: "Type your question...",
    ai_welcome:
      "Hello! I'm your AI Financial Advisor.\n\nI've analyzed your plan. My first observation:\n\n{insight}\n\nFeel free to ask me questions!",
    ai_keyword_education: "education",
    ai_keyword_university: "universit",
    ai_keyword_study: "study",
    ai_keyword_advice: "advice",
    ai_keyword_increase: "increase",
    ai_keyword_investment: "invest",
    ai_keyword_after: "after",
    ai_keyword_plan: "plan",

    // ── Chart labels ──
    chart_age: "Age",

    // ── Shared labels ──
    plan_type_standard: "Standard (Investment-based)",
    plan_type_safe: "Safe (Savings + Investment)",
    plan_type_standard_short: "Standard",
    plan_type_safe_short: "Safe",
  },
};
