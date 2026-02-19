"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, Send, Bot, User, TrendingUp, GraduationCap, Lightbulb } from "lucide-react";
import { PlanData } from "@/lib/types";
import {
  generateAIInsights,
  predictEducationCosts,
  generatePost18Suggestions,
  calculateFinalValue,
  calculateRecommendedIncrease,
} from "@/lib/calculations";
import { useLanguage } from "@/lib/LanguageContext";

interface Message {
  role: "ai" | "user";
  content: string;
}

export default function AIAdvisor({ plan }: { plan: PlanData }) {
  const { t, lang } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { label: t("ai_action_education"), icon: GraduationCap, query: t("ai_keyword_education") },
    { label: t("ai_action_advice"), icon: TrendingUp, query: t("ai_keyword_advice") },
    { label: t("ai_action_post18"), icon: Lightbulb, query: "18" },
  ];

  useEffect(() => {
    const insights = generateAIInsights(plan, lang);
    setMessages([
      { role: "ai", content: t("ai_welcome", { insight: insights[0] }) },
    ]);
  }, [plan, lang, t]);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const processMessage = (query: string) => {
    const lq = query.toLowerCase();
    const isEn = lang === "en";

    const eduKeys = [t("ai_keyword_education"), t("ai_keyword_university"), t("ai_keyword_study")];
    const adviceKeys = [t("ai_keyword_advice"), t("ai_keyword_increase"), t("ai_keyword_investment")];
    const postKeys = ["18", t("ai_keyword_after"), t("ai_keyword_plan")];

    if (eduKeys.some((k) => lq.includes(k))) {
      const costs = predictEducationCosts(plan.planDuration);
      const fv = calculateFinalValue(plan);
      const header = isEn
        ? `Education Cost Forecast (in ${plan.planDuration} years)`
        : `Təhsil Xərcləri Proqnozu (${plan.planDuration} il sonra)`;
      const lines = costs.map((c) =>
        isEn
          ? `- ${c.region}: ${c.projectedCost.toLocaleString()} ₼ (4-year)\n  Currently: ${(c.currentCost * 4).toLocaleString()} ₼/yr`
          : `- ${c.region}: ${c.projectedCost.toLocaleString()} ₼ (4 illik)\n  Hal-hazırda: ${(c.currentCost * 4).toLocaleString()} ₼/il`
      );
      const yourAmount = isEn
        ? `Your projected amount: ${fv.toLocaleString()} ₼`
        : `Sizin proqnozlaşdırılan məbləğ: ${fv.toLocaleString()} ₼`;
      const verdict = fv >= costs[0].projectedCost
        ? (isEn ? "You can fully cover university costs in Azerbaijan!" : "Azərbaycanda təhsil xərclərini tam ödəyə bilərsiniz!")
        : (isEn ? "We recommend increasing your monthly investment to reach the target." : "Hədəfə çatmaq üçün aylıq investisiyanı artırmağı tövsiyə edirik.");
      return `${header}\n\n${lines.join("\n")}\n\n${yourAmount}\n\n${verdict}`;
    }

    if (adviceKeys.some((k) => lq.includes(k))) {
      const insights = generateAIInsights(plan, lang);
      const header = isEn ? "Investment Advice" : "İnvestisiya Məsləhəti";
      return `${header}\n\n${insights.slice(1).map((i) => `- ${i}`).join("\n\n")}`;
    }

    if (postKeys.some((k) => lq.includes(k))) {
      const suggestions = generatePost18Suggestions(plan, lang);
      const header = isEn ? "Post-18 Plans" : "18 Yaş Sonrası Planlar";
      return `${header}\n\n${suggestions.map((s) => `${s.icon} ${s.title}\n${s.description}`).join("\n\n")}`;
    }

    if (lq.includes("risk")) {
      const riskName = isEn
        ? (plan.riskLevel === "low" ? "Low" : plan.riskLevel === "medium" ? "Medium" : "High")
        : (plan.riskLevel === "low" ? "Aşağı" : plan.riskLevel === "medium" ? "Orta" : "Yüksək");
      const header = isEn ? "Risk Profile Analysis" : "Risk Profili Analizi";
      const detail = isEn
        ? (plan.riskLevel === "low"
          ? "Low risk provides stable income, but long-term return potential is limited. If the child is young, consider switching to medium risk."
          : plan.riskLevel === "medium"
          ? "Medium risk provides optimal balance. It's the most recommended profile for long-term investments."
          : "High risk offers the highest return potential, but short-term fluctuations can be significant. Suitable if the child is aged 0-5.")
        : (plan.riskLevel === "low"
          ? "Aşağı risk sabit gəlir verir, amma uzunmüddətli gəlir potensialı məhduddur. Uşağın yaşı kiçikdirsə, orta riskə keçmək daha faydalı ola bilər."
          : plan.riskLevel === "medium"
          ? "Orta risk optimal balansı təmin edir. Uzunmüddətli investisiya üçün ən çox tövsiyə olunan profildir."
          : "Yüksək risk ən böyük gəlir potensialını verir, amma qısamüddətli dalğalanmalar çox ola bilər. Uşağın yaşı 0-5 arasındadırsa, bu profil uyğundur.");
      return `${header}\n\n${isEn ? "Currently:" : "Hal-hazırda:"} "${riskName} Risk"\n\n${detail}`;
    }

    const fv = calculateFinalValue(plan);
    const europeCost = predictEducationCosts(plan.planDuration)[1].projectedCost;
    const increase = calculateRecommendedIncrease(plan, europeCost);

    if (isEn) {
      return `I can help you with:\n\n- Education cost forecast\n- Investment advice\n- Post-18 plans\n- Risk analysis\n\nProjected value: ${fv.toLocaleString()} ₼${increase > 0 ? `\n\nTip: Add ${increase} ₼/month for a European education plan.` : ""}`;
    }
    return `Mən aşağıdakı mövzularda kömək edə bilərəm:\n\n- Təhsil xərcləri proqnozu\n- İnvestisiya məsləhəti\n- 18 yaş sonrası planlar\n- Risk analizi\n\nProqnozlaşdırılan dəyər: ${fv.toLocaleString()} ₼${increase > 0 ? `\n\nTövsiyə: Avropada təhsil üçün aylıq ${increase} ₼ əlavə investisiya edin.` : ""}`;
  };

  const handleSend = (query?: string) => {
    const text = query || input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const response = processMessage(text);
      setMessages((prev) => [...prev, { role: "ai", content: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
      <div className="bg-[#7F4CFF] p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">{t("ai_title")}</h3>
            <p className="text-white/70 text-xs">{t("ai_subtitle")}</p>
          </div>
        </div>
      </div>

      <div className="p-3 border-b border-[#e2e8f0] flex gap-2 overflow-x-auto">
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={() => handleSend(action.query)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#7F4CFF]/5 border border-[#7F4CFF]/20 text-xs font-medium text-[#7F4CFF] hover:bg-[#7F4CFF]/10 whitespace-nowrap"
          >
            <action.icon className="w-3.5 h-3.5" />
            {action.label}
          </button>
        ))}
      </div>

      <div ref={chatRef} className="h-80 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "ai" ? "bg-[#7F4CFF]" : "bg-gray-200"}`}>
              {msg.role === "ai" ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-gray-600" />}
            </div>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${msg.role === "ai" ? "bg-gray-50 text-gray-800" : "bg-[#7F4CFF] text-white"}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#7F4CFF] flex items-center justify-center flex-shrink-0"><Bot className="w-4 h-4 text-white" /></div>
            <div className="bg-gray-50 rounded-2xl px-4 py-3 flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
            </div>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-[#e2e8f0]">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={t("ai_placeholder")}
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#7F4CFF]/30 focus:border-[#7F4CFF]"
          />
          <button onClick={() => handleSend()} className="w-10 h-10 rounded-xl bg-[#7F4CFF] text-white flex items-center justify-center hover:bg-[#6A35E0]">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
