export interface AgeGroup {
  id: string;
  labelAr: string;
  labelEn: string;
}

export interface NormLookupResult {
  percentile: number;
  grade: string;
  labelAr: string;
  labelEn: string;
  color: string;
  ageLabelAr: string;
  ageLabelEn: string;
}

type SetKey = "A" | "B" | "C" | "D" | "E";

interface NormRow {
  id: string;
  minAge: number;
  maxAge: number;
  labelAr: string;
  labelEn: string;
  thresholds: Record<95 | 90 | 75 | 50 | 25 | 10 | 5, number>;
}

export const AGE_GROUPS: AgeGroup[] = [
  { id: "5.5", labelAr: "5.5 سنة", labelEn: "5.5 years" },
  { id: "6", labelAr: "6 سنوات", labelEn: "6 years" },
  { id: "6.5", labelAr: "6.5 سنة", labelEn: "6.5 years" },
  { id: "7", labelAr: "7 سنوات", labelEn: "7 years" },
  { id: "7.5", labelAr: "7.5 سنة", labelEn: "7.5 years" },
  { id: "8", labelAr: "8 سنوات", labelEn: "8 years" },
  { id: "8.5", labelAr: "8.5 سنة", labelEn: "8.5 years" },
  { id: "9", labelAr: "9 سنوات", labelEn: "9 years" },
  { id: "9.5", labelAr: "9.5 سنة", labelEn: "9.5 years" },
  { id: "10", labelAr: "10 سنوات", labelEn: "10 years" },
  { id: "11", labelAr: "11 سنة", labelEn: "11 years" },
  { id: "12", labelAr: "12 سنة", labelEn: "12 years" },
  { id: "13", labelAr: "13 سنة", labelEn: "13 years" },
  { id: "14", labelAr: "14 سنة", labelEn: "14 years" },
  { id: "15", labelAr: "15 سنة", labelEn: "15 years" },
  { id: "16", labelAr: "16 سنة", labelEn: "16 years" },
  { id: "17", labelAr: "17 سنة", labelEn: "17 years" },
  { id: "18-34", labelAr: "18 - 34 سنة", labelEn: "18 - 34 years" },
  { id: "35-44", labelAr: "35 - 44 سنة", labelEn: "35 - 44 years" },
  { id: "45-54", labelAr: "45 - 54 سنة", labelEn: "45 - 54 years" },
  { id: "55-64", labelAr: "55 - 64 سنة", labelEn: "55 - 64 years" },
  { id: "65+", labelAr: "65 سنة فأكثر", labelEn: "65+ years" },
];

const NORM_ROWS: NormRow[] = [
  { id: "5.5", minAge: 0, maxAge: 5.74, labelAr: "5.5 سنة", labelEn: "5.5 years", thresholds: { 95: 34, 90: 29, 75: 25, 50: 16, 25: 13, 10: 12, 5: 9 } },
  { id: "6", minAge: 5.75, maxAge: 6.24, labelAr: "6 سنوات", labelEn: "6 years", thresholds: { 95: 36, 90: 31, 75: 25, 50: 17, 25: 13, 10: 12, 5: 9 } },
  { id: "6.5", minAge: 6.25, maxAge: 6.74, labelAr: "6.5 سنة", labelEn: "6.5 years", thresholds: { 95: 37, 90: 32, 75: 26, 50: 18, 25: 14, 10: 12, 5: 10 } },
  { id: "7", minAge: 6.75, maxAge: 7.24, labelAr: "7 سنوات", labelEn: "7 years", thresholds: { 95: 39, 90: 35, 75: 28, 50: 19, 25: 16, 10: 13, 5: 11 } },
  { id: "7.5", minAge: 7.25, maxAge: 7.74, labelAr: "7.5 سنة", labelEn: "7.5 years", thresholds: { 95: 42, 90: 38, 75: 30, 50: 22, 25: 17, 10: 15, 5: 13 } },
  { id: "8", minAge: 7.75, maxAge: 8.24, labelAr: "8 سنوات", labelEn: "8 years", thresholds: { 95: 43, 90: 38, 75: 31, 50: 25, 25: 19, 10: 15, 5: 13 } },
  { id: "8.5", minAge: 8.25, maxAge: 8.74, labelAr: "8.5 سنة", labelEn: "8.5 years", thresholds: { 95: 45, 90: 40, 75: 33, 50: 26, 25: 20, 10: 16, 5: 14 } },
  { id: "9", minAge: 8.75, maxAge: 9.24, labelAr: "9 سنوات", labelEn: "9 years", thresholds: { 95: 46, 90: 42, 75: 36, 50: 28, 25: 22, 10: 17, 5: 15 } },
  { id: "9.5", minAge: 9.25, maxAge: 9.74, labelAr: "9.5 سنة", labelEn: "9.5 years", thresholds: { 95: 48, 90: 44, 75: 37, 50: 29, 25: 23, 10: 18, 5: 15 } },
  { id: "10", minAge: 9.75, maxAge: 10.49, labelAr: "10 سنوات", labelEn: "10 years", thresholds: { 95: 49, 90: 45, 75: 38, 50: 31, 25: 24, 10: 19, 5: 16 } },
  { id: "11", minAge: 10.5, maxAge: 11.49, labelAr: "11 سنة", labelEn: "11 years", thresholds: { 95: 52, 90: 48, 75: 41, 50: 33, 25: 26, 10: 21, 5: 17 } },
  { id: "12", minAge: 11.5, maxAge: 12.49, labelAr: "12 سنة", labelEn: "12 years", thresholds: { 95: 54, 90: 50, 75: 44, 50: 36, 25: 29, 10: 24, 5: 20 } },
  { id: "13", minAge: 12.5, maxAge: 13.49, labelAr: "13 سنة", labelEn: "13 years", thresholds: { 95: 55, 90: 52, 75: 47, 50: 40, 25: 33, 10: 27, 5: 22 } },
  { id: "14", minAge: 13.5, maxAge: 14.49, labelAr: "14 سنة", labelEn: "14 years", thresholds: { 95: 57, 90: 54, 75: 49, 50: 42, 25: 35, 10: 29, 5: 25 } },
  { id: "15", minAge: 14.5, maxAge: 15.49, labelAr: "15 سنة", labelEn: "15 years", thresholds: { 95: 58, 90: 55, 75: 50, 50: 44, 25: 37, 10: 31, 5: 27 } },
  { id: "16", minAge: 15.5, maxAge: 16.49, labelAr: "16 سنة", labelEn: "16 years", thresholds: { 95: 59, 90: 56, 75: 51, 50: 45, 25: 38, 10: 33, 5: 29 } },
  { id: "17", minAge: 16.5, maxAge: 17.99, labelAr: "17 سنة", labelEn: "17 years", thresholds: { 95: 59, 90: 56, 75: 51, 50: 46, 25: 39, 10: 34, 5: 29 } },
  { id: "18-34", minAge: 18, maxAge: 34.99, labelAr: "18 - 34 سنة", labelEn: "18 - 34 years", thresholds: { 95: 55, 90: 52, 75: 47, 50: 40, 25: 33, 10: 26, 5: 22 } },
  { id: "35-44", minAge: 35, maxAge: 44.99, labelAr: "35 - 44 سنة", labelEn: "35 - 44 years", thresholds: { 95: 53, 90: 50, 75: 45, 50: 38, 25: 31, 10: 24, 5: 20 } },
  { id: "45-54", minAge: 45, maxAge: 54.99, labelAr: "45 - 54 سنة", labelEn: "45 - 54 years", thresholds: { 95: 50, 90: 47, 75: 42, 50: 35, 25: 27, 10: 21, 5: 17 } },
  { id: "55-64", minAge: 55, maxAge: 64.99, labelAr: "55 - 64 سنة", labelEn: "55 - 64 years", thresholds: { 95: 47, 90: 43, 75: 38, 50: 30, 25: 22, 10: 16, 5: 13 } },
  { id: "65+", minAge: 65, maxAge: 130, labelAr: "65 سنة فأكثر", labelEn: "65+ years", thresholds: { 95: 44, 90: 39, 75: 33, 50: 25, 25: 18, 10: 13, 5: 10 } },
];

export const EXPECTED_PROFILE_CROSS_SETS: Record<number, Record<SetKey, number>> = {
  10: { A: 6, B: 3, C: 1, D: 0, E: 0 },
  15: { A: 8, B: 4, C: 2, D: 1, E: 0 },
  20: { A: 9, B: 6, C: 3, D: 2, E: 0 },
  25: { A: 10, B: 7, C: 4, D: 3, E: 1 },
  30: { A: 11, B: 8, C: 6, D: 4, E: 1 },
  35: { A: 11, B: 9, C: 7, D: 6, E: 2 },
  40: { A: 11, B: 10, C: 8, D: 8, E: 3 },
  45: { A: 12, B: 11, C: 9, D: 9, E: 4 },
  50: { A: 12, B: 11, C: 10, D: 10, E: 7 },
  55: { A: 12, B: 12, C: 11, D: 11, E: 9 },
  60: { A: 12, B: 12, C: 12, D: 12, E: 12 },
};

export function resolveAgeNorm(age: number): NormRow {
  return NORM_ROWS.find((row) => age >= row.minAge && age <= row.maxAge) ?? NORM_ROWS[NORM_ROWS.length - 1];
}

export function getExpectedProfile(rawScore: number) {
  const steps = Object.keys(EXPECTED_PROFILE_CROSS_SETS).map(Number).sort((a, b) => a - b);
  if (EXPECTED_PROFILE_CROSS_SETS[rawScore]) return EXPECTED_PROFILE_CROSS_SETS[rawScore];

  let lower = steps[0];
  let upper = steps[steps.length - 1];
  for (const step of steps) {
    if (step <= rawScore) lower = step;
    if (step >= rawScore) {
      upper = step;
      break;
    }
  }

  const lowProfile = EXPECTED_PROFILE_CROSS_SETS[lower];
  const highProfile = EXPECTED_PROFILE_CROSS_SETS[upper];
  if (lower === upper) return lowProfile;

  const ratio = (rawScore - lower) / (upper - lower);
  return {
    A: Math.round(lowProfile.A + (highProfile.A - lowProfile.A) * ratio),
    B: Math.round(lowProfile.B + (highProfile.B - lowProfile.B) * ratio),
    C: Math.round(lowProfile.C + (highProfile.C - lowProfile.C) * ratio),
    D: Math.round(lowProfile.D + (highProfile.D - lowProfile.D) * ratio),
    E: Math.round(lowProfile.E + (highProfile.E - lowProfile.E) * ratio),
  };
}

function classifyPercentile(percentile: number) {
  if (percentile >= 95) {
    return {
      grade: "I",
      labelAr: "ممتاز",
      labelEn: "Superior",
      color: "text-emerald-700 bg-emerald-50 border-emerald-200",
    };
  }
  if (percentile >= 75) {
    return {
      grade: "II",
      labelAr: "أعلى من المتوسط",
      labelEn: "Above average",
      color: "text-sky-700 bg-sky-50 border-sky-200",
    };
  }
  if (percentile >= 25) {
    return {
      grade: "III",
      labelAr: "متوسط",
      labelEn: "Average",
      color: "text-indigo-700 bg-indigo-50 border-indigo-200",
    };
  }
  if (percentile >= 5) {
    return {
      grade: "IV",
      labelAr: "دون المتوسط",
      labelEn: "Below average",
      color: "text-amber-700 bg-amber-50 border-amber-200",
    };
  }
  return {
    grade: "V",
    labelAr: "منخفض",
    labelEn: "Low",
    color: "text-rose-700 bg-rose-50 border-rose-200",
  };
}

export function lookupPercentileAndGrade(ageOrGroup: string | number, rawScore: number): NormLookupResult {
  const age =
    typeof ageOrGroup === "number"
      ? ageOrGroup
      : Number.parseFloat(String(ageOrGroup).replace("+", ""));
  const norm = resolveAgeNorm(Number.isFinite(age) ? age : 18);
  const percentiles = [95, 90, 75, 50, 25, 10, 5] as const;
  const percentile = percentiles.find((value) => rawScore >= norm.thresholds[value]) ?? 1;
  const classification = classifyPercentile(percentile);

  return {
    percentile,
    grade: classification.grade,
    labelAr: classification.labelAr,
    labelEn: classification.labelEn,
    color: classification.color,
    ageLabelAr: norm.labelAr,
    ageLabelEn: norm.labelEn,
  };
}
