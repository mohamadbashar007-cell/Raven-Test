import React, { useState } from "react";
import type { ParticipantInfo } from "../App";
import { Brain, Timer, Award, Play, UserRound } from "lucide-react";
import { publicAsset } from "../utils/publicAsset";

interface TestWelcomeProps {
  onStart: (participant: ParticipantInfo, mode: "standard" | "learning", lang: "ar" | "en") => void;
  lang: "ar" | "en";
  setLang: (lang: "ar" | "en") => void;
}

export const TestWelcome: React.FC<TestWelcomeProps> = ({ onStart, lang }) => {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("18");
  const [error, setError] = useState("");
  const isAr = lang === "ar";

  const handleStart = () => {
    const parsedAge = Number.parseFloat(age);
    if (fullName.trim().length < 3) {
      setError(isAr ? "يرجى إدخال الاسم الكامل." : "Please enter the full name.");
      return;
    }
    if (!Number.isFinite(parsedAge) || parsedAge < 5.5 || parsedAge > 100) {
      setError(isAr ? "يرجى إدخال عمر صحيح بين 5.5 و 100 سنة." : "Please enter a valid age between 5.5 and 100.");
      return;
    }
    setError("");
    onStart({ fullName: fullName.trim(), age: parsedAge }, "standard", lang);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4" dir={isAr ? "rtl" : "ltr"}>
      <div className="text-center my-8 max-w-3xl mx-auto">
        <img
          src={publicAsset("logo.jpg")}
          alt={isAr ? "شعار مؤسسة الإمام أحمد بن حنبل" : "Imam Ahmad ibn Hanbal Foundation logo"}
          className="h-28 md:h-36 w-auto object-contain mx-auto mb-6"
          draggable={false}
        />
        <p className="text-xs font-bold text-slate-500 mb-3">
          {isAr ? "مؤسسة الإمام أحمد بن حنبل" : "Imam Ahmad ibn Hanbal Foundation"}
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-950 leading-tight mb-4">
          {isAr ? "اختبار رافن للمصفوفات المتتابعة" : "Raven's Standard Progressive Matrices"}
        </h2>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          {isAr
            ? "اختبار غير لفظي لقياس القدرة على الاستدلال المجرد وحل المشكلات البصرية. مدة الاختبار 40 دقيقة، وينتهي تلقائياً عند انتهاء الوقت."
            : "A non-verbal assessment of abstract reasoning and visual problem solving. The exam lasts 40 minutes and closes automatically when time expires."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm text-center">
          <Brain className="w-9 h-9 text-slate-800 mx-auto mb-3" />
          <h3 className="font-bold text-gray-900 text-base mb-1">{isAr ? "60 سؤالاً" : "60 Items"}</h3>
          <p className="text-xs text-gray-500 leading-normal">
            {isAr ? "خمس مجموعات متدرجة الصعوبة من A إلى E." : "Five progressively harder sets from A to E."}
          </p>
        </div>
        <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm text-center">
          <Timer className="w-9 h-9 text-slate-800 mx-auto mb-3" />
          <h3 className="font-bold text-gray-900 text-base mb-1">{isAr ? "40 دقيقة" : "40 Minutes"}</h3>
          <p className="text-xs text-gray-500 leading-normal">
            {isAr ? "يغلق الاختبار تلقائياً وتحسب النتيجة عند انتهاء الوقت." : "The exam submits automatically when the timer reaches zero."}
          </p>
        </div>
        <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm text-center">
          <Award className="w-9 h-9 text-slate-800 mx-auto mb-3" />
          <h3 className="font-bold text-gray-900 text-base mb-1">{isAr ? "تقرير منظم" : "Structured Report"}</h3>
          <p className="text-xs text-gray-500 leading-normal">
            {isAr ? "درجة خام، نسبة مئوية، تصنيف، ورسم بياني للأداء." : "Raw score, percentile, classification, and performance chart."}
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm max-w-2xl mx-auto">
        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <UserRound className="w-5 h-5 text-slate-700" />
          <span>{isAr ? "بيانات المتقدم" : "Participant Details"}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-500 mb-2">
              {isAr ? "الاسم الكامل" : "Full name"}
            </label>
            <input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800"
              placeholder={isAr ? "اكتب الاسم الكامل" : "Enter full name"}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2">
              {isAr ? "العمر بالسنوات" : "Age in years"}
            </label>
            <input
              value={age}
              onChange={(event) => setAge(event.target.value)}
              type="number"
              min="5.5"
              max="100"
              step="0.5"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800"
            />
          </div>
          <div className="flex items-end">
            <div className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
              {isAr ? "سيتم اختيار معيار العمر تلقائياً حسب جدول التحويل." : "Age norms are selected automatically from the scoring table."}
            </div>
          </div>
        </div>

        {error && <p className="mt-4 text-sm font-bold text-rose-600">{error}</p>}

        <button
          onClick={handleStart}
          className="mt-7 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-6 rounded-lg shadow transition flex items-center justify-center gap-3 cursor-pointer text-base"
        >
          <Play className="w-5 h-5 fill-white" />
          <span>{isAr ? "بدء الاختبار" : "Start Exam"}</span>
        </button>
      </div>
    </div>
  );
};
