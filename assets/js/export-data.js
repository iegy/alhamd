/* ==========================================================================
   AL-HAMD CHARCOAL — EXPORT COUNTRIES DATA
   x / y are positions in the source world-map's own coordinate space
   (viewBox "30.767 241.591 784.077 458.627", see world-map-paths.js),
   taken from each country's actual outline on that map so pins/highlights
   line up with the real landmass. Bahrain and Palestine aren't present as
   separate shapes on this base map (too small at this simplification level)
   so their positions are estimated relative to their real neighbours.
   ========================================================================== */

var EXPORT_HUB = { name_ar: "رشيد، مصر", name_en: "Rashid, Egypt", code: "eg", x: 481.8, y: 453.2 };

var EXPORT_COUNTRIES = [
  { code: "sa", name_ar: "السعودية", name_en: "Saudi Arabia", region: "gulf", x: 513.8, y: 462.7 },
  { code: "kw", name_ar: "الكويت", name_en: "Kuwait", region: "gulf", x: 519.2, y: 452.8 },
  { code: "om", name_ar: "سلطنة عُمان", name_en: "Oman", region: "gulf", x: 538.8, y: 476.0 },
  { code: "bh", name_ar: "البحرين", name_en: "Bahrain", region: "gulf", x: 523.5, y: 458.5, estimated: true },
  { code: "ae", name_ar: "الإمارات", name_en: "UAE", region: "gulf", x: 534.8, y: 468.1 },
  { code: "qa", name_ar: "قطر", name_en: "Qatar", region: "gulf", x: 527.3, y: 463.0 },

  { code: "jo", name_ar: "الأردن", name_en: "Jordan", region: "me", x: 491.4, y: 447.3 },
  { code: "ps", name_ar: "فلسطين", name_en: "Palestine", region: "me", x: 483.0, y: 448.5, estimated: true },
  { code: "sy", name_ar: "سوريا", name_en: "Syria", region: "me", x: 489.7, y: 438.4 },
  { code: "iq", name_ar: "العراق", name_en: "Iraq", region: "me", x: 510.4, y: 445.0 },

  { code: "be", name_ar: "بلجيكا", name_en: "Belgium", region: "europe", x: 418.1, y: 393.5 },
  { code: "gr", name_ar: "اليونان", name_en: "Greece", region: "europe", x: 460.2, y: 432.2 },
  { code: "tr", name_ar: "تركيا", name_en: "Turkey", region: "europe", x: 474.3, y: 427.6 },
  { code: "it", name_ar: "إيطاليا", name_en: "Italy", region: "europe", x: 434.0, y: 423.6 },
  { code: "gb", name_ar: "إنجلترا", name_en: "United Kingdom", region: "europe", x: 399.5, y: 380.9 },

  { code: "ly", name_ar: "ليبيا", name_en: "Libya", region: "africa", x: 443.5, y: 453.3 },
  { code: "ma", name_ar: "المغرب", name_en: "Morocco", region: "africa", x: 386.8, y: 455.1 },

  { code: "us", name_ar: "أمريكا", name_en: "USA", region: "americas", x: 145.0, y: 355.0 },
  { code: "ca", name_ar: "كندا", name_en: "Canada", region: "americas", x: 220.0, y: 300.0 }
];


