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

interface Message {
  role: "ai" | "user";
  content: string;
}

/**
 * AI Financial Advisor chat component.
 * Provides mock AI-powered financial advice based on plan data.
 */
export default function AIAdvisor({ plan }: { plan: PlanData }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  /** Quick action buttons for common questions */
  const quickActions = [
    {
      label: "Təhsil xərcləri proqnozu",
      icon: GraduationCap,
      query: "təhsil",
    },
    { label: "İnvestisiya məsləhəti", icon: TrendingUp, query: "məsləhət" },
    { label: "18 yaş sonrası planlar", icon: Lightbulb, query: "18yaş" },
  ];

  /** Generate welcome message on mount */
  useEffect(() => {
    const insights = generateAIInsights(plan);
    setMessages([
      {
        role: "ai",
        content: `Salam! Mən sizin AI Maliyyə Məsləhətçinizəm.\n\nPlanınızı analiz etdim. İlk müşahidəm:\n\n${insights[0]}\n\nMənə suallarınızı verə bilərsiniz!`,
      },
    ]);
  }, [plan]);

  /** Scroll chat to bottom on new messages */
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  /**
   * Process user input and generate a mock AI response.
   * Uses keyword matching to select appropriate response type.
   */
  const processMessage = (query: string) => {
    const lowerQuery = query.toLowerCase();

    if (
      lowerQuery.includes("təhsil") ||
      lowerQuery.includes("universit") ||
      lowerQuery.includes("oxu")
    ) {
      const costs = predictEducationCosts(plan.planDuration);
      const finalValue = calculateFinalValue(plan);
      return `Təhsil Xərcləri Proqnozu (${plan.planDuration} il sonra)\n\n${costs
        .map(
          (c) =>
            `- ${c.region}: ${c.projectedCost.toLocaleString()} ₼ (4 illik)\n  Hal-hazırda: ${(c.currentCost * 4).toLocaleString()} ₼/il`
        )
        .join(
          "\n"
        )}\n\nSizin proqnozlaşdırılan məbləğ: ${finalValue.toLocaleString()} ₼\n\n${
        finalValue >= costs[0].projectedCost
          ? "Azərbaycanda təhsil xərclərini tam ödəyə bilərsiniz!"
          : "Hədəfə çatmaq üçün aylıq investisiyanı artırmağı tövsiyə edirik."
      }`;
    }

    if (
      lowerQuery.includes("məsləhət") ||
      lowerQuery.includes("artır") ||
      lowerQuery.includes("investisiya")
    ) {
      const insights = generateAIInsights(plan);
      return `İnvestisiya Məsləhəti\n\n${insights
        .slice(1)
        .map((i) => `- ${i}`)
        .join("\n\n")}`;
    }

    if (
      lowerQuery.includes("18") ||
      lowerQuery.includes("sonra") ||
      lowerQuery.includes("plan")
    ) {
      const suggestions = generatePost18Suggestions(plan);
      return `18 Yaş Sonrası Planlar\n\n${suggestions
        .map((s) => `${s.icon} ${s.title}\n${s.description}`)
        .join("\n\n")}`;
    }

    if (lowerQuery.includes("risk")) {
      return `Risk Profili Analizi\n\nHal-hazırda "${
        plan.riskLevel === "low"
          ? "Aşağı"
          : plan.riskLevel === "medium"
          ? "Orta"
          : "Yüksək"
      } Risk" profili seçmisiniz.\n\n${
        plan.riskLevel === "low"
          ? "Aşağı risk sabit gəlir verir, amma uzunmüddətli gəlir potensialı məhduddur. Uşağın yaşı kiçikdirsə, orta riskə keçmək daha faydalı ola bilər."
          : plan.riskLevel === "medium"
          ? "Orta risk optimal balansı təmin edir. Uzunmüddətli investisiya üçün ən çox tövsiyə olunan profildir."
          : "Yüksək risk ən böyük gəlir potensialını verir, amma qısamüddətli dalğalanmalar çox ola bilər. Uşağın yaşı 0-5 arasındadırsa, bu profil uyğundur."
      }`;
    }

    const finalValue = calculateFinalValue(plan);
    const europeCost = predictEducationCosts(plan.planDuration)[1]
      .projectedCost;
    const increase = calculateRecommendedIncrease(plan, europeCost);
    return `Mən aşağıdakı mövzularda kömək edə bilərəm:\n\n- Təhsil xərcləri proqnozu\n- İnvestisiya məsləhəti\n- 18 yaş sonrası planlar\n- Risk analizi\n\nProqnozlaşdırılan dəyər: ${finalValue.toLocaleString()} ₼${
      increase > 0
        ? `\n\nTövsiyə: Avropada təhsil üçün aylıq ${increase} ₼ əlavə investisiya edin.`
        : ""
    }`;
  };

  /** Handle sending a message */
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
      {/* Header */}
      <div className="bg-[#7F4CFF] p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">
              AI Maliyyə Məsləhətçisi
            </h3>
            <p className="text-white/70 text-xs">
              Süni intellekt ilə maliyyə analizi
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-3 border-b border-[#e2e8f0] flex gap-2 overflow-x-auto">
        {quickActions.map((action) => (
          <button
            key={action.query}
            onClick={() => handleSend(action.query)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#7F4CFF]/5 border border-[#7F4CFF]/20 text-xs font-medium text-[#7F4CFF] hover:bg-[#7F4CFF]/10 whitespace-nowrap"
          >
            <action.icon className="w-3.5 h-3.5" />
            {action.label}
          </button>
        ))}
      </div>

      {/* Chat Area */}
      <div ref={chatRef} className="h-80 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${
              msg.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === "ai"
                  ? "bg-[#7F4CFF]"
                  : "bg-gray-200"
              }`}
            >
              {msg.role === "ai" ? (
                <Bot className="w-4 h-4 text-white" />
              ) : (
                <User className="w-4 h-4 text-gray-600" />
              )}
            </div>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                msg.role === "ai"
                  ? "bg-gray-50 text-gray-800"
                  : "bg-[#7F4CFF] text-white"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#7F4CFF] flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-gray-50 rounded-2xl px-4 py-3 flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <span
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              />
              <span
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-[#e2e8f0]">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Sualınızı yazın..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#7F4CFF]/30 focus:border-[#7F4CFF]"
          />
          <button
            onClick={() => handleSend()}
            className="w-10 h-10 rounded-xl bg-[#7F4CFF] text-white flex items-center justify-center hover:bg-[#6A35E0]"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
