/* ==========================================================================
   AL-HAMD CHARCOAL — GALLERY MANIFEST
   =========================================================================
   HOW TO ADD A NEW PHOTO OR VIDEO (no coding needed beyond copy/paste):

   1) Drop the file into:
        assets/images/gallery/   → for photos (.jpg / .png / .webp)
        assets/videos/           → for videos (.mp4)

   2) Copy one of the objects below, paste it at the end of the array,
      and edit these fields:
        src         → the file path you used in step 1
        type        → "image" or "video"
        poster      → (video only, optional) a still-frame image shown
                       before the video plays. Leave blank ("") if you
                       don't have one — the browser will show the first frame.
        category    → one of: raw-material | production | packaging | shipping
        caption_ar  → short Arabic caption
        caption_en  → short English caption

   3) Save the file, commit, and push. That's it — both the Arabic and
      English gallery pages read from this ONE file automatically.
   ========================================================================== */

var GALLERY_ITEMS = [

  /* ---------------- PHOTOS ---------------- */
  {
    src: "assets/images/process/process-wood-1.jpg",
    type: "image",
    category: "raw-material",
    caption_ar: "تجهيز الأخشاب قبل التفحيم",
    caption_en: "Wood sorted and prepared before carbonization"
  },
  {
    src: "assets/images/process/process-wood-2.jpg",
    type: "image",
    category: "raw-material",
    caption_ar: "مقاطع الخشب الخام المختارة بعناية",
    caption_en: "Carefully selected raw wood sections"
  },
  {
    src: "assets/images/process/process-wood-3.jpg",
    type: "image",
    category: "raw-material",
    caption_ar: "تكديس الأخشاب في الساحة قبل الإنتاج",
    caption_en: "Wood stacked in the yard ahead of production"
  },
  {
    src: "assets/images/products/product-hand-lump.jpg",
    type: "image",
    category: "production",
    caption_ar: "فحص جودة القطعة الواحدة يدوياً",
    caption_en: "Hand-checking the quality of a single lump"
  },
  {
    src: "assets/images/products/product-pile-1.jpg",
    type: "image",
    category: "production",
    caption_ar: "الفحم النباتي بعد اكتمال التصنيع",
    caption_en: "Finished natural charcoal ready for sorting"
  },
  {
    src: "assets/images/products/product-pile-2.jpg",
    type: "image",
    category: "production",
    caption_ar: "قطع فحم كبيرة الحجم عالية الجودة",
    caption_en: "Large, high-grade charcoal pieces"
  },
  {
    src: "assets/images/products/product-compressed.jpg",
    type: "image",
    category: "production",
    caption_ar: "الفحم المضغوط مشتعلاً وجاهزاً للاستخدام",
    caption_en: "Compressed charcoal lit and ready for use"
  },
  {
    src: "assets/images/process/process-pack-1.jpg",
    type: "image",
    category: "packaging",
    caption_ar: "تعبئة الفحم في عبوات مخصصة",
    caption_en: "Charcoal packed into dedicated bags"
  },
  {
    src: "assets/images/process/process-pack-2.jpg",
    type: "image",
    category: "packaging",
    caption_ar: "أكياس معبأة وجاهزة للتحميل",
    caption_en: "Bagged and ready for loading"
  },
  {
    src: "assets/images/gallery/gallery-04.jpg",
    type: "image",
    category: "packaging",
    caption_ar: "تخزين العبوات قبل الشحن",
    caption_en: "Packed stock staged before shipping"
  },
  {
    src: "assets/images/process/process-ship-1.jpg",
    type: "image",
    category: "shipping",
    caption_ar: "تحميل الشحنة على الشاحنة",
    caption_en: "Loading the shipment onto the truck"
  },
  {
    src: "assets/images/gallery/gallery-01.jpg",
    type: "image",
    category: "shipping",
    caption_ar: "تعبئة حاوية التصدير",
    caption_en: "Packing an export container"
  },
  {
    src: "assets/images/gallery/gallery-02.jpg",
    type: "image",
    category: "shipping",
    caption_ar: "التحميل الليلي استعداداً للشحن",
    caption_en: "Night loading, ready for dispatch"
  },
  {
    src: "assets/images/gallery/gallery-03.jpg",
    type: "image",
    category: "shipping",
    caption_ar: "إشراف مباشر على تحميل الشحنة",
    caption_en: "Direct supervision during loading"
  },
  {
    src: "assets/images/gallery/gallery-05.jpg",
    type: "image",
    category: "shipping",
    caption_ar: "شحنة مجهزة على الطريق الدولي",
    caption_en: "A shipment staged along the highway"
  },
  {
    src: "assets/images/gallery/gallery-06.jpg",
    type: "image",
    category: "shipping",
    caption_ar: "عبوات مصفوفة قبل الشحن للميناء",
    caption_en: "Pallets lined up before heading to port"
  },
  {
    src: "assets/images/gallery/gallery-07.jpg",
    type: "image",
    category: "shipping",
    caption_ar: "شاحنة محملة بالكامل بالفحم المعبأ",
    caption_en: "A fully loaded truck of packed charcoal"
  },
  {
    src: "assets/images/gallery/gallery-08.jpg",
    type: "image",
    category: "shipping",
    caption_ar: "قافلة شحن جاهزة للانطلاق",
    caption_en: "A shipping convoy ready to depart"
  },
  {
    src: "assets/images/gallery/gallery-09.jpg",
    type: "image",
    category: "shipping",
    caption_ar: "تنويع الأصناف على متن نفس الشحنة",
    caption_en: "A variety of grades loaded on the same shipment"
  },

  /* ---------------- VIDEOS ---------------- */
  {
    src: "assets/videos/production-lit-charcoal.mp4",
    type: "video",
    poster: "assets/images/gallery/posters/production-lit-charcoal.jpg",
    category: "production",
    caption_ar: "اشتعال الفحم أثناء اختبار الجودة",
    caption_en: "Charcoal ignited during a quality check"
  },
  {
    src: "assets/videos/production-sorting.mp4",
    type: "video",
    poster: "assets/images/gallery/posters/production-sorting.jpg",
    category: "production",
    caption_ar: "فرز قطع الفحم بعد التصنيع",
    caption_en: "Sorting charcoal pieces after production"
  },
  {
    src: "assets/videos/production-charcoal-pile.mp4",
    type: "video",
    poster: "assets/images/gallery/posters/production-charcoal-pile.jpg",
    category: "production",
    caption_ar: "كومة فحم نباتي جاهزة للتعبئة",
    caption_en: "A pile of natural charcoal ready for packing"
  },
  {
    src: "assets/videos/production-glowing-coals.mp4",
    type: "video",
    poster: "assets/images/gallery/posters/production-glowing-coals.jpg",
    category: "production",
    caption_ar: "فحم متقد يوضّح جودة الاشتعال",
    caption_en: "Glowing coals showing off the ignition quality"
  },
  {
    src: "assets/videos/production-closeup.mp4",
    type: "video",
    poster: "assets/images/gallery/posters/production-closeup.jpg",
    category: "production",
    caption_ar: "لقطة قريبة لقطع الفحم داخل العبوة",
    caption_en: "A close look at the charcoal pieces inside the bag"
  },
  {
    src: "assets/videos/packaging-branded-bags.mp4",
    type: "video",
    poster: "assets/images/gallery/posters/packaging-branded-bags.jpg",
    category: "packaging",
    caption_ar: "عبوات الحمد جاهزة للتوزيع",
    caption_en: "Al-Hamd branded bags ready for distribution"
  },
  {
    src: "assets/videos/packaging-pallets-1.mp4",
    type: "video",
    poster: "assets/images/gallery/posters/packaging-pallets-1.jpg",
    category: "packaging",
    caption_ar: "تجهيز العبوات على المنصات الخشبية",
    caption_en: "Preparing bags on wooden pallets"
  },
  {
    src: "assets/videos/packaging-pallets-2.mp4",
    type: "video",
    poster: "assets/images/gallery/posters/packaging-pallets-2.jpg",
    category: "packaging",
    caption_ar: "تغليف العبوات استعداداً للشحن",
    caption_en: "Wrapping pallets ahead of shipping"
  },
  {
    src: "assets/videos/packaging-pallets-3.mp4",
    type: "video",
    poster: "assets/images/gallery/posters/packaging-pallets-3.jpg",
    category: "packaging",
    caption_ar: "منصات معبأة ومصفوفة في الساحة",
    caption_en: "Packed pallets lined up in the yard"
  },
  {
    src: "assets/videos/packaging-bundles.mp4",
    type: "video",
    poster: "assets/images/gallery/posters/packaging-bundles.jpg",
    category: "packaging",
    caption_ar: "حزم فحم مربوطة وجاهزة للتخزين",
    caption_en: "Bundled charcoal ready for storage"
  },
  {
    src: "assets/videos/packaging-warehouse-1.mp4",
    type: "video",
    poster: "assets/images/gallery/posters/packaging-warehouse-1.jpg",
    category: "packaging",
    caption_ar: "مخزون معبأ داخل المستودع",
    caption_en: "Packed stock stored inside the warehouse"
  },
  {
    src: "assets/videos/packaging-warehouse-2.mp4",
    type: "video",
    poster: "assets/images/gallery/posters/packaging-warehouse-2.jpg",
    category: "packaging",
    caption_ar: "فريق العمل أثناء تجهيز الطلبية",
    caption_en: "The team preparing an order"
  },
  {
    src: "assets/videos/packaging-warehouse-3.mp4",
    type: "video",
    poster: "assets/images/gallery/posters/packaging-warehouse-3.jpg",
    category: "packaging",
    caption_ar: "تنظيم العبوات قبل الشحن",
    caption_en: "Organizing bags ahead of dispatch"
  },
  {
    src: "assets/videos/shipping-truck-loading-1.mp4",
    type: "video",
    poster: "assets/images/gallery/posters/shipping-truck-loading-1.jpg",
    category: "shipping",
    caption_ar: "تحميل الشاحنة بالكامل استعداداً للتصدير",
    caption_en: "Fully loading the truck for export"
  },
  {
    src: "assets/videos/shipping-truck-loading-2.mp4",
    type: "video",
    poster: "assets/images/gallery/posters/shipping-truck-loading-2.jpg",
    category: "shipping",
    caption_ar: "آخر لمسات التحميل قبل الانطلاق",
    caption_en: "Final touches before the truck departs"
  },
  {
    src: "assets/videos/shipping-forklift.mp4",
    type: "video",
    poster: "assets/images/gallery/posters/shipping-forklift.jpg",
    category: "shipping",
    caption_ar: "الرافعة الشوكية أثناء تحميل الشحنة",
    caption_en: "A forklift loading the shipment"
  }

  /* 👉 Add your own new photos/videos below this line, following the same
     pattern. Remember the comma after the previous item's closing brace. */
];
