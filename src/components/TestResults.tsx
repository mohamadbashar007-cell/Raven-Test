import React, { useState } from "react";
import type { ParticipantInfo } from "../App";
import { QUESTIONS } from "../data/questions";
import { getExpectedProfile, lookupPercentileAndGrade } from "../data/norms";
import { MatrixRenderer } from "./MatrixRenderer";
import { Award, BarChart2, Check, FileText, RefreshCw, X } from "lucide-react";

interface TestResultsProps {
  answers: Record<string, number>;
  timeSpentSeconds: number;
  participant: ParticipantInfo;
  mode: "standard" | "learning";
  lang: "ar" | "en";
  onRestart: () => void;
}

const SET_LABELS: Record<"A" | "B" | "C" | "D" | "E", { ar: string; en: string }> = {
  A: { ar: "الإكمال البصري", en: "Visual completion" },
  B: { ar: "التناظر والتحليل", en: "Symmetry and analysis" },
  C: { ar: "التدرج والزيادة", en: "Progression" },
  D: { ar: "التحويل المكاني", en: "Spatial transformation" },
  E: { ar: "المنطق المجرد", en: "Abstract logic" },
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const TestResults: React.FC<TestResultsProps> = ({
  answers,
  timeSpentSeconds,
  participant,
  lang,
  onRestart,
}) => {
  const isAr = lang === "ar";
  const [selectedReviewSet, setSelectedReviewSet] = useState<"A" | "B" | "C" | "D" | "E">("A");
  const [activeReviewIndex, setActiveReviewIndex] = useState<number | null>(null);

  let scoreOf60 = 0;
  const setCorrectScores: Record<"A" | "B" | "C" | "D" | "E", number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  const setTotals = { A: 12, B: 12, C: 12, D: 12, E: 12 };

  QUESTIONS.forEach((question) => {
    if (answers[question.id] === question.correct) {
      scoreOf60 += 1;
      setCorrectScores[question.set] += 1;
    }
  });

  const answeredCount = Object.keys(answers).length;
  const result = lookupPercentileAndGrade(participant.age, scoreOf60);
  const expectedProfile = getExpectedProfile(scoreOf60);
  const reportDate = new Intl.DateTimeFormat(isAr ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  const handlePrint = () => window.print();

  const ReportPreview = () => (
    <section className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden print:shadow-none print:border-slate-300">
      <div className="bg-slate-900 text-white px-6 py-5 flex flex-col md:flex-row justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-slate-300">{isAr ? "مؤسسة الإمام أحمد بن حنبل" : "Imam Ahmad ibn Hanbal Foundation"}</p>
          <h2 className="text-2xl font-extrabold mt-1">{isAr ? "تقرير اختبار رافن للمصفوفات المتتابعة" : "Raven SPM Assessment Report"}</h2>
        </div>
        <div className="text-sm md:text-left">
          <p>{reportDate}</p>
          <p className="text-slate-300">{isAr ? "مدة الاختبار: 40 دقيقة" : "Exam duration: 40 minutes"}</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="border border-slate-200 rounded-lg p-4">
            <p className="text-xs font-bold text-slate-500">{isAr ? "الاسم الكامل" : "Full name"}</p>
            <p className="font-extrabold text-slate-950 mt-1">{participant.fullName}</p>
          </div>
          <div className="border border-slate-200 rounded-lg p-4">
            <p className="text-xs font-bold text-slate-500">{isAr ? "العمر" : "Age"}</p>
            <p className="font-extrabold text-slate-950 mt-1">{participant.age}</p>
          </div>
          <div className="border border-slate-200 rounded-lg p-4">
            <p className="text-xs font-bold text-slate-500">{isAr ? "فئة المعيار" : "Norm group"}</p>
            <p className="font-extrabold text-slate-950 mt-1">{isAr ? result.ageLabelAr : result.ageLabelEn}</p>
          </div>
          <div className="border border-slate-200 rounded-lg p-4">
            <p className="text-xs font-bold text-slate-500">{isAr ? "الوقت المستغرق" : "Time spent"}</p>
            <p className="font-extrabold text-slate-950 mt-1">{formatTime(timeSpentSeconds)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-5 text-center">
            <p className="text-xs font-bold text-slate-500">{isAr ? "الدرجة الخام" : "Raw score"}</p>
            <p className="text-4xl font-black text-slate-950 mt-2">{scoreOf60}<span className="text-base text-slate-400"> / 60</span></p>
          </div>
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-5 text-center">
            <p className="text-xs font-bold text-slate-500">{isAr ? "النسبة المئوية" : "Percentile"}</p>
            <p className="text-4xl font-black text-emerald-700 mt-2">{result.percentile < 5 ? "<5" : result.percentile}%</p>
          </div>
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-5 text-center">
            <p className="text-xs font-bold text-slate-500">{isAr ? "الفئة" : "Grade"}</p>
            <p className="text-4xl font-black text-slate-950 mt-2">{result.grade}</p>
          </div>
          <div className={`rounded-lg border p-5 text-center ${result.color}`}>
            <p className="text-xs font-bold">{isAr ? "المستوى الفكري" : "Classification"}</p>
            <p className="text-xl font-black mt-3">{isAr ? result.labelAr : result.labelEn}</p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 className="w-5 h-5 text-slate-800" />
            <h3 className="font-extrabold text-slate-950">{isAr ? "الرسم البياني للأداء حسب المجموعات" : "Performance Chart by Set"}</h3>
          </div>

          <div className="space-y-4">
            {(["A", "B", "C", "D", "E"] as const).map((setKey) => {
              const score = setCorrectScores[setKey];
              const pct = Math.round((score / setTotals[setKey]) * 100);
              const expected = expectedProfile[setKey];
              return (
                <div key={setKey} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                  <div className="md:col-span-3">
                    <p className="text-sm font-bold text-slate-900">
                      {setKey} - {isAr ? SET_LABELS[setKey].ar : SET_LABELS[setKey].en}
                    </p>
                    <p className="text-xs text-slate-500">
                      {isAr ? `المحقق ${score}/12، المتوقع ${expected}/12` : `Actual ${score}/12, expected ${expected}/12`}
                    </p>
                  </div>
                  <div className="md:col-span-8 relative">
                    <div className="h-5 rounded bg-slate-100 border border-slate-200 overflow-hidden">
                      <div className="h-full bg-slate-900" style={{ width: `${pct}%` }} />
                    </div>
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-7 rounded bg-amber-400 border border-white shadow"
                      style={{ [isAr ? "right" : "left"]: `${(expected / 12) * 100}%` }}
                      title={isAr ? "المتوقع" : "Expected"}
                    />
                  </div>
                  <div className="md:col-span-1 text-sm font-black text-slate-800 text-center">{pct}%</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-200 pt-5">
          <div>
            <p className="text-xs font-bold text-slate-500">{isAr ? "عدد الأسئلة المجابة" : "Answered items"}</p>
            <p className="text-lg font-black text-slate-900">{answeredCount} / 60</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500">{isAr ? "طريقة الحساب" : "Scoring method"}</p>
            <p className="text-sm font-bold text-slate-900">
              {isAr ? "حسب جدول تحويل الدرجات العمرية المرفق" : "Based on the provided age-norm conversion table"}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500">{isAr ? "اعتماد التقرير" : "Report issuer"}</p>
            <p className="text-sm font-bold text-slate-900">{isAr ? "مؤسسة الإمام أحمد بن حنبل" : "Imam Ahmad ibn Hanbal Foundation"}</p>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <div className="max-w-6xl mx-auto py-8 px-4" dir={isAr ? "rtl" : "ltr"}>
      <div className="print:hidden flex flex-col md:flex-row justify-between gap-4 items-start md:items-center border-b border-gray-200 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <Award className="w-8 h-8 text-slate-900" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isAr ? "معاينة التقرير قبل الطباعة" : "Report Preview Before Printing"}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              {isAr ? "راجع البيانات والرسم البياني ثم اطبع التقرير عند الحاجة." : "Review the details and chart, then print the report if needed."}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-bold transition shadow-sm cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>{isAr ? "طباعة التقرير" : "Print Report"}</span>
          </button>
          <button
            onClick={onRestart}
            className="flex items-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-xs font-bold transition shadow-sm cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{isAr ? "اختبار جديد" : "New Test"}</span>
          </button>
        </div>
      </div>

      <ReportPreview />

      <div className="print:hidden mt-8 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="border-b border-gray-200 pb-4 mb-5">
          <h3 className="text-lg font-bold text-gray-950">
            {isAr ? "مراجعة الأسئلة والإجابات" : "Item Review"}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {isAr ? "اختر مجموعة ثم افتح أي سؤال لمراجعة الاختيار الصحيح وإجابة المتقدم." : "Choose a set and open any item to review the correct and submitted answers."}
          </p>
        </div>

        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {(["A", "B", "C", "D", "E"] as const).map((setKey) => (
            <button
              key={setKey}
              onClick={() => {
                setSelectedReviewSet(setKey);
                setActiveReviewIndex(null);
              }}
              className={`px-5 py-2 rounded-lg font-bold text-sm transition cursor-pointer flex-1 text-center ${
                selectedReviewSet === setKey
                  ? "bg-slate-900 text-white shadow"
                  : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              {isAr ? `المجموعة ${setKey}` : `Set ${setKey}`}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {QUESTIONS.filter((question) => question.set === selectedReviewSet).map((question) => {
            const isCorrect = answers[question.id] === question.correct;
            const absIdx = QUESTIONS.findIndex((item) => item.id === question.id);
            const isFocused = activeReviewIndex === absIdx;
            return (
              <button
                key={question.id}
                onClick={() => setActiveReviewIndex(isFocused ? null : absIdx)}
                className={`p-3 rounded-lg border text-center transition cursor-pointer ${
                  isFocused
                    ? "border-slate-900 bg-slate-50"
                    : isCorrect
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border-rose-200 bg-rose-50 text-rose-800"
                }`}
              >
                <span className="text-xs text-gray-500 font-bold">#{question.num}</span>
                <div className="mt-2 flex justify-center">
                  {isCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                </div>
              </button>
            );
          })}
        </div>

        {activeReviewIndex !== null && (
          <div className="mt-6 border border-gray-200 rounded-lg p-5 bg-gray-50">
            {(() => {
              const question = QUESTIONS[activeReviewIndex];
              const userChoice = answers[question.id] || 0;
              return (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                  <div className="md:col-span-5 bg-white p-4 border border-gray-200 rounded-lg">
                    <MatrixRenderer question={question} type="main" />
                  </div>
                  <div className="md:col-span-7 space-y-3">
                    <h4 className="font-extrabold text-gray-900 text-lg">
                      {isAr ? `السؤال ${question.id}` : `Item ${question.id}`}
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-sm font-bold">
                      <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-800">
                        {isAr ? `الإجابة الصحيحة: ${question.correct}` : `Correct: ${question.correct}`}
                      </div>
                      <div className="p-3 bg-white border border-gray-200 rounded-lg text-gray-800">
                        {isAr ? `إجابة المتقدم: ${userChoice || "لم يجب"}` : `Participant answer: ${userChoice || "Skipped"}`}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {isAr ? question.explanationAr : question.explanationEn}
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};
