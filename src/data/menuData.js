export const WHATSAPP_NUMBER = "905497113224";

export const CATEGORIES = [
  {
    id: "all",
    icon: "✨",
    name: { tr: "Tüm Menü", en: "All Menu" },
    subtitle: {
      tr: "AIO Mutfak — Tüm menüler ve yan lezzetler",
      en: "AIO Kitchen — All menus and side dishes",
    },
    badge: { tr: "AIO ÖZEL", en: "AIO SIGNATURE" },
  },
  {
    id: "burgers",
    icon: "🍔",
    name: { tr: "Burger Menüler", en: "Burger Menus" },
    subtitle: {
      tr: "Tüm burgerlerimiz 150 g çıtır McCain patates kızartması ve 250 ml kutu kola ile menü olarak servis edilir.",
      en: "All our burgers are served as a combo menu with 150 g crispy McCain fries and a 250 ml can of cola.",
    },
    badge: { tr: "PATATES + KOLA DAHİL", en: "FRIES + COLA INCLUDED" },
  },
  {
    id: "pastas",
    icon: "🍝",
    name: { tr: "Makarna Menüler", en: "Pasta Menus" },
    subtitle: {
      tr: "İtalyan usulü taze hazırlanan Barilla makarnalarımız, 20 g toz Parmesan ve 250 ml kutu kola ile servis edilir.",
      en: "Freshly prepared Italian Barilla pastas topped with aged Parmesan and served with a 250 ml can of cola.",
    },
    badge: { tr: "KOLA DAHİL", en: "COLA INCLUDED" },
  },
  {
    id: "wraps",
    icon: "🌯",
    name: { tr: "Wrap Menüler", en: "Wrap Menus" },
    subtitle: {
      tr: "Bol cheddar ve kaşar peynirli sıcak tortilla wraplarımız, 150 g patates kızartması ve 250 ml kutu kola ile servis edilir.",
      en: "Warm tortilla wraps loaded with melted cheddar & kashar cheese, served with 150 g fries and 250 ml cola.",
    },
    badge: { tr: "PATATES + KOLA DAHİL", en: "FRIES + COLA INCLUDED" },
  },
  {
    id: "chicken",
    icon: "🍗",
    name: { tr: "Çıtır Tavuk", en: "Crispy Chicken" },
    subtitle: {
      tr: "200 g altın sarısı çıtır tavuk bonfile parçaları, 150 g patates kızartması ve 2 özel dip sos ile.",
      en: "200 g golden crispy chicken breast tenders served with 150 g french fries and 2 signature dip sauces.",
    },
    badge: { tr: "PATATES + 2 SOS DAHİL", en: "FRIES + 2 DIPS INCLUDED" },
  },
  {
    id: "salads",
    icon: "🥗",
    name: { tr: "Taze Salatalar", en: "Fresh Salads" },
    subtitle: {
      tr: "Günlük taze yeşillikler, fırınlanmış kıtır kruton ve özel soslarla hazırlanan doyurucu salata kaseleri.",
      en: "Hearty salad bowls crafted daily with crisp greens, oven-baked croutons, and house dressings.",
    },
    badge: { tr: "FİT & TAZE", en: "FRESH & FIT" },
  },
  {
    id: "extras",
    icon: "🍟",
    name: { tr: "Yan Ürünler & İçecekler", en: "Sides, Fries & Drinks" },
    subtitle: {
      tr: "Cheddarlı ve Parmesanlı patates porsiyonları, 330 ml kutu içecekler ve özel dip soslar.",
      en: "Cheddar and Parmesan loaded fries portions, 330 ml canned beverages, and signature dip sauces.",
    },
    badge: { tr: "EKSTRA LEZZET", en: "EXTRA FLAVOR" },
  },
];

// BÖLÜM 1: Kolalı Menülerde İçecek Değişimi (Excel Mağaza Farkı: +20 TL -> +%10 = +22 TL)
export const DRINK_UPGRADES = [
  {
    id: "drink-std-cola-250",
    name: {
      tr: "Standart: Kola (250 ml Kutu)",
      en: "Standard: Cola (250 ml Can)",
    },
    desc: {
      tr: "Menüye dahil standart içecek",
      en: "Included standard menu beverage",
    },
    storePrice: 0,
    price: 0,
    isDefault: true,
  },
  {
    id: "drink-upg-pepsi-330",
    name: {
      tr: "Pepsi (330 ml Kutu) ile Değiştir",
      en: "Upgrade to Pepsi (330 ml Can)",
    },
    desc: {
      tr: "250 ml Kola yerine 330 ml Kutu Pepsi",
      en: "Swap 250 ml Cola for 330 ml Can Pepsi",
    },
    storePrice: 20,
    price: 20, // yuvarlanmış (0/5): 20 TL
  },
  {
    id: "drink-upg-sprite-330",
    name: {
      tr: "Sprite (330 ml Kutu) ile Değiştir",
      en: "Upgrade to Sprite (330 ml Can)",
    },
    desc: {
      tr: "250 ml Kola yerine 330 ml Kutu Sprite",
      en: "Swap 250 ml Cola for 330 ml Can Sprite",
    },
    storePrice: 20,
    price: 20, // yuvarlanmış (0/5): 20 TL
  },
  {
    id: "drink-upg-cocacola-330",
    name: {
      tr: "Coca-Cola (330 ml Kutu) ile Değiştir",
      en: "Upgrade to Coca-Cola (330 ml Can)",
    },
    desc: {
      tr: "250 ml Kola yerine 330 ml Kutu Coca-Cola",
      en: "Swap 250 ml Cola for 330 ml Can Coca-Cola",
    },
    storePrice: 20,
    price: 20, // yuvarlanmış (0/5): 20 TL
  },
  {
    id: "drink-upg-zero-330",
    name: {
      tr: "Coca-Cola Zero (330 ml Kutu) ile Değiştir",
      en: "Upgrade to Coca-Cola Zero (330 ml Can)",
    },
    desc: {
      tr: "250 ml Kola yerine 330 ml Kutu Zero Sugar",
      en: "Swap 250 ml Cola for 330 ml Can Coca-Cola Zero",
    },
    storePrice: 20,
    price: 20, // yuvarlanmış (0/5): 20 TL
  },
];

// BÖLÜM 2: Menüdeki Sade Patates (150 g) Yerine Peynirli / Soslu Patates Değişim Farkları (Excel Mağaza Farkı + %10)
export const FRIES_UPGRADES = [
  {
    id: "fries-std-150",
    name: {
      tr: "Standart: Sade Patates Kızartması (150 g)",
      en: "Standard: Classic French Fries (150 g)",
    },
    desc: {
      tr: "Menüye dahil 150 g çıtır McCain patates",
      en: "Included 150 g crispy McCain fries",
    },
    storePrice: 0,
    price: 0,
    isDefault: true,
  },
  {
    id: "fries-upg-cheddar",
    name: {
      tr: "Cheddarlı Patatese Yükselt (+40 g Cheddar)",
      en: "Upgrade to Cheddar Cheese Fries (+40 g Cheddar)",
    },
    desc: {
      tr: "Sade patates yerine +40 g eritilmiş sıcak Cheddar peynirli patates",
      en: "Swap plain fries for fries topped with +40 g warm melted Cheddar",
    },
    storePrice: 45,
    price: 50, // yuvarlanmış (0/5): 50 TL
  },
  {
    id: "fries-upg-parmesan",
    name: {
      tr: "Parmesanlı Patatese Yükselt (+20 g Parmesan)",
      en: "Upgrade to Parmesan & Herb Fries (+20 g Parmesan)",
    },
    desc: {
      tr: "Sade patates yerine +20 g toz Parmesan ve sarımsaklı baharatlı patates",
      en: "Swap plain fries for fries tossed with +20 g aged Parmesan & garlic herbs",
    },
    storePrice: 50,
    price: 55, // yuvarlanmış (0/5): 55 TL
  },
  {
    id: "fries-upg-double-cheese",
    name: {
      tr: "Cheddarlı & Parmesanlı Duble Patatese Yükselt",
      en: "Upgrade to Double Cheese (Cheddar & Parmesan) Fries",
    },
    desc: {
      tr: "Sade patates yerine +35 g eritilmiş Cheddar ve +15 g toz Parmesanlı patates",
      en: "Swap plain fries for +35 g melted Cheddar & +15 g aged Parmesan fries",
    },
    storePrice: 75,
    price: 85, // yuvarlanmış (0/5): 85 TL
  },
  {
    id: "fries-upg-large-250",
    name: {
      tr: "Büyük Boy Sade Patatese Yükselt (250 g)",
      en: "Upgrade to Large Plain Fries (250 g)",
    },
    desc: {
      tr: "Menüdeki 150 g patatesi 250 g duble porsiyona büyüt (+100 g ekstra)",
      en: "Upsize your menu fries from 150 g to a 250 g large portion (+100 g extra)",
    },
    storePrice: 25,
    price: 30, // yuvarlanmış (0/5): 30 TL
  },
];

// BÖLÜM 3: Tekil / Ekstra Porsiyon Satış Fiyatları (Excel Mağaza Satış Fiyatı + %10)
export const EXTRA_ADDONS = [
  {
    id: "addon-plain-fries-150",
    name: {
      tr: "Ekstra Sade Patates Porsiyonu (150 g)",
      en: "Extra Classic French Fries Portion (150 g)",
    },
    storePrice: 70,
    price: 75, // yuvarlanmış (0/5): 75 TL
  },
  {
    id: "addon-large-fries-200",
    name: {
      tr: "Ekstra Büyük Boy Sade Patates Porsiyonu (200 g)",
      en: "Extra Large French Fries Portion (200 g)",
    },
    storePrice: 85,
    price: 95, // yuvarlanmış (0/5): 95 TL
  },
  {
    id: "addon-cheddar-fries",
    name: {
      tr: "Ekstra Cheddarlı Patates Porsiyonu (150 g + 40 g Cheddar)",
      en: "Extra Cheddar Cheese Fries Portion (150 g + 40 g Cheddar)",
    },
    storePrice: 115,
    price: 125, // yuvarlanmış (0/5): 125 TL
  },
  {
    id: "addon-parmesan-fries",
    name: {
      tr: "Ekstra Parmesanlı Patates Porsiyonu (150 g + 20 g Parmesan)",
      en: "Extra Parmesan & Herb Fries Portion (150 g + 20 g Parmesan)",
    },
    storePrice: 125,
    price: 140, // yuvarlanmış (0/5): 140 TL
  },
  {
    id: "addon-double-cheese-fries",
    name: {
      tr: "Ekstra Cheddarlı & Parmesanlı Duble Patates Porsiyonu",
      en: "Extra Cheddar & Parmesan Loaded Fries Portion",
    },
    storePrice: 145,
    price: 160, // yuvarlanmış (0/5): 160 TL
  },
  {
    id: "addon-can-drink-330",
    name: {
      tr: "Ekstra 330 ml Kutu İçecek (Pepsi / Sprite / Coca-Cola / Zero)",
      en: "Extra 330 ml Canned Drink (Pepsi / Sprite / Coca-Cola / Zero)",
    },
    storePrice: 60,
    price: 65, // yuvarlanmış (0/5): 65 TL
  },
  {
    id: "addon-special-dip-30",
    name: {
      tr: "Ekstra Özel Dip Sos (30 g — Burger / Acılı Mayonez / Sweet Chili)",
      en: "Extra Signature Dip Sauce (30 g — Burger / Spicy Mayo / Sweet Chili)",
    },
    storePrice: 20,
    price: 20, // yuvarlanmış (0/5): 20 TL
  },
  {
    id: "addon-truffle-dip-30",
    name: {
      tr: "Ekstra Trüflü Mayonez Dip Sos (30 g)",
      en: "Extra Truffle Mayonnaise Dip Sauce (30 g)",
    },
    storePrice: 50,
    price: 55, // yuvarlanmış (0/5): 55 TL
  },
];

// TÜM ÜRÜNLER: Excel 'Özet' & 'Final Fiyatlandırma' Mağaza Satış Fiyatı üzerinden +%10 arttırılmış fiyatlar
export const PRODUCTS = [
  // ==================== 1. BURGER MENÜLER ====================
  {
    id: "cheese-burger",
    category: "burgers",
    popular: true,
    image: "/images/products/cheese-burger.jpg",
    imageFocus: "50% 72%",
    name: {
      tr: "Cheese Burger Menü",
      en: "Cheese Burger Combo Menu",
    },
    includedBadge: {
      tr: "🍟 150g Patates + 🥤 250ml Kola Dahil",
      en: "🍟 150g Fries + 🥤 250ml Cola Included",
    },
    calories: {
      tr: "~1.160 kcal (Burger: 720 + Patates: 335 + Kola: 105 kcal)",
      en: "~1,160 kcal (Burger: 720 + Fries: 335 + Cola: 105 kcal)",
    },
    description: {
      tr: "%100 dana kıyma burger köftesi (100 g), eritilmiş cheddar peyniri, karamelize soğan, kornişon turşu ve özel burger sosu; burger ekmeği arasında, yanında 150 g çıtır patates kızartması ve 250 ml kutu kola ile menü.",
      en: "100% pure beef patty (100 g), melted cheddar cheese, caramelized onions, pickled gherkins, and house burger sauce in a toasted bun; served with 150 g crispy fries and a 250 ml can of cola.",
    },
    storePrice: 385,
    price: 425, // yuvarlanmış (0/5): 425 TL
    hasDrinkUpgrade: true,
    hasFriesUpgrade: true,
  },
  {
    id: "smash-burger-jalapeno",
    category: "burgers",
    popular: true,
    image: "/images/products/smash-burger-jalapeno.jpg",
    imageFocus: "50% 72%",
    name: {
      tr: "Smash Burger – Jalapeño Menü",
      en: "Smash Burger – Jalapeño Menu",
    },
    includedBadge: {
      tr: "🍟 150g Patates + 🥤 250ml Kola Dahil",
      en: "🍟 150g Fries + 🥤 250ml Cola Included",
    },
    calories: {
      tr: "~1.215 kcal (Burger: 775 + Patates: 335 + Kola: 105 kcal)",
      en: "~1,215 kcal (Burger: 775 + Fries: 335 + Cola: 105 kcal)",
    },
    description: {
      tr: "Izgarada mühürlenmiş smash dana burger köftesi (100 g), eritilmiş cheddar peyniri, dilimlenmiş Meksika jalapeño biberi, çıtır soğan ve özel burger sosu; patatesli burger ekmeği arasında, yanında 150 g patates kızartması ve 250 ml kutu kola ile menü.",
      en: "Seared smashed beef patty (100 g), melted cheddar cheese, sliced Mexican jalapeño peppers, crispy onions, and signature burger sauce in a potato bun; served with 150 g fries and 250 ml cola.",
    },
    storePrice: 395,
    price: 435, // yuvarlanmış (0/5): 435 TL
    hasDrinkUpgrade: true,
    hasFriesUpgrade: true,
  },
  {
    id: "mantarli-burger",
    category: "burgers",
    popular: true,
    image: "/images/products/mantarli-burger.jpg",
    imageFocus: "50% 72%",
    name: {
      tr: "Mantarlı & Trüflü Burger Menü",
      en: "Truffle & Mushroom Burger Menu",
    },
    includedBadge: {
      tr: "🍟 150g Patates + 🥤 250ml Kola Dahil",
      en: "🍟 150g Fries + 🥤 250ml Cola Included",
    },
    calories: {
      tr: "~1.250 kcal (Burger: 810 + Patates: 335 + Kola: 105 kcal)",
      en: "~1,250 kcal (Burger: 810 + Fries: 335 + Cola: 105 kcal)",
    },
    description: {
      tr: "%100 dana burger köftesi (100 g), trüflü mayonez sos (45 g), eritilmiş cheddar peyniri ve karamelize soğan; brioche burger ekmeği arasında, yanında 150 g patates kızartması ve 250 ml kutu kola ile menü.",
      en: "100% beef burger patty (100 g), truffle mayonnaise (45 g), melted cheddar cheese, and caramelized onions in a buttered brioche bun; served with 150 g fries and 250 ml cola.",
    },
    storePrice: 425,
    price: 470, // yuvarlanmış (0/5): 470 TL
    hasDrinkUpgrade: true,
    hasFriesUpgrade: true,
  },
  {
    id: "karides-dynamite-burger",
    category: "burgers",
    popular: true,
    image: "/images/products/karides-dynamite-burger.jpg",
    imageFocus: "50% 72%",
    name: {
      tr: "Karides Dynamite Burger Menü",
      en: "Shrimp Dynamite Burger Menu",
    },
    includedBadge: {
      tr: "🍟 150g Patates + 🥤 250ml Kola Dahil",
      en: "🍟 150g Fries + 🥤 250ml Cola Included",
    },
    calories: {
      tr: "~1.225 kcal (Burger: 785 + Patates: 335 + Kola: 105 kcal)",
      en: "~1,225 kcal (Burger: 785 + Fries: 335 + Cola: 105 kcal)",
    },
    description: {
      tr: "Tempura kaplamalı çıtır karidesler (70 g), özel dynamite acılı mayonez sos (60 g), çıtır soğan, taze kıvırcık marul ve kornişon turşu; tereyağlı brioche burger ekmeği arasında, yanında 150 g patates kızartması ve 250 ml kutu kola ile menü.",
      en: "Tempura battered crispy shrimp (70 g), signature spicy dynamite sauce (60 g), crispy onions, fresh lettuce, and pickles in a brioche bun; served with 150 g fries and 250 ml cola.",
    },
    storePrice: 440,
    price: 540, // güncellendi: 540 TL
    hasDrinkUpgrade: true,
    hasFriesUpgrade: true,
  },
  {
    id: "citir-tavuk-burger",
    category: "burgers",
    popular: false,
    image: "/images/products/citir-tavuk-burger.jpg",
    imageFocus: "50% 72%",
    name: {
      tr: "Çıtır Tavuk Burger Menü",
      en: "Crispy Chicken Burger Menu",
    },
    includedBadge: {
      tr: "🍟 150g Patates + 🥤 250ml Kola Dahil",
      en: "🍟 150g Fries + 🥤 250ml Cola Included",
    },
    calories: {
      tr: "~1.170 kcal (Burger: 730 + Patates: 335 + Kola: 105 kcal)",
      en: "~1,170 kcal (Burger: 730 + Fries: 335 + Cola: 105 kcal)",
    },
    description: {
      tr: "Altın sarısı çıtır kaplamalı tavuk bonfile (120 g), taze göbek marul, kornişon turşu, özel acılı mayonez ve sweet chili sos; yumuşak burger ekmeği arasında, yanında 150 g çıtır McCain patates kızartması ve 250 ml kutu kola ile menü.",
      en: "Golden crispy breaded chicken breast fillet (120 g), crisp iceberg lettuce, pickles, spicy mayo, and sweet chili sauce in a soft burger bun; served with 150 g McCain fries and 250 ml cola.",
    },
    storePrice: 310,
    price: 340, // yuvarlanmış (0/5): 340 TL
    hasDrinkUpgrade: true,
    hasFriesUpgrade: true,
  },
  {
    id: "vegan-burger",
    category: "burgers",
    popular: false,
    image: "/images/products/vegan-burger.jpg",
    imageFocus: "50% 72%",
    name: {
      tr: "Vegan Burger Menü",
      en: "Plant-Based Vegan Burger Menu",
    },
    includedBadge: {
      tr: "🍟 150g Patates + 🥤 250ml Kola Dahil",
      en: "🍟 150g Fries + 🥤 250ml Cola Included",
    },
    calories: {
      tr: "~840 kcal (Burger: 400 + Patates: 335 + Kola: 105 kcal)",
      en: "~840 kcal (Burger: 400 + Fries: 335 + Cola: 105 kcal)",
    },
    description: {
      tr: "Kültür mantarı (100 g), Meksika fasulyesi ve yulaf ezmesiyle hazırlanan ev yapımı bitkisel vegan köfte, taze marul ve domates; vegan burger ekmeği arasında, yanında 150 g patates kızartması ve 250 ml kutu kola ile menü.",
      en: "House-made plant-based patty crafted from mushrooms (100 g), red kidney beans, and rolled oats with fresh lettuce and tomato in a vegan bun; served with 150 g fries and 250 ml cola.",
    },
    storePrice: 290,
    price: 320, // yuvarlanmış (0/5): 320 TL
    hasDrinkUpgrade: true,
    hasFriesUpgrade: true,
  },

  // ==================== 2. MAKARNA MENÜLER ====================
  {
    id: "spageti-bolonez",
    category: "pastas",
    popular: true,
    image: "/images/products/spageti-bolonez.jpg",
    imageFocus: "50% 62%",
    name: {
      tr: "Spageti Bolonez Menü",
      en: "Spaghetti Bolognese Menu",
    },
    includedBadge: {
      tr: "🧀 Parmesan + 🥤 250ml Kola Dahil",
      en: "🧀 Parmesan + 🥤 250ml Cola Included",
    },
    calories: {
      tr: "~695 kcal (Makarna: 590 + 250 ml Kola: 105 kcal)",
      en: "~695 kcal (Pasta: 590 + 250 ml Cola: 105 kcal)",
    },
    description: {
      tr: "İtalyan usulü haşlanmış Barilla spagetti makarna; dana kıyma, domates püresi, taze kereviz, havuç, soğan ve sarımsakla ağır ateşte pişirilen zengin Bolonez sos, üzerinde 15 g toz Parmesan peyniri ve yanında 250 ml kutu kola ile menü.",
      en: "Al dente Barilla spaghetti topped with slow-simmered beef Bolognese ragù (minced beef, tomato purée, celery, carrot, onion, garlic), 15 g grated Parmesan cheese, and a 250 ml can of cola.",
    },
    storePrice: 320,
    price: 350, // yuvarlanmış (0/5): 350 TL
    hasDrinkUpgrade: true,
    hasFriesUpgrade: false,
  },
  {
    id: "mantarli-alfredo-fettuccine",
    category: "pastas",
    popular: true,
    image: "/images/products/mantarli-alfredo-fettuccine.jpg",
    imageFocus: "50% 62%",
    name: {
      tr: "Mantarlı & Tavuklu Alfredo Fettuccine Menü",
      en: "Chicken & Mushroom Fettuccine Alfredo Menu",
    },
    includedBadge: {
      tr: "🧀 Parmesan + 🥤 250ml Kola Dahil",
      en: "🧀 Parmesan + 🥤 250ml Cola Included",
    },
    calories: {
      tr: "~960 kcal (Makarna: 855 + 250 ml Kola: 105 kcal)",
      en: "~960 kcal (Pasta: 855 + 250 ml Cola: 105 kcal)",
    },
    description: {
      tr: "Fettuccine makarna; sote piliç bonfile dilimleri (80 g), taze kültür mantarı (60 g), kremalı Alfredo sos (150 g), üzerinde 20 g toz Parmesan peyniri ve yanında 250 ml kutu kola ile menü.",
      en: "Fettuccine ribbons tossed with sautéed chicken breast strips (80 g), fresh mushrooms (60 g), velvety Alfredo cream sauce (150 g), topped with 20 g grated Parmesan and served with 250 ml cola.",
    },
    storePrice: 345,
    price: 380, // yuvarlanmış (0/5): 380 TL
    hasDrinkUpgrade: true,
    hasFriesUpgrade: false,
  },
  {
    id: "pesto-soslu-penne",
    category: "pastas",
    popular: false,
    image: "/images/products/pesto-soslu-penne.jpg",
    imageFocus: "50% 62%",
    name: {
      tr: "Pesto Soslu Penne Menü",
      en: "Creamy Pesto Penne Menu",
    },
    includedBadge: {
      tr: "🧀 Parmesan + 🥤 250ml Kola Dahil",
      en: "🧀 Parmesan + 🥤 250ml Cola Included",
    },
    calories: {
      tr: "~1.065 kcal (Makarna: 960 + 250 ml Kola: 105 kcal)",
      en: "~1,065 kcal (Pasta: 960 + 250 ml Cola: 105 kcal)",
    },
    description: {
      tr: "Barilla Penne (kalem) makarna; taze fesleğenli Pesto Genovese sos (30 g), zengin sıvı krema (150 g), sarımsak, üzerinde 20 g toz Parmesan peyniri ve yanında 250 ml kutu kola ile menü.",
      en: "Barilla Penne pasta tossed in aromatic basil Pesto Genovese (30 g), rich cream (150 g), and garlic, finished with 20 g grated Parmesan cheese and served with a 250 ml can of cola.",
    },
    storePrice: 320,
    price: 350, // yuvarlanmış (0/5): 350 TL
    hasDrinkUpgrade: true,
    hasFriesUpgrade: false,
  },
  {
    id: "penne-arrabbiata",
    category: "pastas",
    popular: false,
    image: "/images/products/penne-arrabbiata.jpg",
    imageFocus: "50% 62%",
    name: {
      tr: "Penne Arrabbiata Menü",
      en: "Penne Arrabbiata Menu",
    },
    includedBadge: {
      tr: "🌶️ Acılı + 🧀 Parmesan + 🥤 250ml Kola Dahil",
      en: "🌶️ Spicy + 🧀 Parmesan + 🥤 250ml Cola Included",
    },
    calories: {
      tr: "~610 kcal (Makarna: 505 + 250 ml Kola: 105 kcal)",
      en: "~610 kcal (Pasta: 505 + 250 ml Cola: 105 kcal)",
    },
    description: {
      tr: "Barilla Penne (kalem) makarna; domates püresi (210 g), acı sos ve sarımsakla hazırlanan İtalyan Arrabbiata sosu, üzerinde 20 g toz Parmesan peyniri ve yanında 250 ml kutu kola ile menü.",
      en: "Barilla Penne pasta in a fiery Italian Arrabbiata sauce crafted with tomato purée (210 g), chili pepper sauce, and garlic, topped with 20 g grated Parmesan and served with 250 ml cola.",
    },
    storePrice: 280,
    price: 310, // yuvarlanmış (0/5): 310 TL
    hasDrinkUpgrade: true,
    hasFriesUpgrade: false,
  },

  // ==================== 3. WRAP MENÜLER ====================
  {
    id: "kofte-wrap",
    category: "wraps",
    popular: true,
    image: "/images/products/kofte-wrap.jpg",
    imageFocus: "50% 70%",
    name: {
      tr: "Köfte Wrap Menü",
      en: "Grilled Meatball (Köfte) Wrap Menu",
    },
    includedBadge: {
      tr: "🍟 150g Patates + 🥤 250ml Kola Dahil",
      en: "🍟 150g Fries + 🥤 250ml Cola Included",
    },
    calories: {
      tr: "~1.220 kcal (Wrap: 780 + Patates: 335 + Kola: 105 kcal)",
      en: "~1,220 kcal (Wrap: 780 + Fries: 335 + Cola: 105 kcal)",
    },
    description: {
      tr: "Büyük boy tortilla lavaş içinde ızgara dana köfte (110 g), bol eritilmiş cheddar peyniri (60 g), taze kaşar peyniri (15 g), tatlı mısır ve kıvırcık marul; yanında 150 g patates kızartması ve 250 ml kutu kola ile menü.",
      en: "Large toasted tortilla wrap filled with grilled beef meatballs (110 g), melted cheddar cheese (60 g), kashar cheese (15 g), sweet corn, and crisp lettuce; served with 150 g fries and 250 ml cola.",
    },
    storePrice: 430,
    price: 475, // yuvarlanmış (0/5): 475 TL
    hasDrinkUpgrade: true,
    hasFriesUpgrade: true,
  },
  {
    id: "tavuk-wrap",
    category: "wraps",
    popular: false,
    image: "/images/products/tavuk-wrap.jpg",
    imageFocus: "50% 70%",
    name: {
      tr: "Tavuk Wrap Menü",
      en: "Chicken & Cheddar Wrap Menu",
    },
    includedBadge: {
      tr: "🍟 150g Patates + 🥤 250ml Kola Dahil",
      en: "🍟 150g Fries + 🥤 250ml Cola Included",
    },
    calories: {
      tr: "~1.080 kcal (Wrap: 640 + Patates: 335 + Kola: 105 kcal)",
      en: "~1,080 kcal (Wrap: 640 + Fries: 335 + Cola: 105 kcal)",
    },
    description: {
      tr: "Büyük boy tortilla lavaş içinde sote tavuk bonfile (110 g), bol eritilmiş cheddar peyniri (60 g), taze kaşar peyniri (15 g), tatlı mısır ve kıvırcık marul; yanında 150 g patates kızartması ve 250 ml kutu kola ile menü.",
      en: "Large toasted tortilla wrap with sautéed chicken breast (110 g), melted cheddar cheese (60 g), kashar cheese (15 g), sweet corn, and crisp lettuce; served with 150 g fries and 250 ml cola.",
    },
    storePrice: 320,
    price: 350, // yuvarlanmış (0/5): 350 TL
    hasDrinkUpgrade: true,
    hasFriesUpgrade: true,
  },

  // ==================== 4. ÇITIR TAVUK ====================
  {
    id: "citir-tavuk-porsiyon",
    category: "chicken",
    popular: true,
    image: "/images/products/citir-tavuk-porsiyon.jpg",
    imageFocus: "50% 55%",
    name: {
      tr: "Çıtır Tavuk Sepeti (Porsiyon)",
      en: "Crispy Chicken Tenders Basket",
    },
    includedBadge: {
      tr: "🍟 150g Patates + 🥣 2 Özel Dip Sos Dahil",
      en: "🍟 150g Fries + 🥣 2 Dip Sauces Included",
    },
    calories: {
      tr: "~995 kcal (Çıtır Tavuk: 480 + Patates: 335 + Soslar: 180 kcal)",
      en: "~995 kcal (Crispy Chicken: 480 + Fries: 335 + Sauces: 180 kcal)",
    },
    description: {
      tr: "Dışı çıtır kaplamalı, içi sulu 200 g çıtır tavuk göğüs fileto parçaları; yanında 150 g McCain patates kızartması, özel acılı mayonez (30 g) ve sweet chili dip sos (20 g) ile servis edilir.",
      en: "200 g golden crunchy chicken breast tenders served with 150 g crispy McCain french fries, spicy mayonnaise dip (30 g), and sweet chili dip sauce (20 g).",
    },
    storePrice: 285,
    price: 315, // yuvarlanmış (0/5): 315 TL
    hasDrinkUpgrade: false,
    hasFriesUpgrade: true,
  },

  // ==================== 5. SALATALAR ====================
  {
    id: "sezar-salata",
    category: "salads",
    popular: true,
    image: "/images/products/sezar-salata.jpg",
    imageFocus: "50% 65%",
    name: {
      tr: "Izgara Tavuklu Sezar Salata",
      en: "Grilled Chicken Caesar Salad",
    },
    includedBadge: {
      tr: "🥗 200g Izgara Tavuk + 🧀 Parmesan",
      en: "🥗 200g Grilled Chicken + 🧀 Parmesan",
    },
    calories: {
      tr: "~895 kcal (Yüksek Proteinli Tekil Porsiyon)",
      en: "~895 kcal (High-Protein Single Portion)",
    },
    description: {
      tr: "Taze göbek marul yaprakları (110 g) üzerinde 200 g ızgara tavuk bonfile dilimleri, fırınlanmış kıtır kruton ekmek (20 g), toz Parmesan peyniri (15 g) ve sızma zeytinyağlı, hardallı özel Sezar sos ile.",
      en: "Crisp iceberg lettuce (110 g) topped with 200 g grilled chicken breast strips, oven-baked herb croutons (20 g), grated Parmesan (15 g), and house Caesar dressing with extra virgin olive oil.",
    },
    storePrice: 310,
    price: 340, // yuvarlanmış (0/5): 340 TL
    hasDrinkUpgrade: false,
    hasFriesUpgrade: false,
  },
  {
    id: "peynirli-salata",
    category: "salads",
    popular: false,
    image: "/images/products/peynirli-salata.jpg",
    imageFocus: "50% 65%",
    name: {
      tr: "Cevizli & Beyaz Peynirli Akdeniz Salata",
      en: "Mediterranean Cheese & Walnut Salad",
    },
    includedBadge: {
      tr: "🧀 50g Beyaz Peynir + 🌰 25g Ceviz İçi",
      en: "🧀 50g Feta Cheese + 🌰 25g Walnuts",
    },
    calories: {
      tr: "~430 kcal (Hafif & Dengeli Tekil Porsiyon)",
      en: "~430 kcal (Light & Balanced Single Portion)",
    },
    description: {
      tr: "Taze kıvırcık marul (110 g), çeri domates (40 g), salatalık (60 g) ve kırmızı kapya biber (50 g); üzerinde tam yağlı beyaz peynir (50 g), ceviz içi (25 g) ve kıtır kruton ekmek (20 g) ile.",
      en: "Fresh green lettuce (110 g), cherry tomatoes (40 g), cucumber (60 g), and sweet red bell pepper (50 g) topped with full-fat white cheese (50 g), walnuts (25 g), and crunchy croutons (20 g).",
    },
    storePrice: 225,
    price: 250, // yuvarlanmış (0/5): 250 TL
    hasDrinkUpgrade: false,
    hasFriesUpgrade: false,
  },

  // ==================== 6. YAN ÜRÜNLER, PORSİYON PATATES & İÇECEKLER ====================
  {
    id: "extra-sade-patates-150",
    category: "extras",
    popular: false,
    image: "/images/products/patates-porsiyon.jpg",
    imageFocus: "50% 50%",
    name: {
      tr: "Sade Patates Kızartması Porsiyonu (150 g)",
      en: "Classic French Fries Portion (150 g)",
    },
    includedBadge: {
      tr: "🍟 150 g Standart Porsiyon",
      en: "🍟 150 g Standard Portion",
    },
    calories: {
      tr: "~335 kcal",
      en: "~335 kcal",
    },
    description: {
      tr: "Altın sarısı, dışı çıtır içi yumuşak 150 g McCain patates kızartması porsiyonu.",
      en: "150 g portion of golden, crispy-on-the-outside fluffy-on-the-inside McCain french fries.",
    },
    storePrice: 70,
    price: 75, // yuvarlanmış (0/5): 75 TL
    hasDrinkUpgrade: false,
    hasFriesUpgrade: false,
    isSideItem: true,
  },
  {
    id: "extra-buyuk-patates-200",
    category: "extras",
    popular: false,
    image: "/images/products/patates-porsiyon.jpg",
    imageFocus: "50% 50%",
    name: {
      tr: "Büyük Boy Sade Patates Porsiyonu (200 g)",
      en: "Large French Fries Portion (200 g)",
    },
    includedBadge: {
      tr: "🍟 200 g Duble Porsiyon",
      en: "🍟 200 g Large Portion",
    },
    calories: {
      tr: "~445 kcal",
      en: "~445 kcal",
    },
    description: {
      tr: "Paylaşımlık veya bol patates sevenler için 200 g büyük boy çıtır McCain patates kızartması porsiyonu.",
      en: "Generous 200 g large portion of golden crispy McCain french fries.",
    },
    storePrice: 85,
    price: 95, // yuvarlanmış (0/5): 95 TL
    hasDrinkUpgrade: false,
    hasFriesUpgrade: false,
    isSideItem: true,
  },
  {
    id: "extra-cheddarli-patates",
    category: "extras",
    popular: true,
    image: "/images/products/patates-porsiyon.jpg",
    imageFocus: "50% 50%",
    name: {
      tr: "Cheddarlı Patates Kızartması Porsiyonu",
      en: "Cheddar Cheese Fries Portion",
    },
    includedBadge: {
      tr: "🧀 150 g Patates + 40 g Eritilmiş Cheddar",
      en: "🧀 150 g Fries + 40 g Melted Cheddar",
    },
    calories: {
      tr: "~495 kcal",
      en: "~495 kcal",
    },
    description: {
      tr: "150 g çıtır McCain patates kızartması üzerinde 40 g sıcak eritilmiş gerçek Cheddar peyniri.",
      en: "150 g crispy McCain french fries smothered in 40 g of warm melted real Cheddar cheese.",
    },
    storePrice: 115,
    price: 125, // yuvarlanmış (0/5): 125 TL
    hasDrinkUpgrade: false,
    hasFriesUpgrade: false,
    isSideItem: true,
  },
  {
    id: "extra-parmesanli-patates",
    category: "extras",
    popular: true,
    image: "/images/products/patates-porsiyon.jpg",
    imageFocus: "50% 50%",
    name: {
      tr: "Parmesanlı Patates Kızartması Porsiyonu",
      en: "Parmesan & Garlic Herb Fries Portion",
    },
    includedBadge: {
      tr: "🧀 150 g Patates + 20 g Toz Parmesan",
      en: "🧀 150 g Fries + 20 g Aged Parmesan",
    },
    calories: {
      tr: "~425 kcal",
      en: "~425 kcal",
    },
    description: {
      tr: "150 g sıcak McCain patates kızartması üzerinde 20 g İtalyan toz Parmesan peyniri ve sarımsaklı özel baharat dokunuşu.",
      en: "150 g hot crispy McCain fries tossed with 20 g grated Italian Parmesan cheese and aromatic garlic herbs.",
    },
    storePrice: 125,
    price: 140, // yuvarlanmış (0/5): 140 TL
    hasDrinkUpgrade: false,
    hasFriesUpgrade: false,
    isSideItem: true,
  },
  {
    id: "extra-duble-peynirli-patates",
    category: "extras",
    popular: false,
    image: "/images/products/patates-porsiyon.jpg",
    imageFocus: "50% 50%",
    name: {
      tr: "Cheddarlı & Parmesanlı Duble Patates Porsiyonu",
      en: "Double Cheese (Cheddar & Parmesan) Fries Portion",
    },
    includedBadge: {
      tr: "🧀 35g Cheddar + 15g Parmesan + 150g Patates",
      en: "🧀 35g Cheddar + 15g Parmesan + 150g Fries",
    },
    calories: {
      tr: "~540 kcal",
      en: "~540 kcal",
    },
    description: {
      tr: "150 g çıtır patates kızartması üzerinde hem 35 g eritilmiş sıcak Cheddar hem de 15 g toz Parmesan peyniri.",
      en: "150 g crispy fries loaded with both 35 g warm melted Cheddar and 15 g grated Parmesan cheese.",
    },
    storePrice: 145,
    price: 160, // yuvarlanmış (0/5): 160 TL
    hasDrinkUpgrade: false,
    hasFriesUpgrade: false,
    isSideItem: true,
  },
  {
    id: "extra-kutu-icecek-330",
    category: "extras",
    popular: false,
    image: "/images/products/kutu-icecek.jpg",
    imageFocus: "50% 50%",
    name: {
      tr: "Kutu İçecek (330 ml — Pepsi / Sprite / Coca-Cola / Zero)",
      en: "Canned Soft Drink (330 ml — Pepsi / Sprite / Coca-Cola / Zero)",
    },
    includedBadge: {
      tr: "🥤 330 ml Soğuk Kutu İçecek",
      en: "🥤 330 ml Chilled Can",
    },
    calories: {
      tr: "0 – 140 kcal",
      en: "0 – 140 kcal",
    },
    description: {
      tr: "330 ml soğuk kutu içecek (Sipariş notunda Pepsi, Sprite, Coca-Cola veya Coca-Cola Zero tercihinizi belirtebilirsiniz).",
      en: "330 ml chilled canned soft drink (Choose Pepsi, Sprite, Coca-Cola, or Coca-Cola Zero in your item note).",
    },
    storePrice: 60,
    price: 65, // yuvarlanmış (0/5): 65 TL
    hasDrinkUpgrade: false,
    hasFriesUpgrade: false,
    isSideItem: true,
  },
  {
    id: "extra-ozel-dip-sos",
    category: "extras",
    popular: false,
    image: "/images/products/dip-sos.jpg",
    imageFocus: "50% 50%",
    name: {
      tr: "Özel Dip Sos (30 g — Burger / Acılı Mayonez / Sweet Chili)",
      en: "Signature Dip Sauce (30 g — Burger / Spicy Mayo / Sweet Chili)",
    },
    includedBadge: {
      tr: "🥣 30 g Dip Sos Kabı",
      en: "🥣 30 g Dip Cup",
    },
    calories: {
      tr: "~110 kcal",
      en: "~110 kcal",
    },
    description: {
      tr: "Patates ve çıtır lezzetlerin yanına 30 g özel dip sos (Burger Sos, Acılı Mayonez veya Sweet Chili).",
      en: "30 g signature dipping sauce cup (House Burger Sauce, Spicy Mayo, or Sweet Chili).",
    },
    storePrice: 20,
    price: 20, // yuvarlanmış (0/5): 20 TL
    hasDrinkUpgrade: false,
    hasFriesUpgrade: false,
    isSideItem: true,
  },
  {
    id: "extra-truflu-mayonez-sos",
    category: "extras",
    popular: false,
    image: "/images/products/dip-sos.jpg",
    imageFocus: "50% 50%",
    name: {
      tr: "Trüflü Mayonez Dip Sos (30 g)",
      en: "Truffle Mayonnaise Dip (30 g)",
    },
    includedBadge: {
      tr: "🍄 30 g Özel Trüflü Sos",
      en: "🍄 30 g Truffle Dip",
    },
    calories: {
      tr: "~165 kcal",
      en: "~165 kcal",
    },
    description: {
      tr: "Gerçek siyah trüf aromalı 30 g Calve Trüflü Mayonez dip sos.",
      en: "30 g cup of rich black truffle mayonnaise dipping sauce.",
    },
    storePrice: 50,
    price: 55, // yuvarlanmış (0/5): 55 TL
    hasDrinkUpgrade: false,
    hasFriesUpgrade: false,
    isSideItem: true,
  },
];

export const TRANSLATIONS = {
  tr: {
    brandSubtitle: "All in One · Coffee & Kitchen",
    brandSlogan: "Taze ve özenle hazırlanan lezzetler.",
    navMenu: "Menü",
    navCart: "Sepetim",
    searchPlaceholder: "Burger, makarna, wrap veya salata ara...",
    clearSearch: "Temizle",
    itemsCount: "Çeşit",
    popularBadge: "FAVORİ",
    directOrderBadge: "Online Sipariş",
    customizeAndAdd: "Seç & Sepete Ekle",
    addedToast: "Sepete Eklendi!",
    modalDrinkTitle: "1. Menü İçecek Seçimi (250 ml ➔ 330 ml Değişim)",
    modalDrinkSub: "Menüde 250 ml Kola dahildir. İsterseniz 330 ml kutu içecekle değiştirebilirsiniz:",
    modalFriesTitle: "2. Menü Patates Seçimi (Cheddarlı / Parmesanlı Farkı)",
    modalFriesSub: "Menüde 150 g Sade Patates dahildir. Peynirli veya büyük boya yükseltebilirsiniz:",
    modalExtrasTitle: "3. Ekstra Porsiyon Patates, İçecek & Dip Sos Ekle",
    modalExtrasSub: "Siparişinize sıfırdan ekstra porsiyon veya sos ekleyebilirsiniz (İsteğe Bağlı):",
    modalNoteTitle: "Ürün Notu / Özel İstek",
    modalNotePlaceholder: "Örn: Soğansız olsun, turşu olmasın, 330 ml içecek Pepsi olsun...",
    includedTag: "Menüye Dahil",
    optionalTag: "İsteğe Bağlı",
    singleChoiceTag: "Tek Seçim",
    multiChoiceTag: "Çoklu Seçim",
    basePriceLabel: "Menü Taban Fiyatı",
    drinkUpgradeLabel: "İçecek Değişim Farkı",
    friesUpgradeLabel: "Patates Yükseltme Farkı",
    extrasLabel: "Ekstra Yan Ürünler",
    totalLabel: "Toplam Tutar",
    addToCartBtn: "Sepete Ekle",
    cartPageTitle: "Sepetim & Sipariş Onayı",
    cartPageSubtitle: "Seçtiğiniz ürünleri kontrol edin, teslimat bilgilerinizi girerek WhatsApp üzerinden tek tıkla siparişinizi gönderin.",
    backToMenu: "← Menüye Dön",
    backToMenuAddMore: "← Menüye Dön & Daha Fazla Ürün Ekle",
    addMoreFromMenu: "➕ Menüden Başka Ürün Ekle",
    cancelReturnToMenu: "← Vazgeç ve Menüye Dön",
    modalTopBack: "Menüye Dön",
    clearCart: "Sepeti Temizle",
    emptyCartTitle: "Sepetiniz Henüz Boş",
    emptyCartDesc: "Burger menülerimizi, taze İtalyan makarnalarımızı, wrap veya salatalarımızı keşfederek hemen siparişinizi oluşturun.",
    exploreMenuBtn: "Menüyü Keşfet",
    orderItemsHeading: "Sepetteki Ürünler",
    upsellTitle: "Yanına Ekstra Patates veya İçecek İster misiniz?",
    customerFormTitle: "Müşteri & Teslimat Bilgileri",
    customerFormSubtitle: "Siparişi onaylamak için lütfen Ad Soyad ve Adres bilgilerinizi eksiksiz doldurun.",
    fullNameLabel: "İsim Soyisim *",
    fullNamePlaceholder: "Örn: Ahmet Yılmaz",
    phoneLabel: "Telefon Numarası (İsteğe Bağlı)",
    phonePlaceholder: "Örn: 0532 000 00 00",
    addressLabel: "Teslimat Adresi *",
    addressPlaceholder: "Mahalle, cadde, sokak, bina no, kat ve daire numarası girin...",
    orderNoteLabel: "Genel Sipariş / Kurye Notu (İsteğe Bağlı)",
    orderNotePlaceholder: "Örn: Kapıda kredi kartı / nakit, zil çalışmıyor lütfen arayın...",
    requiredWarning: "Siparişi WhatsApp ile göndermek için lütfen İsim Soyisim ve Teslimat Adresi alanlarını doldurun.",
    whatsappSendBtn: "Siparişi WhatsApp ile Gönder",
    whatsappPhoneInfo: "Siparişiniz düzenli mesaj olarak 0549 711 32 24 numaralı WhatsApp hattımıza iletilir.",
    whatsappPreviewTitle: "Gönderilecek WhatsApp Mesajı Önizlemesi",
    copyOrderBtn: "Sipariş Metnini Kopyala",
    copiedOrderBtn: "Kopyalandı ✓",
    footerAbout: "AIO — All in One. Nitelikli kahve ritüelleri, burgerler, el yapımı makarnalar ve taze lezzetler bir arada.",
    footerHours: "Her Gün 10:00 – 23:00 Paket & Gel-Al Servis",
    footerLocations: "İstanbul (Şişli / Nişantaşı) & İzmir (Alsancak)",
    footerRights: "© 2026 AIO Coffee & Kitchen. Tüm hakları saklıdır.",
  },
  en: {
    brandSubtitle: "All in One · Coffee & Kitchen",
    brandSlogan: "Freshly crafted meals delivered to your door.",
    navMenu: "Menu",
    navCart: "My Cart",
    searchPlaceholder: "Search burgers, pasta, wraps or salads...",
    clearSearch: "Clear",
    itemsCount: "Items",
    popularBadge: "POPULAR",
    directOrderBadge: "Online Order",
    customizeAndAdd: "Customize & Add",
    addedToast: "Added to Cart!",
    modalDrinkTitle: "1. Menu Beverage Selection (250 ml ➔ 330 ml Upgrade)",
    modalDrinkSub: "250 ml Cola is included in the menu. Upgrade to a 330 ml can if desired:",
    modalFriesTitle: "2. Menu Fries Selection (Cheddar / Parmesan Upgrade)",
    modalFriesSub: "150 g Classic Fries are included. Upgrade to loaded cheese fries or large size:",
    modalExtrasTitle: "3. Add Extra Portion Fries, Drinks & Dip Sauces",
    modalExtrasSub: "Add standalone side portions or extra dip sauces to your order (Optional):",
    modalNoteTitle: "Special Instructions / Item Note",
    modalNotePlaceholder: "E.g., No onions, extra pickles, sauce on the side...",
    includedTag: "Included",
    optionalTag: "Optional",
    singleChoiceTag: "Single Select",
    multiChoiceTag: "Multi Select",
    basePriceLabel: "Base Menu Price",
    drinkUpgradeLabel: "Beverage Upgrade",
    friesUpgradeLabel: "Fries Upgrade",
    extrasLabel: "Extra Add-ons",
    totalLabel: "Total Amount",
    addToCartBtn: "Add to Cart",
    cartPageTitle: "My Cart & Order Confirmation",
    cartPageSubtitle: "Review your customized items, enter your delivery address, and send your order directly via WhatsApp.",
    backToMenu: "← Back to Menu",
    backToMenuAddMore: "← Back to Menu & Add More Items",
    addMoreFromMenu: "➕ Add More Items from Menu",
    cancelReturnToMenu: "← Cancel & Return to Menu",
    modalTopBack: "Back to Menu",
    clearCart: "Clear Cart",
    emptyCartTitle: "Your Cart is Empty",
    emptyCartDesc: "Explore our burger combos, authentic Italian pastas, wraps, and fresh salads to build your order.",
    exploreMenuBtn: "Explore Menu",
    orderItemsHeading: "Items in Your Cart",
    upsellTitle: "Would You Like Extra Fries or Drinks on the Side?",
    customerFormTitle: "Customer & Delivery Details",
    customerFormSubtitle: "Please enter your Full Name and Delivery Address to confirm your order.",
    fullNameLabel: "Full Name (First & Last Name) *",
    fullNamePlaceholder: "E.g., John Doe",
    phoneLabel: "Phone Number (Optional)",
    phonePlaceholder: "E.g., +90 532 000 00 00",
    addressLabel: "Delivery Address *",
    addressPlaceholder: "Street, building number, floor, apartment, and neighborhood...",
    orderNoteLabel: "Delivery / Courier Note (Optional)",
    orderNotePlaceholder: "E.g., Pay by card at the door, please call upon arrival...",
    requiredWarning: "Please fill in both your Full Name and Delivery Address to send your order via WhatsApp.",
    whatsappSendBtn: "Send Order via WhatsApp",
    whatsappPhoneInfo: "Your order will be formatted cleanly and sent to our WhatsApp line at 0549 711 32 24.",
    whatsappPreviewTitle: "WhatsApp Order Message Preview",
    copyOrderBtn: "Copy Order Text",
    copiedOrderBtn: "Copied ✓",
    footerAbout: "AIO — All in One. Specialty coffee rituals, burgers, handcrafted pastas, and fresh plates brought together.",
    footerHours: "Daily 10:00 – 23:00 Delivery & Pickup Service",
    footerLocations: "Istanbul (Şişli / Nişantaşı) & Izmir (Alsancak)",
    footerRights: "© 2026 AIO Coffee & Kitchen. All rights reserved.",
  },
};
