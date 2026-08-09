/* ==========================================================================
   AL-HAMD CHARCOAL — EXPORT COUNTRIES DATA
   Single source of truth for both the visual route-map and the country
   card grid on the Export Markets page (and the homepage teaser).
   x / y are percentage positions on a 1000x500 equirectangular-style canvas
   (0% = left/top, 100% = right/bottom), lightly adjusted for legibility
   where Gulf countries sit very close together on a real map.
   ========================================================================== */

var EXPORT_HUB = { name_ar: "رشيد، مصر", name_en: "Rashid, Egypt", x: 58.4, y: 32.6 };

var EXPORT_COUNTRIES = [
  { code: "sa", name_ar: "السعودية", name_en: "Saudi Arabia", region: "gulf", x: 62.5, y: 36.7 },
  { code: "kw", name_ar: "الكويت", name_en: "Kuwait", region: "gulf", x: 63.5, y: 32.0 },
  { code: "om", name_ar: "سلطنة عُمان", name_en: "Oman", region: "gulf", x: 68.0, y: 40.0 },
  { code: "bh", name_ar: "البحرين", name_en: "Bahrain", region: "gulf", x: 62.0, y: 34.5 },
  { code: "ae", name_ar: "الإمارات", name_en: "UAE", region: "gulf", x: 66.5, y: 38.0 },
  { code: "qa", name_ar: "قطر", name_en: "Qatar", region: "gulf", x: 64.5, y: 36.5 },

  { code: "jo", name_ar: "الأردن", name_en: "Jordan", region: "me", x: 60.0, y: 32.8 },
  { code: "ps", name_ar: "فلسطين", name_en: "Palestine", region: "me", x: 59.8, y: 32.3 },
  { code: "sy", name_ar: "سوريا", name_en: "Syria", region: "me", x: 60.6, y: 30.6 },
  { code: "iq", name_ar: "العراق", name_en: "Iraq", region: "me", x: 62.2, y: 31.7 },

  { code: "be", name_ar: "بلجيكا", name_en: "Belgium", region: "europe", x: 51.25, y: 21.8 },
  { code: "gr", name_ar: "اليونان", name_en: "Greece", region: "europe", x: 56.1, y: 28.3 },
  { code: "tr", name_ar: "تركيا", name_en: "Turkey", region: "europe", x: 59.7, y: 28.3 },
  { code: "it", name_ar: "إيطاليا", name_en: "Italy", region: "europe", x: 53.6, y: 26.2 },
  { code: "gb", name_ar: "إنجلترا", name_en: "United Kingdom", region: "europe", x: 49.4, y: 20.0 },

  { code: "ly", name_ar: "ليبيا", name_en: "Libya", region: "africa", x: 54.7, y: 35.0 },
  { code: "ma", name_ar: "المغرب", name_en: "Morocco", region: "africa", x: 48.3, y: 32.2 },

  { code: "us", name_ar: "أمريكا", name_en: "USA", region: "americas", x: 22.6, y: 27.9 },
  { code: "ca", name_ar: "كندا", name_en: "Canada", region: "americas", x: 20.6, y: 18.9 }
];
