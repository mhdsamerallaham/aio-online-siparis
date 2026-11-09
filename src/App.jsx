import React, { useState, useMemo, useEffect } from "react";
import {
  WHATSAPP_NUMBER,
  CATEGORIES,
  DRINK_UPGRADES,
  FRIES_UPGRADES,
  EXTRA_ADDONS,
  PRODUCTS,
  TRANSLATIONS,
} from "./data/menuData";

export default function App() {
  // Language state ('tr' | 'en') persisted in localStorage
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("aio_lang") || "tr";
    } catch {
      return "tr";
    }
  });

  // Active Page ('menu' | 'cart')
  const [activePage, setActivePage] = useState("menu");

  // Selected Category ('all' | 'burgers' | 'pastas' | 'wraps' | 'chicken' | 'salads' | 'extras')
  const [activeCategory, setActiveCategory] = useState("all");

  // Search query
  const [searchQuery, setSearchQuery] = useState("");

  // Cart items state persisted in localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("aio_cart_v2");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Customer info state persisted in localStorage
  const [customerName, setCustomerName] = useState(() => {
    try {
      return localStorage.getItem("aio_customer_name") || "";
    } catch {
      return "";
    }
  });
  const [customerPhone, setCustomerPhone] = useState(() => {
    try {
      return localStorage.getItem("aio_customer_phone") || "";
    } catch {
      return "";
    }
  });
  const [customerAddress, setCustomerAddress] = useState(() => {
    try {
      return localStorage.getItem("aio_customer_address") || "";
    } catch {
      return "";
    }
  });
  const [orderNote, setOrderNote] = useState("");
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // Active Product for Customization Modal
  const [modalProduct, setModalProduct] = useState(null);
  const [selectedDrink, setSelectedDrink] = useState(DRINK_UPGRADES[0]);
  const [selectedFries, setSelectedFries] = useState(FRIES_UPGRADES[0]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [itemNote, setItemNote] = useState("");
  const [modalQty, setModalQty] = useState(1);

  // Toast notification state
  const [toastMsg, setToastMsg] = useState(null);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.tr;

  useEffect(() => {
    try {
      localStorage.setItem("aio_lang", lang);
    } catch {}
  }, [lang]);

  useEffect(() => {
    try {
      localStorage.setItem("aio_cart_v2", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("aio_customer_name", customerName);
      localStorage.setItem("aio_customer_phone", customerPhone);
      localStorage.setItem("aio_customer_address", customerAddress);
    } catch {}
  }, [customerName, customerPhone, customerAddress]);

  const getPrice = (itemObj) => {
    if (!itemObj) return 0;
    return itemObj.price ?? 0;
  };

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? null : prev));
    }, 2400);
  };

  // Open product modal with default selections & browser history state for mobile back gesture
  const openProductModal = (product) => {
    setModalProduct(product);
    setSelectedDrink(DRINK_UPGRADES[0]);
    setSelectedFries(FRIES_UPGRADES[0]);
    setSelectedExtras([]);
    setItemNote("");
    setModalQty(1);
    try {
      window.history.pushState({ aioModal: true }, "");
    } catch {}
  };

  const closeProductModal = () => {
    setModalProduct(null);
    try {
      if (window.history.state?.aioModal) {
        window.history.back();
      }
    } catch {}
  };

  // Close modal on browser back gesture/button or Escape key
  useEffect(() => {
    if (!modalProduct) return;
    const handlePopState = () => {
      setModalProduct(null);
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeProductModal();
      }
    };
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalProduct]);

  const toggleExtraAddon = (addon) => {
    setSelectedExtras((prev) => {
      const exists = prev.some((x) => x.id === addon.id);
      if (exists) return prev.filter((x) => x.id !== addon.id);
      return [...prev, addon];
    });
  };

  // Add item to cart
  const handleAddToCart = (
    product,
    drinkOpt = DRINK_UPGRADES[0],
    friesOpt = FRIES_UPGRADES[0],
    extrasList = [],
    noteText = "",
    qty = 1
  ) => {
    const finalDrink = product.hasDrinkUpgrade ? drinkOpt : null;
    const finalFries = product.hasFriesUpgrade ? friesOpt : null;
    const sortedExtras = [...extrasList].sort((a, b) => a.id.localeCompare(b.id));
    const cleanNote = noteText.trim();

    const cartKey = [
      product.id,
      finalDrink ? finalDrink.id : "nodrink",
      finalFries ? finalFries.id : "nofries",
      sortedExtras.map((e) => e.id).join("+"),
      cleanNote.toLowerCase(),
    ].join("__");

    setCart((prev) => {
      const idx = prev.findIndex((item) => item.cartKey === cartKey);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          quantity: updated[idx].quantity + qty,
        };
        return updated;
      }
      return [
        ...prev,
        {
          cartKey,
          productId: product.id,
          product,
          drinkUpgrade: finalDrink,
          friesUpgrade: finalFries,
          extras: sortedExtras,
          note: cleanNote,
          quantity: qty,
        },
      ];
    });

    triggerToast(`${qty}x ${product.name[lang]} — ${t.addedToast}`);
  };

  // Calculate unit price
  const getCartItemUnitPrice = (cartItem) => {
    const base = getPrice(cartItem.product);
    const drinkP = cartItem.drinkUpgrade ? getPrice(cartItem.drinkUpgrade) : 0;
    const friesP = cartItem.friesUpgrade ? getPrice(cartItem.friesUpgrade) : 0;
    const extrasP = (cartItem.extras || []).reduce((acc, ex) => acc + getPrice(ex), 0);
    return base + drinkP + friesP + extrasP;
  };

  const updateCartQty = (cartKey, newQty) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((item) => item.cartKey !== cartKey));
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartKey === cartKey ? { ...item, quantity: newQty } : item))
    );
  };

  const removeCartItem = (cartKey) => {
    setCart((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const totalCartAmount = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + getCartItemUnitPrice(item) * item.quantity,
        0
      ),
    [cart]
  );

  // Filtered products
  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchCat = activeCategory === "all" || p.category === activeCategory;
      if (!matchCat) return false;
      if (!q) return true;
      const nameTr = p.name.tr.toLowerCase();
      const nameEn = p.name.en.toLowerCase();
      const descTr = p.description.tr.toLowerCase();
      const descEn = p.description.en.toLowerCase();
      return (
        nameTr.includes(q) ||
        nameEn.includes(q) ||
        descTr.includes(q) ||
        descEn.includes(q)
      );
    });
  }, [activeCategory, searchQuery]);

  // Modal live price calculation
  const modalUnitPrice = useMemo(() => {
    if (!modalProduct) return 0;
    const base = getPrice(modalProduct);
    const drinkAdd = modalProduct.hasDrinkUpgrade ? getPrice(selectedDrink) : 0;
    const friesAdd = modalProduct.hasFriesUpgrade ? getPrice(selectedFries) : 0;
    const extrasAdd = selectedExtras.reduce((s, e) => s + getPrice(e), 0);
    return base + drinkAdd + friesAdd + extrasAdd;
  }, [modalProduct, selectedDrink, selectedFries, selectedExtras]);

  // Build formatted WhatsApp message
  const buildWhatsAppMessage = () => {
    const isTr = lang === "tr";

    const lines = [];
    lines.push(
      isTr
        ? "🍔 *YENİ SİPARİŞ — AIO COFFEE & KITCHEN*"
        : "🍔 *NEW ORDER — AIO COFFEE & KITCHEN*"
    );
    lines.push("━━━━━━━━━━━━━━━━━━━━");
    lines.push(
      `👤 *${isTr ? "Müşteri Ad Soyad" : "Customer Name"}:* ${
        customerName.trim() || "-"
      }`
    );
    if (customerPhone.trim()) {
      lines.push(
        `📞 *${isTr ? "Telefon" : "Phone"}:* ${customerPhone.trim()}`
      );
    }
    lines.push(
      `📍 *${isTr ? "Teslimat Adresi" : "Delivery Address"}:* ${
        customerAddress.trim() || "-"
      }`
    );
    if (orderNote.trim()) {
      lines.push(
        `📝 *${isTr ? "Sipariş Notu" : "Delivery Note"}:* ${orderNote.trim()}`
      );
    }
    lines.push("━━━━━━━━━━━━━━━━━━━━");
    lines.push(isTr ? "🛒 *SİPARİŞ DETAYLARI:*" : "🛒 *ORDER ITEMS:*");

    cart.forEach((item, index) => {
      const unitP = getCartItemUnitPrice(item);
      const lineTotal = unitP * item.quantity;
      const pName = item.product.name[lang];
      lines.push(
        `\n*${index + 1}) ${item.quantity}x ${pName}* — *₺${lineTotal}* _(₺${unitP}/adet)_`
      );

      if (item.drinkUpgrade) {
        const dPrice = getPrice(item.drinkUpgrade);
        lines.push(
          `   🥤 ${isTr ? "İçecek" : "Drink"}: ${
            item.drinkUpgrade.name[lang]
          }${dPrice > 0 ? ` (+₺${dPrice})` : ""}`
        );
      }
      if (item.friesUpgrade) {
        const fPrice = getPrice(item.friesUpgrade);
        lines.push(
          `   🍟 ${isTr ? "Patates" : "Fries"}: ${
            item.friesUpgrade.name[lang]
          }${fPrice > 0 ? ` (+₺${fPrice})` : ""}`
        );
      }
      if (item.extras && item.extras.length > 0) {
        item.extras.forEach((ex) => {
          lines.push(`   ➕ ${ex.name[lang]} (+₺${getPrice(ex)})`);
        });
      }
      if (item.note) {
        lines.push(
          `   💬 ${isTr ? "Ürün Notu" : "Item Note"}: ${item.note}`
        );
      }
    });

    lines.push("\n━━━━━━━━━━━━━━━━━━━━");
    lines.push(
      `💰 *${
        isTr ? "GENEL TOPLAM" : "GRAND TOTAL"
      }: ₺${totalCartAmount}*`
    );

    return lines.join("\n");
  };

  const isFormValid =
    customerName.trim().length >= 2 && customerAddress.trim().length >= 5;

  const handleSendWhatsApp = () => {
    if (!isFormValid) {
      setShowValidationAlert(true);
      return;
    }
    setShowValidationAlert(false);
    const msg = buildWhatsAppMessage();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCopyOrderText = () => {
    const msg = buildWhatsAppMessage();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(msg);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    }
  };

  const currentCatObj =
    CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1B1815]">
      {/* ================= NAVBAR ================= */}
      <header className="aio-navbar">
        <div className="app-container h-[68px] flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo */}
          <div
            onClick={() => {
              setActivePage("menu");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none shrink-0"
          >
            <img
              src="/images/logo.png"
              alt="AIO — All in One"
              className="h-9 sm:h-11 w-auto object-contain"
            />
            <div className="hidden sm:block border-l border-[#E6E0D5] pl-3">
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#4A1525] font-heading">
                AIO KITCHEN
              </div>
              <div className="text-[11px] text-[#5C5349] font-medium">
                {t.brandSubtitle}
              </div>
            </div>
          </div>

          {/* Right Actions: Menu / Cart Switcher + Language Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Menu Navigation Button */}
            <button
              type="button"
              onClick={() => {
                setActivePage("menu");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`h-10 sm:h-11 px-3 sm:px-4 rounded-2xl text-xs sm:text-sm font-bold font-heading transition-all cursor-pointer flex items-center gap-1.5 border shadow-2xs ${
                activePage === "menu"
                  ? "bg-[#F8F2F4] text-[#4A1525] border-[#4A1525]/30 font-black"
                  : "bg-[#4A1525] text-white border-[#4A1525] hover:bg-[#360F1B] font-extrabold animate-pulse"
              }`}
            >
              <span>{activePage === "cart" ? "←" : "🍽️"}</span>
              <span>{activePage === "cart" ? t.backToMenu : t.navMenu}</span>
            </button>

            {/* Language Selector (TR / EN) */}
            <div
              className="flex items-center bg-stone-100 p-1 rounded-2xl border border-stone-200/90"
              role="group"
              aria-label="Language Selector"
            >
              <button
                type="button"
                onClick={() => setLang("tr")}
                className={`h-8 px-2.5 rounded-xl text-xs font-extrabold font-heading transition-all cursor-pointer flex items-center gap-1 ${
                  lang === "tr"
                    ? "bg-[#4A1525] text-white shadow-2xs"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <span>🇹🇷</span>
                <span>TR</span>
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`h-8 px-2.5 rounded-xl text-xs font-extrabold font-heading transition-all cursor-pointer flex items-center gap-1 ${
                  lang === "en"
                    ? "bg-[#4A1525] text-white shadow-2xs"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <span>🇬🇧</span>
                <span>EN</span>
              </button>
            </div>

            {/* Cart Page Button */}
            <button
              type="button"
              onClick={() => {
                setActivePage("cart");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="relative h-10 sm:h-11 px-3.5 sm:px-4 bg-[#4A1525] hover:bg-[#360F1B] active:bg-[#2C0D16] text-white rounded-2xl text-xs sm:text-sm font-bold font-heading flex items-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
            >
              <span>🛒</span>
              <span className="hidden xs:inline sm:inline">{t.navCart}</span>
              <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-white text-[#4A1525] text-xs font-black">
                {totalCartCount}
              </span>
              {totalCartAmount > 0 && (
                <span className="hidden md:inline text-xs font-mono font-bold text-rose-100 border-l border-white/20 pl-2">
                  ₺{totalCartAmount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ================= TOAST NOTIFICATION ================= */}
      {toastMsg && (
        <div className="fixed top-20 right-4 z-50 bg-[#1B1815] text-white px-4 py-3 rounded-2xl shadow-xl border border-[#4A1525] flex items-center gap-2.5 text-xs sm:text-sm font-bold animate-bounce">
          <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">
            ✓
          </span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ================= MAIN CONTENT ================= */}
      {activePage === "menu" ? (
        <main className="flex-1 pb-28">
          {/* Refined & Simplified Hero Banner */}
          <section className="bg-white py-4 sm:py-5 border-b border-[#E6E0D5]">
            <div className="app-container flex flex-col md:flex-row md:items-center justify-between gap-3.5">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F8F2F4] border border-[#4A1525]/15 text-[11px] font-bold text-[#4A1525] tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{t.directOrderBadge}</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black font-heading text-stone-950 tracking-tight">
                  {lang === "tr" ? "AIO Menü" : "AIO Menu"}
                </h1>
                <p className="text-xs sm:text-sm text-stone-500 font-medium">
                  {t.brandSlogan}
                </p>
              </div>

              {/* Search Input */}
              <div className="relative w-full md:w-80 shrink-0">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full h-11 pl-10 pr-20 bg-[#FAF8F5] border border-[#E6E0D5] focus:bg-white focus:border-[#4A1525] rounded-2xl text-base sm:text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none transition-all shadow-2xs"
                />
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-sm">
                  🔍
                </span>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 px-2 py-1 bg-stone-200/80 hover:bg-stone-300 rounded-lg text-[10px] font-bold text-stone-700 cursor-pointer"
                  >
                    {t.clearSearch}
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Sticky Category Navigation Bar */}
          <nav className="aio-category-bar" aria-label="Categories">
            <div className="app-container">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  const count =
                    cat.id === "all"
                      ? PRODUCTS.length
                      : PRODUCTS.filter((p) => p.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={`h-10 sm:h-11 px-3.5 sm:px-4 rounded-2xl font-heading font-bold text-xs sm:text-sm flex items-center gap-2 shrink-0 transition-all cursor-pointer border ${
                        isActive
                          ? "bg-[#4A1525] text-white border-[#4A1525] shadow-sm"
                          : "bg-white text-stone-700 border-[#E6E0D5] hover:border-[#4A1525]/40 hover:bg-[#F8F2F4]/50"
                      }`}
                    >
                      <span className="text-base leading-none">{cat.icon}</span>
                      <span className="whitespace-nowrap">{cat.name[lang]}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                          isActive
                            ? "bg-white text-[#4A1525]"
                            : "bg-stone-100 text-stone-600"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Category Sections with 2-Column Product Cards */}
          <div className="app-container space-y-8 mt-5">
            {activeCategory === "all" && !searchQuery ? (
              /* All Categories Grouped with 2-Card Grid Under Each Category */
              CATEGORIES.filter((c) => c.id !== "all").map((cat) => {
                const catProducts = PRODUCTS.filter((p) => p.category === cat.id);
                if (catProducts.length === 0) return null;

                return (
                  <section key={cat.id} id={`cat-${cat.id}`} className="space-y-3.5">
                    {/* Category Header Banner */}
                    <div className="bg-white border border-[#E6E0D5] rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3 shadow-2xs">
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-[#F8F2F4] border border-[#4A1525]/15 flex items-center justify-center text-xl shrink-0">
                          {cat.icon}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-base sm:text-lg font-extrabold font-heading text-stone-950">
                              {cat.name[lang]}
                            </h2>
                            {cat.badge && (
                              <span className="hidden xs:inline-flex px-2 py-0.5 bg-[#4A1525] text-white text-[10px] font-bold rounded-md uppercase tracking-wider">
                                {cat.badge[lang]}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-stone-500 font-medium line-clamp-1">
                            {cat.subtitle[lang]}
                          </p>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 rounded-xl bg-[#F8F2F4] text-[#4A1525] text-xs font-black font-mono shrink-0">
                        {catProducts.length} {t.itemsCount}
                      </span>
                    </div>

                    {/* 2'li Ürün Grid'i */}
                    <div className="aio-product-grid">
                      {catProducts.map((product) => {
                        const displayPrice = getPrice(product);
                        const hasOptions = product.hasDrinkUpgrade || product.hasFriesUpgrade;
                        const calText = product.calories[lang].split("(")[0].replace("~", "").trim();

                        return (
                          <article
                            key={product.id}
                            onClick={() => openProductModal(product)}
                            className="aio-product-card group"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                openProductModal(product);
                              }
                            }}
                          >
                            <div>
                              {/* Image Box (800x800 square framing) */}
                              <div className="aio-card-image-box">
                                <img
                                  src={product.image}
                                  alt={product.name[lang]}
                                  loading="lazy"
                                  className="aio-card-img"
                                />

                                {/* Top Badges */}
                                <div className="absolute top-1.5 left-1.5 right-1.5 flex items-center justify-between pointer-events-none">
                                  {product.popular ? (
                                    <span className="px-2 py-0.5 rounded-full bg-[#4A1525] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow-sm border border-white/20">
                                      ⭐ {t.popularBadge}
                                    </span>
                                  ) : (
                                    <span />
                                  )}

                                  {calText && (
                                    <span className="px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[9px] sm:text-[10px] font-semibold">
                                      🔥 {calText}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Card Body */}
                              <div className="aio-card-body">
                                <h3 className="aio-card-title">
                                  {product.name[lang]}
                                </h3>

                                {product.includedBadge && (
                                  <div className="aio-combo-pill">
                                    <span>{product.includedBadge[lang]}</span>
                                  </div>
                                )}

                                <p className="aio-card-desc">
                                  {product.description[lang]}
                                </p>
                              </div>
                            </div>

                            {/* Card Footer: Price & Add Button */}
                            <div className="aio-card-footer">
                              <span className="aio-card-price">
                                ₺{displayPrice}
                              </span>

                              <div className="flex items-center gap-1">
                                {product.isSideItem ? (
                                  <>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddToCart(product, null, null, [], "", 1);
                                      }}
                                      className="aio-btn-quick-add"
                                      title={lang === "tr" ? "Hızlı Ekle" : "Quick Add"}
                                    >
                                      +
                                    </button>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        openProductModal(product);
                                      }}
                                      className="aio-btn-add"
                                    >
                                      <span>{lang === "tr" ? "Detay" : "Details"}</span>
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openProductModal(product);
                                    }}
                                    className="aio-btn-add"
                                  >
                                    <span>{hasOptions ? (lang === "tr" ? "Seç +" : "Select +") : (lang === "tr" ? "Ekle +" : "Add +")}</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </section>
                );
              })
            ) : (
              /* Single Selected Category or Search Results (2-Card Grid) */
              <div className="space-y-4">
                {/* Active Category Banner */}
                <div className="bg-white border border-[#E6E0D5] rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-[#F8F2F4] border border-[#4A1525]/15 flex items-center justify-center text-xl shrink-0">
                      {currentCatObj.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base sm:text-lg font-extrabold font-heading text-stone-950">
                          {searchQuery ? (lang === "tr" ? `Arama: "${searchQuery}"` : `Search: "${searchQuery}"`) : currentCatObj.name[lang]}
                        </h2>
                        {currentCatObj.badge && !searchQuery && (
                          <span className="hidden xs:inline-flex px-2 py-0.5 bg-[#4A1525] text-white text-[10px] font-bold rounded-md uppercase tracking-wider">
                            {currentCatObj.badge[lang]}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 font-medium line-clamp-1">
                        {currentCatObj.subtitle[lang]}
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-xl bg-[#F8F2F4] text-[#4A1525] text-xs font-black font-mono shrink-0">
                    {filteredProducts.length} {t.itemsCount}
                  </span>
                </div>

                {/* 2'li Ürün Grid'i */}
                <div className="aio-product-grid">
                  {filteredProducts.map((product) => {
                    const displayPrice = getPrice(product);
                    const hasOptions = product.hasDrinkUpgrade || product.hasFriesUpgrade;
                    const calText = product.calories[lang].split("(")[0].replace("~", "").trim();

                    return (
                      <article
                        key={product.id}
                        onClick={() => openProductModal(product)}
                        className="aio-product-card group"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            openProductModal(product);
                          }
                        }}
                      >
                        <div>
                          {/* Image Box (800x800 square framing) */}
                          <div className="aio-card-image-box">
                            <img
                              src={product.image}
                              alt={product.name[lang]}
                              loading="lazy"
                              className="aio-card-img"
                            />

                            {/* Top Badges */}
                            <div className="absolute top-1.5 left-1.5 right-1.5 flex items-center justify-between pointer-events-none">
                              {product.popular ? (
                                <span className="px-2 py-0.5 rounded-full bg-[#4A1525] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow-sm border border-white/20">
                                  ⭐ {t.popularBadge}
                                </span>
                              ) : (
                                <span />
                              )}

                              {calText && (
                                <span className="px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[9px] sm:text-[10px] font-semibold">
                                  🔥 {calText}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Card Body */}
                          <div className="aio-card-body">
                            <h3 className="aio-card-title">
                              {product.name[lang]}
                            </h3>

                            {product.includedBadge && (
                              <div className="aio-combo-pill">
                                <span>{product.includedBadge[lang]}</span>
                              </div>
                            )}

                            <p className="aio-card-desc">
                              {product.description[lang]}
                            </p>
                          </div>
                        </div>

                        {/* Card Footer: Price & Add Button */}
                        <div className="aio-card-footer">
                          <span className="aio-card-price">
                            ₺{displayPrice}
                          </span>

                          <div className="flex items-center gap-1">
                            {product.isSideItem ? (
                              <>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddToCart(product, null, null, [], "", 1);
                                  }}
                                  className="aio-btn-quick-add"
                                  title={lang === "tr" ? "Hızlı Ekle" : "Quick Add"}
                                >
                                  +
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openProductModal(product);
                                  }}
                                  className="aio-btn-add"
                                >
                                  <span>{lang === "tr" ? "Detay" : "Details"}</span>
                                </button>
                              </>
                            ) : (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openProductModal(product);
                                }}
                                className="aio-btn-add"
                              >
                                <span>{hasOptions ? (lang === "tr" ? "Seç +" : "Select +") : (lang === "tr" ? "Ekle +" : "Add +")}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </main>
      ) : (
        /* ================= DEDICATED CART PAGE (SEPET SAYFASI) ================= */
        <main className="flex-1 py-6 sm:py-10 pb-28">
          <div className="app-container space-y-6">
            {/* Cart Header Bar */}
            <div className="bg-white border border-[#E6E0D5] rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setActivePage("menu");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F8F2F4] active:bg-[#eedbe0] border-2 border-[#4A1525]/30 text-[#4A1525] text-xs sm:text-sm font-black cursor-pointer transition-all shadow-2xs mb-3"
                >
                  <span className="text-base font-black">←</span>
                  <span>{t.backToMenuAddMore}</span>
                </button>
                <h1 className="text-xl sm:text-2xl font-black font-heading text-[#1B1815]">
                  🛒 {t.cartPageTitle}
                </h1>
                <p className="text-xs sm:text-sm text-[#5C5349] mt-0.5">
                  {t.cartPageSubtitle}
                </p>
              </div>

              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="self-start sm:self-center px-3.5 py-2 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold cursor-pointer transition-colors"
                >
                  🗑️ {t.clearCart}
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              /* Empty Cart State */
              <div className="bg-white border border-[#E6E0D5] rounded-3xl p-10 sm:p-14 text-center max-w-lg mx-auto space-y-4 shadow-2xs">
                <div className="w-16 h-16 rounded-full bg-[#F8F2F4] text-[#4A1525] flex items-center justify-center text-3xl mx-auto">
                  🛍️
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold font-heading text-[#1B1815]">
                  {t.emptyCartTitle}
                </h2>
                <p className="text-xs sm:text-sm text-[#5C5349] leading-relaxed">
                  {t.emptyCartDesc}
                </p>
                <button
                  type="button"
                  onClick={() => setActivePage("menu")}
                  className="h-11 px-6 bg-[#4A1525] hover:bg-[#360F1B] text-white font-bold font-heading rounded-xl text-sm shadow-sm cursor-pointer transition-colors"
                >
                  {t.exploreMenuBtn}
                </button>
              </div>
            ) : (
              /* Cart Items + Customer Checkout Grid */
              <div className="aio-cart-grid">
                {/* LEFT COLUMN: Cart Items & Quick Upsell */}
                <div className="space-y-4">
                  <div className="bg-white border border-[#E6E0D5] rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-2xs">
                    <h2 className="text-base sm:text-lg font-extrabold font-heading text-[#1B1815] border-b border-stone-100 pb-2.5">
                      {t.orderItemsHeading} ({totalCartCount})
                    </h2>

                    <div className="space-y-3">
                      {cart.map((item) => {
                        const unitPrice = getCartItemUnitPrice(item);
                        const lineTotal = unitPrice * item.quantity;
                        return (
                          <div
                            key={item.cartKey}
                            className="p-3.5 sm:p-4 rounded-2xl border border-[#E6E0D5] bg-[#FAF8F5]/60 space-y-2.5"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-start gap-3">
                                <img
                                  src={item.product.image}
                                  alt={item.product.name[lang]}
                                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-[#E6E0D5] shrink-0"
                                />
                                <div>
                                  <h3 className="text-sm sm:text-base font-extrabold font-heading text-[#1B1815]">
                                    {item.product.name[lang]}
                                  </h3>
                                  <p className="text-xs font-bold text-[#4A1525] mt-0.5">
                                    ₺{unitPrice}{" "}
                                    <span className="text-stone-400 font-normal">
                                      / {lang === "tr" ? "birim" : "unit"}
                                    </span>
                                  </p>

                                  {/* Selected Options Pills */}
                                  <div className="flex flex-wrap gap-1.5 mt-2">
                                    {item.drinkUpgrade && (
                                      <span className="px-2 py-0.5 rounded-md bg-white border border-[#E6E0D5] text-[11px] font-semibold text-stone-700">
                                        🥤 {item.drinkUpgrade.name[lang]}
                                        {getPrice(item.drinkUpgrade) > 0
                                          ? ` (+₺${getPrice(item.drinkUpgrade)})`
                                          : ""}
                                      </span>
                                    )}
                                    {item.friesUpgrade && (
                                      <span className="px-2 py-0.5 rounded-md bg-white border border-[#E6E0D5] text-[11px] font-semibold text-stone-700">
                                        🍟 {item.friesUpgrade.name[lang]}
                                        {getPrice(item.friesUpgrade) > 0
                                          ? ` (+₺${getPrice(item.friesUpgrade)})`
                                          : ""}
                                      </span>
                                    )}
                                    {item.extras &&
                                      item.extras.map((ex) => (
                                        <span
                                          key={ex.id}
                                          className="px-2 py-0.5 rounded-md bg-[#F8F2F4] border border-[#4A1525]/20 text-[11px] font-bold text-[#4A1525]"
                                        >
                                          + {ex.name[lang]} (+₺{getPrice(ex)})
                                        </span>
                                      ))}
                                  </div>

                                  {item.note && (
                                    <p className="text-[11px] text-amber-900 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-lg mt-2">
                                      💬 {item.note}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeCartItem(item.cartKey)}
                                className="w-8 h-8 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                                title="Sil / Remove"
                              >
                                ✕
                              </button>
                            </div>

                            {/* Quantity & Line Subtotal */}
                            <div className="flex items-center justify-between pt-2 border-t border-stone-200/70">
                              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#E6E0D5]">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateCartQty(item.cartKey, item.quantity - 1)
                                  }
                                  className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-200 text-[#1B1815] font-bold flex items-center justify-center cursor-pointer"
                                >
                                  −
                                </button>
                                <span className="w-8 text-center text-sm font-extrabold font-mono">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateCartQty(item.cartKey, item.quantity + 1)
                                  }
                                  className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-200 text-[#1B1815] font-bold flex items-center justify-center cursor-pointer"
                                >
                                  +
                                </button>
                              </div>

                              <div className="text-base sm:text-lg font-black font-heading text-[#4A1525]">
                                ₺{lineTotal}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Dedicated "Add More Items from Menu" Button */}
                    <div className="pt-3 border-t border-stone-100">
                      <button
                        type="button"
                        onClick={() => {
                          setActivePage("menu");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="w-full py-3.5 px-4 rounded-2xl border-2 border-dashed border-[#4A1525]/30 hover:border-[#4A1525] bg-[#FAF8F5] hover:bg-[#F8F2F4] active:bg-[#eedbe0] text-[#4A1525] font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs active:scale-[0.99]"
                      >
                        <span className="text-base">🍽️</span>
                        <span>{t.addMoreFromMenu}</span>
                        <span className="text-base font-black">→</span>
                      </button>
                    </div>
                  </div>

                  {/* Quick Upsell Box in Cart (Extra Fries & Drinks) */}
                  <div className="bg-white border border-[#E6E0D5] rounded-2xl p-4 sm:p-5 space-y-3 shadow-2xs">
                    <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#4A1525] font-heading">
                      🍟 {t.upsellTitle}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {PRODUCTS.filter((p) => p.isSideItem)
                        .slice(0, 6)
                        .map((sideProd) => (
                          <div
                            key={sideProd.id}
                            className="p-2.5 rounded-xl border border-[#E6E0D5] flex items-center justify-between gap-2 bg-[#FAF8F5]/50"
                          >
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-[#1B1815] truncate">
                                {sideProd.name[lang]}
                              </div>
                              <div className="text-xs font-extrabold text-[#4A1525]">
                                +₺{getPrice(sideProd)}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                handleAddToCart(
                                  sideProd,
                                  null,
                                  null,
                                  [],
                                  "",
                                  1
                                )
                              }
                              className="px-3 py-1.5 bg-[#4A1525] hover:bg-[#360F1B] text-white rounded-lg text-xs font-bold shrink-0 cursor-pointer"
                            >
                              + {lang === "tr" ? "Ekle" : "Add"}
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: Customer Info & WhatsApp Order Confirmation */}
                <div className="space-y-4">
                  <form
                    id="order-checkout-form"
                    autoComplete="on"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendWhatsApp();
                    }}
                    className="bg-white border-2 border-[#4A1525]/20 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm"
                  >
                    <div className="border-b border-stone-100 pb-3">
                      <h2 className="text-base sm:text-lg font-black font-heading text-[#4A1525] flex items-center gap-2">
                        <span>📍</span>
                        <span>{t.customerFormTitle}</span>
                      </h2>
                      <p className="text-xs text-[#5C5349] mt-0.5">
                        {t.customerFormSubtitle}
                      </p>
                    </div>

                    {/* Full Name Input (Mobile Autofill Enabled) */}
                    <div className="space-y-1.5">
                      <label htmlFor="customer-name" className="block text-xs font-extrabold text-[#1B1815]">
                        {t.fullNameLabel}
                      </label>
                      <input
                        id="customer-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        inputMode="text"
                        value={customerName}
                        onChange={(e) => {
                          setCustomerName(e.target.value);
                          if (showValidationAlert) setShowValidationAlert(false);
                        }}
                        placeholder={t.fullNamePlaceholder}
                        className="w-full h-12 px-3.5 rounded-xl bg-[#FAF8F5] border border-[#E6E0D5] focus:bg-white focus:border-[#4A1525] text-base font-medium text-[#1B1815] focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    {/* Phone Input (Mobile Autofill Enabled) */}
                    <div className="space-y-1.5">
                      <label htmlFor="customer-phone" className="block text-xs font-extrabold text-[#1B1815]">
                        {t.phoneLabel}
                      </label>
                      <input
                        id="customer-phone"
                        name="tel"
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder={t.phonePlaceholder}
                        className="w-full h-12 px-3.5 rounded-xl bg-[#FAF8F5] border border-[#E6E0D5] focus:bg-white focus:border-[#4A1525] text-base font-medium text-[#1B1815] focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Address Textarea (Mobile Autofill Enabled) */}
                    <div className="space-y-1.5">
                      <label htmlFor="customer-address" className="block text-xs font-extrabold text-[#1B1815]">
                        {t.addressLabel}
                      </label>
                      <textarea
                        id="customer-address"
                        name="street-address"
                        autoComplete="street-address"
                        rows={3}
                        value={customerAddress}
                        onChange={(e) => {
                          setCustomerAddress(e.target.value);
                          if (showValidationAlert) setShowValidationAlert(false);
                        }}
                        placeholder={t.addressPlaceholder}
                        className="w-full p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E6E0D5] focus:bg-white focus:border-[#4A1525] text-base font-medium text-[#1B1815] focus:outline-none resize-none transition-colors"
                        required
                      />
                    </div>

                    {/* Optional Order Note */}
                    <div className="space-y-1.5">
                      <label htmlFor="customer-order-note" className="block text-xs font-extrabold text-[#1B1815]">
                        {t.orderNoteLabel}
                      </label>
                      <input
                        id="customer-order-note"
                        name="order-notes"
                        type="text"
                        autoComplete="off"
                        value={orderNote}
                        onChange={(e) => setOrderNote(e.target.value)}
                        placeholder={t.orderNotePlaceholder}
                        className="w-full h-12 px-3.5 rounded-xl bg-[#FAF8F5] border border-[#E6E0D5] focus:bg-white focus:border-[#4A1525] text-base font-medium text-[#1B1815] focus:outline-none transition-colors"
                      />
                    </div>

                    {(!isFormValid || showValidationAlert) && (
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold flex items-start gap-2">
                        <span>⚠️</span>
                        <span>{t.requiredWarning}</span>
                      </div>
                    )}

                    {/* Total Box */}
                    <div className="p-4 rounded-2xl bg-[#F8F2F4] border border-[#4A1525]/15 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-[#5C5349]">
                          {t.totalLabel}
                        </div>
                        <div className="text-[11px] text-[#4A1525] font-semibold">
                          {totalCartCount} {t.itemsCount}
                        </div>
                      </div>
                      <div className="text-2xl sm:text-3xl font-black font-heading text-[#4A1525]">
                        ₺{totalCartAmount}
                      </div>
                    </div>

                    {/* WhatsApp Confirm CTA */}
                    <button
                      type="submit"
                      className={`w-full h-14 px-5 rounded-2xl font-extrabold font-heading text-sm sm:text-base flex items-center justify-between transition-all cursor-pointer shadow-lg ${
                        isFormValid
                          ? "bg-[#059669] hover:bg-[#047857] text-white shadow-emerald-700/20"
                          : "bg-stone-300 text-stone-600 hover:bg-stone-400/80"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-lg">💬</span>
                        <span>{t.whatsappSendBtn}</span>
                      </span>
                      <span className="px-3 py-1 rounded-xl bg-black/15 text-white font-mono text-sm font-black">
                        ₺{totalCartAmount}
                      </span>
                    </button>

                    {/* Secondary Back to Menu Action right inside checkout */}
                    <button
                      type="button"
                      onClick={() => {
                        setActivePage("menu");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="w-full py-3 px-4 rounded-xl border border-[#4A1525]/20 hover:bg-stone-100 text-[#4A1525] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <span>←</span>
                      <span>{t.backToMenu}</span>
                    </button>

                    <p className="text-[11px] text-center text-[#5C5349]">
                      {t.whatsappPhoneInfo}
                    </p>

                    {/* Live WhatsApp Message Preview & Copy */}
                    <div className="pt-3 border-t border-stone-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                          {t.whatsappPreviewTitle}
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyOrderText}
                          className="text-xs font-bold text-[#4A1525] hover:underline cursor-pointer"
                        >
                          {copiedText ? t.copiedOrderBtn : t.copyOrderBtn}
                        </button>
                      </div>
                      <pre className="p-3 rounded-xl bg-stone-900 text-stone-100 text-[11px] font-mono whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                        {buildWhatsAppMessage()}
                      </pre>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </main>
      )}

      {/* ================= STICKY MOBILE BOTTOM BAR (WHEN ON MENU & CART > 0) ================= */}
      {activePage === "menu" && totalCartCount > 0 && (
        <aside className="aio-sticky-bottom-bar" aria-label="Sepet Çubuğu">
          <div className="app-container">
            <button
              type="button"
              id="sticky-cart-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActivePage("cart");
                window.scrollTo({ top: 0, behavior: "instant" });
              }}
              className="aio-bottom-cart-btn"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-9 h-9 min-w-[36px] rounded-xl bg-white text-[#4A1525] font-black text-sm flex items-center justify-center shadow-xs shrink-0">
                  {totalCartCount}
                </span>
                <div className="text-left min-w-0">
                  <div className="text-xs sm:text-sm font-extrabold font-heading text-white truncate">
                    {lang === "tr"
                      ? "Sepeti Görüntüle & Onayla"
                      : "View Cart & Confirm"}
                  </div>
                  <div className="text-[11px] text-rose-200 truncate">
                    {lang === "tr" ? "WhatsApp Sipariş Hattı" : "WhatsApp Order Line"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-sm sm:text-base font-black font-mono bg-white/15 px-3 py-1.5 rounded-xl text-white border border-white/20">
                  ₺{totalCartAmount}
                </span>
                <span className="text-lg text-white font-bold">→</span>
              </div>
            </button>
          </div>
        </aside>
      )}

      {/* ================= PRODUCT CUSTOMIZATION MODAL (ACCESSIBLE & USER-FRIENDLY) ================= */}
      {modalProduct && (
        <div
          className="aio-modal-overlay"
          onClick={closeProductModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="aio-modal-sheet"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Persistent Sticky Top Header: Stays fixed at the top of the modal sheet */}
            <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-3.5 sm:px-5 py-3 border-b border-stone-200 flex items-center justify-between shadow-2xs shrink-0">
              <button
                type="button"
                onClick={closeProductModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F8F2F4] active:bg-[#eedbe0] border border-[#4A1525]/20 text-[#4A1525] text-xs sm:text-sm font-black cursor-pointer transition-colors"
                aria-label={t.modalTopBack}
              >
                <span className="text-base font-black">←</span>
                <span>{t.modalTopBack}</span>
              </button>

              <div className="text-xs font-bold text-stone-600 uppercase tracking-wider truncate max-w-[140px] xs:max-w-[200px] sm:max-w-xs text-center font-heading">
                {modalProduct.name[lang]}
              </div>

              <button
                type="button"
                onClick={closeProductModal}
                className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-rose-100 text-stone-700 hover:text-rose-700 flex items-center justify-center text-sm font-black cursor-pointer transition-colors"
                aria-label="Kapat"
              >
                ✕
              </button>
            </div>

            {/* Modal Image Header */}
            <div className="relative h-44 sm:h-52 bg-[#2C0D16] shrink-0 overflow-hidden">
              <img
                src={modalProduct.image}
                alt={modalProduct.name[lang]}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Top Popular Pill if any */}
              {modalProduct.popular && (
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-[#4A1525] text-white text-xs font-black uppercase tracking-wider shadow-md border border-white/20">
                    ⭐ {t.popularBadge}
                  </span>
                </div>
              )}
            </div>

            {/* Modal Scrollable Options Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
              {/* Product Header & Info Area (High-contrast, very readable) */}
              <div className="space-y-2 border-b border-stone-200/80 pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2
                    id="modal-title"
                    className="text-xl sm:text-2xl font-black font-heading text-stone-950 tracking-tight leading-tight"
                  >
                    {modalProduct.name[lang]}
                  </h2>
                  <span className="text-xl sm:text-2xl font-black font-heading text-[#4A1525]">
                    ₺{getPrice(modalProduct)}
                  </span>
                </div>

                {/* Badges Bar: Included combo & Calories */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {modalProduct.includedBadge && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs sm:text-sm font-extrabold shadow-2xs">
                      <span>✓</span>
                      <span>{modalProduct.includedBadge[lang]}</span>
                    </span>
                  )}
                  {modalProduct.calories && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-stone-100 border border-stone-200 text-stone-700 text-xs sm:text-sm font-bold">
                      <span>🔥</span>
                      <span>{modalProduct.calories[lang]}</span>
                    </span>
                  )}
                </div>

                {/* Full Ingredients Description (Clear, legible typography) */}
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-medium bg-[#FAF8F5] p-3.5 sm:p-4 rounded-2xl border border-[#E6E0D5] mt-3">
                  {modalProduct.description[lang]}
                </p>
              </div>

              {/* 1. DRINK UPGRADE SECTION (For Burger, Makarna, Wrap Menus) */}
              {modalProduct.hasDrinkUpgrade && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-2">
                    <div>
                      <h3 className="text-sm sm:text-base font-extrabold font-heading text-stone-950 flex items-center gap-1.5">
                        <span className="text-lg">🥤</span>
                        <span>{t.modalDrinkTitle}</span>
                      </h3>
                      <p className="text-xs text-stone-600 font-medium mt-0.5">
                        {t.modalDrinkSub}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-[#F8F2F4] text-[#4A1525] text-xs font-black uppercase tracking-wider shrink-0">
                      {t.singleChoiceTag}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {DRINK_UPGRADES.map((dOpt) => {
                      const isSel = selectedDrink.id === dOpt.id;
                      const dPrice = getPrice(dOpt);
                      return (
                        <button
                          key={dOpt.id}
                          type="button"
                          onClick={() => setSelectedDrink(dOpt)}
                          className={`w-full min-h-[56px] p-3.5 sm:p-4 rounded-2xl border-2 text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                            isSel
                              ? "bg-[#F8F2F4] border-[#4A1525] shadow-xs"
                              : "bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/70"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {/* Accessible Radio Indicator */}
                            <span
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                isSel
                                  ? "border-[#4A1525] bg-[#4A1525] text-white shadow-2xs"
                                  : "border-stone-300 bg-white"
                              }`}
                            >
                              {isSel && (
                                <span className="w-2.5 h-2.5 rounded-full bg-white" />
                              )}
                            </span>

                            <div className="min-w-0">
                              <div
                                className={`text-sm sm:text-base font-extrabold leading-tight ${
                                  isSel ? "text-stone-950" : "text-stone-800"
                                }`}
                              >
                                {dOpt.name[lang]}
                              </div>
                              <div className="text-xs text-stone-500 font-medium mt-0.5 truncate">
                                {dOpt.desc[lang]}
                              </div>
                            </div>
                          </div>

                          <span
                            className={`text-sm font-black font-mono shrink-0 px-2.5 py-1 rounded-lg ${
                              dPrice > 0
                                ? "text-[#4A1525] bg-rose-100/60 font-bold"
                                : "text-emerald-800 bg-emerald-100/70 font-extrabold"
                            }`}
                          >
                            {dPrice > 0 ? `+₺${dPrice}` : (lang === "tr" ? "✓ Menüye Dahil" : "✓ Included")}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 2. FRIES UPGRADE SECTION (For Burger, Wrap, Çıtır Tavuk Menus) */}
              {modalProduct.hasFriesUpgrade && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-2">
                    <div>
                      <h3 className="text-sm sm:text-base font-extrabold font-heading text-stone-950 flex items-center gap-1.5">
                        <span className="text-lg">🍟</span>
                        <span>{t.modalFriesTitle}</span>
                      </h3>
                      <p className="text-xs text-stone-600 font-medium mt-0.5">
                        {t.modalFriesSub}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-[#F8F2F4] text-[#4A1525] text-xs font-black uppercase tracking-wider shrink-0">
                      {t.singleChoiceTag}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {FRIES_UPGRADES.map((fOpt) => {
                      const isSel = selectedFries.id === fOpt.id;
                      const fPrice = getPrice(fOpt);
                      return (
                        <button
                          key={fOpt.id}
                          type="button"
                          onClick={() => setSelectedFries(fOpt)}
                          className={`w-full min-h-[56px] p-3.5 sm:p-4 rounded-2xl border-2 text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                            isSel
                              ? "bg-[#F8F2F4] border-[#4A1525] shadow-xs"
                              : "bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/70"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {/* Accessible Radio Indicator */}
                            <span
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                isSel
                                  ? "border-[#4A1525] bg-[#4A1525] text-white shadow-2xs"
                                  : "border-stone-300 bg-white"
                              }`}
                            >
                              {isSel && (
                                <span className="w-2.5 h-2.5 rounded-full bg-white" />
                              )}
                            </span>

                            <div className="min-w-0">
                              <div
                                className={`text-sm sm:text-base font-extrabold leading-tight ${
                                  isSel ? "text-stone-950" : "text-stone-800"
                                }`}
                              >
                                {fOpt.name[lang]}
                              </div>
                              <div className="text-xs text-stone-500 font-medium mt-0.5 truncate">
                                {fOpt.desc[lang]}
                              </div>
                            </div>
                          </div>

                          <span
                            className={`text-sm font-black font-mono shrink-0 px-2.5 py-1 rounded-lg ${
                              fPrice > 0
                                ? "text-[#4A1525] bg-rose-100/60 font-bold"
                                : "text-emerald-800 bg-emerald-100/70 font-extrabold"
                            }`}
                          >
                            {fPrice > 0 ? `+₺${fPrice}` : (lang === "tr" ? "✓ Menüye Dahil" : "✓ Included")}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. EXTRA PORTIONS & DIPS (Optional side add-ons) */}
              {!modalProduct.isSideItem && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-2">
                    <div>
                      <h3 className="text-sm sm:text-base font-extrabold font-heading text-stone-950 flex items-center gap-1.5">
                        <span className="text-lg">➕</span>
                        <span>{t.modalExtrasTitle}</span>
                      </h3>
                      <p className="text-xs text-stone-600 font-medium mt-0.5">
                        {t.modalExtrasSub}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 text-xs font-bold uppercase tracking-wider shrink-0">
                      {t.multiChoiceTag}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {EXTRA_ADDONS.map((addon) => {
                      const isChecked = selectedExtras.some(
                        (x) => x.id === addon.id
                      );
                      const aPrice = getPrice(addon);
                      return (
                        <button
                          key={addon.id}
                          type="button"
                          onClick={() => toggleExtraAddon(addon)}
                          className={`w-full min-h-[54px] p-3 sm:p-3.5 rounded-2xl border-2 text-left flex items-center justify-between gap-2.5 transition-all cursor-pointer ${
                            isChecked
                              ? "bg-[#F8F2F4] border-[#4A1525] shadow-xs"
                              : "bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/70"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {/* Accessible Checkbox Box */}
                            <span
                              className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
                                isChecked
                                  ? "border-[#4A1525] bg-[#4A1525] text-white"
                                  : "border-stone-300 bg-white"
                              }`}
                            >
                              {isChecked ? "✓" : ""}
                            </span>
                            <span
                              className={`text-xs sm:text-sm font-bold leading-tight ${
                                isChecked ? "text-stone-950" : "text-stone-800"
                              }`}
                            >
                              {addon.name[lang]}
                            </span>
                          </div>
                          <span className="text-xs sm:text-sm font-black font-mono text-[#4A1525] shrink-0">
                            +₺{aPrice}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 4. SPECIAL ITEM NOTE */}
              <div className="space-y-2">
                <label className="block text-sm font-extrabold font-heading text-stone-950">
                  💬 {t.modalNoteTitle}
                </label>
                <textarea
                  rows={2}
                  value={itemNote}
                  onChange={(e) => setItemNote(e.target.value)}
                  placeholder={t.modalNotePlaceholder}
                  className="w-full p-3.5 rounded-2xl bg-[#FAF8F5] border-2 border-stone-200 focus:bg-white focus:border-[#4A1525] text-base sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none transition-all resize-none shadow-2xs"
                />
              </div>

              {/* Price Breakdown Box (High readability) */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border-2 border-stone-200/90 space-y-2 text-xs sm:text-sm shadow-2xs">
                <div className="flex justify-between text-stone-600 font-medium">
                  <span>{t.basePriceLabel}:</span>
                  <span className="font-mono font-bold text-stone-900">
                    ₺{getPrice(modalProduct)}
                  </span>
                </div>
                {modalProduct.hasDrinkUpgrade && getPrice(selectedDrink) > 0 && (
                  <div className="flex justify-between text-[#4A1525] font-semibold">
                    <span>+ {selectedDrink.name[lang]}:</span>
                    <span className="font-mono">+₺{getPrice(selectedDrink)}</span>
                  </div>
                )}
                {modalProduct.hasFriesUpgrade && getPrice(selectedFries) > 0 && (
                  <div className="flex justify-between text-[#4A1525] font-semibold">
                    <span>+ {selectedFries.name[lang]}:</span>
                    <span className="font-mono">+₺{getPrice(selectedFries)}</span>
                  </div>
                )}
                {selectedExtras.map((ex) => (
                  <div
                    key={ex.id}
                    className="flex justify-between text-[#4A1525] font-semibold"
                  >
                    <span>+ {ex.name[lang]}:</span>
                    <span className="font-mono">+₺{getPrice(ex)}</span>
                  </div>
                ))}
                <div className="border-t border-stone-200 pt-2 flex justify-between text-base font-extrabold text-stone-950">
                  <span>
                    {t.totalLabel} ({modalQty}x):
                  </span>
                  <span className="text-[#4A1525] font-mono text-lg font-black">
                    ₺{modalUnitPrice * modalQty}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Sticky Footer (Large Quantity Buttons + Big Accessible Add to Cart CTA + Cancel to Menu) */}
            <div className="p-3 sm:p-4 bg-white border-t border-stone-200 space-y-2.5 shrink-0 shadow-lg">
              <div className="flex items-center gap-2.5">
                {/* Quantity Selector with 44px+ touch targets */}
                <div className="flex items-center bg-stone-100 p-1 rounded-2xl border border-stone-200/90 shrink-0">
                  <button
                    type="button"
                    onClick={() => setModalQty((q) => Math.max(1, q - 1))}
                    className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-white text-stone-900 font-black text-lg flex items-center justify-center shadow-xs hover:bg-stone-50 active:scale-95 transition-all cursor-pointer"
                    aria-label="Adet Azalt"
                  >
                    −
                  </button>
                  <span className="w-9 text-center text-base font-black font-mono text-stone-900 select-none">
                    {modalQty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setModalQty((q) => q + 1)}
                    className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-white text-stone-900 font-black text-lg flex items-center justify-center shadow-xs hover:bg-stone-50 active:scale-95 transition-all cursor-pointer"
                    aria-label="Adet Artır"
                  >
                    +
                  </button>
                </div>

                {/* Big, High-Contrast Add to Cart Button */}
                <button
                  type="button"
                  onClick={() => {
                    handleAddToCart(
                      modalProduct,
                      selectedDrink,
                      selectedFries,
                      selectedExtras,
                      itemNote,
                      modalQty
                    );
                    closeProductModal();
                  }}
                  className="flex-1 h-13 sm:h-14 min-h-[52px] px-4 sm:px-6 bg-[#4A1525] hover:bg-[#360F1B] active:bg-[#2C0D16] active:scale-[0.99] text-white rounded-2xl font-black font-heading text-sm sm:text-base flex items-center justify-between shadow-lg shadow-[#4A1525]/20 cursor-pointer transition-all min-w-0"
                >
                  <span className="flex items-center gap-2 truncate">
                    <span className="text-lg">🛒</span>
                    <span className="truncate">{t.addToCartBtn}</span>
                  </span>
                  <span className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-white text-[#4A1525] font-mono font-black text-sm sm:text-base shadow-xs shrink-0 ml-2">
                    ₺{modalUnitPrice * modalQty}
                  </span>
                </button>
              </div>

              {/* Clear Secondary Action: Return to Menu Without Ordering */}
              <button
                type="button"
                onClick={closeProductModal}
                className="w-full py-2.5 rounded-xl text-xs sm:text-sm font-extrabold text-stone-600 hover:text-[#4A1525] hover:bg-[#F8F2F4] active:bg-[#eedbe0] transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5 border border-stone-200"
              >
                <span>←</span>
                <span>{t.cancelReturnToMenu}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= FOOTER (AIO COFFEE SIGNATURE BURGUNDY) ================= */}
      <footer className="bg-[#2C0D16] text-white border-t border-[#4A1525] mt-auto">
        <div className="app-container py-10 sm:py-12 space-y-8">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 pb-8 border-b border-[#4A1525]/70 text-center md:text-left">
            <div className="space-y-3 max-w-md">
              <div className="flex justify-center md:justify-start">
                <img
                  src="/images/logo.png"
                  alt="AIO — All in One"
                  className="h-12 w-auto object-contain brightness-0 invert"
                />
              </div>
              <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed">
                {t.footerAbout}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 text-xs sm:text-sm font-bold">
              <div className="flex items-center gap-2.5 bg-[#4A1525] px-4 py-3 rounded-2xl border border-white/15">
                <span>🕒</span>
                <span>{t.footerHours}</span>
              </div>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-[#059669] hover:bg-[#047857] text-white px-4 py-3 rounded-2xl border border-white/15 transition-colors"
              >
                <span>💬</span>
                <span>WhatsApp: 0549 711 32 24</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-rose-200/80">
            <p>{t.footerRights}</p>
            <p>{t.footerLocations}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
