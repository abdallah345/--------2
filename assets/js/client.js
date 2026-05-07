(function() {
// =========================================================================
    // 1. CONFIGURATION & CONSTANTS
    // =========================================================================

    // Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDyv5Sk7OgN6SyjO4ceDXa05CK__0uMmho",
        authDomain: "sagshawarmaapp.firebaseapp.com",
        projectId: "sagshawarmaapp",
        storageBucket: "sagshawarmaapp.firebasestorage.app",
        messagingSenderId: "686758956412",
        appId: "1:686758956412:web:a4294d95879fefc4a2a8f9",
        measurementId: "G-X4W33DMJ1Z"
    };

    // Translation data
    const translations = {
        ar: {
            welcomeTitle: "مرحباً بك في Sag & Shawarma!",
            selectBranchPrompt: "الرجاء اختيار الفرع الذي تود الطلب منه:",
            branchSelectPlaceholder: "-- اختر فرع --",
            confirmSelection: "تأكيد الاختيار",
            productsTitle: "قائمة المنتجات المتاحة",
            searchPlaceholder: "البحث باسم المنتج...",
            categoryAll: "كل الفئات",
            ordersViewTitle: "تتبع حالة طلباتك",
            orderNumber: "رقم الطلب",
            branch: "الفرع",
            total: "الإجمالي",
            status: "الحالة",
            cartSidebarTitle: "🛒 سلة الطلبات",
            totalPrice: "الإجمالي: {price} جنيه",
            checkoutButton: "إتمام الطلب",
            clearCartButton: "مسح السلة",
            ordersButton: "تتبع الطلبات",
            cartButton: "🛒 سلة الطلبات ({count})",
            checkoutTitle: "إنهاء الطلب والتوصيل",
            orderTypeHeader: "طريقة استلام الطلب",
            deliveryOptionLabel: "توصيل",
            pickupOptionLabel: "استلام من الفرع",
            customerNameLabel: "الاسم الكامل",
            customerPhoneLabel: "رقم الهاتف",
            customerAddressLabel: "العنوان التفصيلي",
            branchSelectLabel: "الفرع الأقرب",
            paymentMethodLabel: "طريقة الدفع",
            paymentCashOption: "نقداً عند الاستلام",
            totalDueTitle: "الإجمالي المطلوب دفعه:",
            cancelCheckoutButton: "تعديل السلة",
            confirmOrderButton: "تأكيد الطلب",
            optionsTitle: "الإضافات المتاحة (اختياري)",
            chooseSizeTitle: "اختر الحجم",
            commentsTitle: "ملاحظاتك للطلب",
            commentsPlaceholder: "اكتب أي ملاحظات أو تعليمات خاصة بالطلب...",
            addToCartButton: "أضف للسلة",
            appName: "Sag & Shawarma",
            aboutUsText: "نقدم لك أجود وألذ سندويتشات الشاورما المصنوعة بحب وعناية. خبرة تمتد لسنوات لضمان طعم لا يُنسى.",
            homeLink: "الرئيسية",
            productsLink: "المنتجات",
            privacyLink: "سياسة الخصوصية",
            termsLink: "الشروط والأحكام",
            contactUsTitle: "تواصل معنا",
            emailPrefix: "البريد الإلكتروني: ",
            phonePrefix: "هاتف:19395 ",
            addressPrefix: "العنوان الرئيسي:فرع الزمالك , شارع 26 يوليو",
            rightsReserved: "جميع الحقوق محفوظة.",
            quickLinksTitle: "روابط سريعة",
            currentYear: new Date().getFullYear().toString(),
            cartEmpty: "السلة فارغة",
            noOrdersFound: "لا توجد طلبات لهذا الرقم",
            enterPhonePrompt: "يرجى إدخال رقم هاتفك والبحث عن الطلبات",
            loadingOrders: "جاري تحميل الطلبات...",
            orderPrefix: "طلب #",
            branchLabel: "الفرع:",
            totalLabel: "الإجمالي:",
            statusLabel: "الحالة:",
            viewDetailsBtn: "عرض التفاصيل",
            orderNotFound: "الطلب غير موجود",
            notSpecified: "غير محدد",
            deliveryType: "توصيل",
            pickupType: "استلام من الفرع",
            cashOnDelivery: "نقداً عند الاستلام",
            productLabel: "المنتج:",
            quantityLabel: "الكمية:",
            priceLabel: "السعر:",
            sizeLabel: "الحجم:",
            additionsLabel: "الإضافات:",
            orderDetailsError: "خطأ في تحميل تفاصيل الطلب. يرجى المحاولة مرة أخرى."
        },
        en: {
            welcomeTitle: "Welcome to Sag & Shawarma!",
            selectBranchPrompt: "Please select the branch you want to order from:",
            branchSelectPlaceholder: "-- Select Branch --",
            confirmSelection: "Confirm Selection",
            productsTitle: "Available Products List",
            searchPlaceholder: "Search by product name...",
            categoryAll: "All Categories",
            ordersViewTitle: "Track Your Orders Status",
            orderNumber: "Order Number",
            branch: "Branch",
            total: "Total",
            status: "Status",
            cartSidebarTitle: "🛒 Shopping Cart",
            totalPrice: "Total: {price} EGP",
            checkoutButton: "Checkout",
            clearCartButton: "Clear Cart",
            ordersButton: "Track Orders",
            cartButton: "🛒 Shopping Cart ({count})",
            checkoutTitle: "Complete Order & Delivery",
            orderTypeHeader: "Order Pickup Method",
            deliveryOptionLabel: "Delivery",
            pickupOptionLabel: "Pickup from Branch",
            customerNameLabel: "Full Name",
            customerPhoneLabel: "Phone Number",
            customerAddressLabel: "Detailed Address",
            branchSelectLabel: "Nearest Branch",
            paymentMethodLabel: "Payment Method",
            paymentCashOption: "Cash on Delivery",
            totalDueTitle: "Total Amount Due:",
            cancelCheckoutButton: "Edit Cart",
            confirmOrderButton: "Confirm Order",
            optionsTitle: "Available Add-ons (Optional)",
            commentsTitle: "Order Notes",
            commentsPlaceholder: "Write any special notes or instructions for your order...",
            addToCartButton: "Add to Cart",
            appName: "Sag & Shawarma",
            aboutUsText: "We offer you the finest and most delicious Shawarma sandwiches made with love and care. Years of experience to ensure an unforgettable taste.",
            homeLink: "Home",
            productsLink: "Products",
            privacyLink: "Privacy Policy",
            termsLink: "Terms & Conditions",
            contactUsTitle: "Contact Us",
            emailPrefix: "Email: sagshawrma@gmail.com",
            phonePrefix: "Phone:19395 ",
            addressPrefix: "Main Address:El Zamalek, 26th July",
            rightsReserved: "All rights reserved.",
            quickLinksTitle: "Quick Links",
            currentYear: new Date().getFullYear().toString(),
            cartEmpty: "Cart is empty",
            enterPhonePrompt: "Please enter your phone number and search for orders",
            loadingOrders: "Loading orders...",
            noOrdersFound: "No orders found for this number",
            orderPrefix: "Order #",
            branchLabel: "Branch:",
            totalLabel: "Total:",
            statusLabel: "Status:",
            viewDetailsBtn: "View Details",
            orderNotFound: "Order not found",
            notSpecified: "Not specified",
            deliveryType: "Delivery",
            pickupType: "Pickup from Branch",
            cashOnDelivery: "Cash on Delivery",
            productLabel: "Product:",
            quantityLabel: "Quantity:",
            priceLabel: "Price:",
            sizeLabel: "Size:",
            additionsLabel: "Additions:",
            orderDetailsError: "Error loading order details. Please try again."
    }
};

    // =========================================================================
    // 2. GLOBAL STATE VARIABLES
    // =========================================================================

    // Firebase instance
    let db;

    // Application data
    let products = [];
    let branches = [];
    let categories = [];

    // User state
    let cart = safeJsonParse(localStorage.getItem('cart'), []);
    let currentBranch = localStorage.getItem('currentBranch');
    let currentLang = 'ar';
    localStorage.setItem('language', 'ar');
    let currentView = 'products';



    // Product selection state
    let currentProductId = null;
    let selectedSizeIndex = null;
    let selectedAdditions = [];



    // =========================================================================
    // 3. DOM ELEMENTS
    // =========================================================================

    const branchSelectorModal = document.getElementById('branchSelectorModal');
    const initialBranchSelect = document.getElementById('initialBranchSelect');
    const confirmBranchBtn = document.getElementById('confirmBranchBtn');
    const productsView = document.getElementById('productsView');
    const ordersView = document.getElementById('ordersView');
    const productsContainer = document.getElementById('productsContainer');
    const searchBar = document.getElementById('searchBar');
    const categoryFilter = document.getElementById('categoryFilter');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const toggleCartBtn = document.getElementById('toggleCartBtn');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const clearCartBtn = document.getElementById('clearCartBtn');
    const checkoutModal = document.getElementById('checkoutModal');
    const checkoutForm = document.getElementById('checkoutForm');
    const productDetailModal = document.getElementById('productDetailModal');
    const ordersButton = document.getElementById('ordersButton');
    const ordersListBody = document.getElementById('ordersListBody');
    const languageSelector = document.getElementById('languageSelector');

    // =========================================================================
    // 4. دوال مساعدة (Helper Functions)
    // =========================================================================

    function translate(key) {
        return translations[currentLang]?.[key] || key;
    }

    /**
     * Safely parse JSON string with enhanced error handling and validation
     * @param {string} jsonString - The JSON string to parse
     * @param {any} fallback - Fallback value if parsing fails (optional)
     * @param {Object} options - Additional options for parsing
     * @param {number} options.maxLength - Maximum string length to process (default: 1000000)
     * @param {boolean} options.strict - If true, only return parsed data or fallback, no partial extraction (default: false)
     * @param {boolean} options.logErrors - Whether to log parsing errors (default: true)
     * @returns {any} - Parsed JSON or fallback
     */
    function safeJsonParse(jsonString, fallback, options = {}) {
        // Input validation
        if (jsonString === null || jsonString === undefined) {
            if (options.logErrors !== false) {
                // console.warn('safeJsonParse: Input is null or undefined, returning fallback');
            }
            return fallback !== undefined ? fallback : [];
        }

        if (typeof jsonString !== 'string') {
            if (options.logErrors !== false) {
                // console.warn('safeJsonParse: Input is not a string, returning fallback', typeof jsonString);
            }
            return fallback !== undefined ? fallback : [];
        }

        // Size limit check for performance and security
        const maxLength = options.maxLength || 1000000; // 1MB default limit
        if (jsonString.length > maxLength) {
            if (options.logErrors !== false) {
                // console.warn(`safeJsonParse: Input string too large (${jsonString.length} chars), max allowed: ${maxLength}`);
            }
            return fallback !== undefined ? fallback : [];
        }

        // Basic security check - prevent potential ReDoS attacks
        if (jsonString.includes('\u0000') || jsonString.includes('\u2028') || jsonString.includes('\u2029')) {
            if (options.logErrors !== false) {
                // console.warn('safeJsonParse: Input contains potentially unsafe characters');
            }
            return fallback !== undefined ? fallback : [];
        }

        try {
            let cleaned = jsonString.trim();

            // Handle empty strings
            if (cleaned === '') {
                return fallback !== undefined ? fallback : [];
            }

            // First, try to parse the entire cleaned string
            try {
                const result = JSON.parse(cleaned);
                // Validate the result is a reasonable data structure
                if (result !== null && typeof result === 'object') {
                    return result;
                } else if (Array.isArray(result)) {
                    return result;
                } else {
                    throw new Error('Parsed result is not a valid object or array');
                }
            } catch (parseError) {
                if (options.logErrors !== false) {
                    console.debug('safeJsonParse: Initial JSON.parse failed:', parseError.message);
                }
                // If full parsing fails, try to extract partial valid JSON
            }

            // If strict mode is enabled, don't attempt partial extraction
            if (options.strict) {
                if (options.logErrors !== false) {
                    // console.warn('safeJsonParse: Strict mode enabled, not attempting partial extraction');
                }
                return fallback !== undefined ? fallback : [];
            }

            // Remove trailing commas before closing brackets/braces
            cleaned = cleaned.replace(/,(\s*[}\]])/g, '$1');

            // Try to parse again after removing trailing commas
            try {
                const result = JSON.parse(cleaned);
                if (result !== null && (typeof result === 'object' || Array.isArray(result))) {
                    return result;
                }
            } catch (commaError) {
                if (options.logErrors !== false) {
                    console.debug('safeJsonParse: JSON.parse after comma removal failed:', commaError.message);
                }
                // Still failing, try to extract partial content
            }

            // Determine expected type from input structure
            const startsWithBrace = cleaned.startsWith('{');
            const startsWithBracket = cleaned.startsWith('[');
            const defaultFallback = startsWithBrace ? {} : [];

            // Validate structure
            if (!startsWithBrace && !startsWithBracket) {
                if (options.logErrors !== false) {
                    // console.warn('safeJsonParse: Input does not start with valid JSON structure');
                }
                return fallback !== undefined ? fallback : defaultFallback;
            }

            // For arrays: try to extract complete objects
            if (!startsWithBrace && startsWithBracket) {
                const completeObjects = [];
                let i = 1; // Skip opening bracket
                let extractionAttempts = 0;
                const maxExtractionAttempts = 100; // Prevent infinite loops

                while (i < cleaned.length && extractionAttempts < maxExtractionAttempts) {
                    extractionAttempts++;

                    // Skip whitespace and commas
                    while (i < cleaned.length && (cleaned[i] === ',' || cleaned[i] === ' ' || cleaned[i] === '\n' || cleaned[i] === '\t')) {
                        i++;
                    }

                    if (i >= cleaned.length || cleaned[i] === ']') break;

                    // Look for object start
                    if (cleaned[i] === '{') {
                        let braceCount = 0;
                        let start = i;
                        let foundClosingBrace = false;

                        // Find the matching closing brace with depth limit
                        const maxDepth = 10;
                        let currentDepth = 0;

                        for (let j = i; j < cleaned.length && currentDepth <= maxDepth; j++) {
                            if (cleaned[j] === '{') {
                                braceCount++;
                                currentDepth = Math.max(currentDepth, braceCount);
                            } else if (cleaned[j] === '}') {
                                braceCount--;
                            }

                            if (braceCount === 0) {
                                // Try to parse this object
                                const objectStr = cleaned.substring(start, j + 1);
                                try {
                                    const parsedObj = JSON.parse(objectStr);
                                    // Validate parsed object
                                    if (parsedObj && typeof parsedObj === 'object' && !Array.isArray(parsedObj)) {
                                        completeObjects.push(parsedObj);
                                        i = j + 1;
                                        foundClosingBrace = true;
                                        break;
                                    }
                                } catch (objParseError) {
                                    if (options.logErrors !== false) {
                                        console.debug('safeJsonParse: Failed to parse extracted object:', objParseError.message);
                                    }
                                    // Object is incomplete, stop here
                                    break;
                                }
                            }
                        }

                        if (!foundClosingBrace || braceCount !== 0) {
                            // Unmatched braces, stop extraction
                            break;
                        }
                    } else {
                        // Not an object start, stop extraction
                        break;
                    }
                }

                if (completeObjects.length > 0) {
                    return completeObjects;
                }
            } else if (startsWithBrace) {
                // For objects: try to find the last complete object
                let braceCount = 0;
                let lastValidEnd = -1;
                let maxDepth = 0;

                for (let i = 0; i < cleaned.length; i++) {
                    if (cleaned[i] === '{') {
                        braceCount++;
                        maxDepth = Math.max(maxDepth, braceCount);
                    } else if (cleaned[i] === '}') {
                        braceCount--;
                        if (braceCount === 0) {
                            lastValidEnd = i;
                        }
                    }

                    // Prevent excessive nesting
                    if (maxDepth > 10) {
                        if (options.logErrors !== false) {
                            // console.warn('safeJsonParse: Object nesting too deep, aborting');
                        }
                        break;
                    }
                }

                if (lastValidEnd >= 0 && braceCount === 0) {
                    const validObjectStr = cleaned.substring(0, lastValidEnd + 1);
                    try {
                        const result = JSON.parse(validObjectStr);
                        if (result && typeof result === 'object' && !Array.isArray(result)) {
                            return result;
                        }
                    } catch (objError) {
                        if (options.logErrors !== false) {
                            console.debug('safeJsonParse: Failed to parse extracted object:', objError.message);
                        }
                    }
                }
            }

            // If we couldn't extract anything valid, return appropriate fallback
            const finalFallback = fallback !== undefined ? fallback : defaultFallback;
            if (options.logErrors !== false) {
                // console.warn('safeJsonParse: Could not parse or extract valid JSON, returning fallback');
            }
            return finalFallback;

        } catch (unexpectedError) {
            if (options.logErrors !== false) {
                console.error('safeJsonParse: Unexpected error during parsing:', unexpectedError);
            }
            return fallback !== undefined ? fallback : [];
        }
    }

    /**
     * Debounce function to limit the rate at which a function can fire
     * @param {Function} func - The function to debounce
     * @param {number} wait - The number of milliseconds to delay
     * @returns {Function} - The debounced function
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function updateTranslations() {
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translations[currentLang][key]) {
                el.textContent = translations[currentLang][key];
            }
        });

        document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
            const key = el.getAttribute('data-translate-placeholder');
            if (translations[currentLang][key]) {
                el.placeholder = translations[currentLang][key];
            }
        });

        document.querySelectorAll('[data-translate-prefix]').forEach(el => {
            const prefixKey = el.getAttribute('data-translate-prefix');
            const prefix = translations[currentLang][prefixKey] || '';
            const suffix = el.getAttribute('data-translate-suffix') || '';

            // Check if element has child elements (like spans)
            if (el.children.length > 0) {
                // For elements with children, replace text content while preserving HTML structure
                const translatedText = prefix.replace('{count}', cart.length) + suffix;
                // Replace the text before the first child element
                if (el.firstChild && el.firstChild.nodeType === Node.TEXT_NODE) {
                    el.firstChild.textContent = translatedText;
                } else {
                    // If no text node, insert one before the first child
                    el.insertBefore(document.createTextNode(translatedText), el.firstChild);
                }
            } else {
                // For elements without children, set textContent directly
                el.textContent = prefix.replace('{count}', cart.length) + suffix;
            }
        });
    }

    /**
     * Shows a modal by removing the 'hidden' class and preventing body scroll
     * @param {HTMLElement} modal - The modal element to show
     */
    function showModal(modal) {
        if (!modal) return;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Hides a modal by adding the 'hidden' class and restoring body scroll
     * @param {HTMLElement} modal - The modal element to hide
     */
    function hideModal(modal) {
        if (!modal) return;
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    /**
     * Shows a specific view (products or orders) and hides others
     * @param {string} view - The view to show ('products' or 'orders')
     */
    function showView(view) {
        [productsView, ordersView].forEach(v => v.classList.add('hidden'));
        if (view === 'products') {
            productsView.classList.remove('hidden');
        } else if (view === 'orders') {
            ordersView.classList.remove('hidden');
        }
        currentView = view;
    }

    // =========================================================================
    // 4. دوال البيانات (Data Functions)
    // =========================================================================

    async function getCollection(collectionName) {
        try {
            const snapshot = await db.collection(collectionName).get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error(`Error fetching ${collectionName}:`, error);
            return [];
        }
    }

    /**
     * Loads application data from Firebase collections with loading state
     * @returns {Promise<void>}
     */
    async function loadData() {
        const loadingElement = document.getElementById('loadingIndicator');
        if (loadingElement) {
            loadingElement.style.display = 'block';
        }

        try {
            const [allProducts, branchesData, categoriesData] = await Promise.all([
                getCollection('products'),
                getCollection('branches'),
                getCollection('categories')
            ]);

            branches = branchesData;
            categories = categoriesData;

            // Filter products by current branch availability AFTER loading (FIX: per-category grouping)
            products = allProducts.filter(p => {
                const branches = safeJsonParse(p.branches || '[]', []);
                return !branches.length || branches.includes(currentBranch);
            });
            console.log(`Filtered ${products.length}/${allProducts.length} products available in branch ${currentBranch || 'any'}`);

            console.log(`Loaded ${products.length} products available in branch ${currentBranch || 'any'}`);

            // Validate that we have essential data (silently for cleaner console)
            if (!products || products.length === 0) {
                console.warn('No products available in selected branch');
            }
            if (!branches || branches.length === 0) {
                console.warn('No branches loaded from database');
            }
            if (!categories || categories.length === 0) {
                console.warn('No categories loaded from database');
            }

            // Parse options to sizes and additions for each product
            products.forEach(p => {
                p.sizes = safeJsonParse(p.options, [], {logErrors: false});
                // Handle additions - could be JSON string or already an array
                if (typeof p.additions === 'string') {
                    p.additions = safeJsonParse(p.additions, [], {logErrors: false});
                } else if (!Array.isArray(p.additions)) {
                    p.additions = [];
                }
            });
        } catch (error) {
            console.error('Error loading data:', error);
            throw new Error('Failed to load application data. Please check your internet connection.');
        } finally {
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
        }
    }

    // =========================================================================
    // 5. دوال العرض (Rendering Functions)
    // =========================================================================

    function renderProducts() {
        const searchTerm = searchBar.value.toLowerCase();
        const selectedCategoryId = categoryFilter.value;

// NO redundant branch filter here - already filtered in loadData()
        let filteredProducts = products.filter(p => {
            const productName = currentLang === 'en' ? (p.name_en || p.name) : (p.name_ar || p.name);
            const productDesc = currentLang === 'en' ? (p.description_en || p.description) : (p.description_ar || p.description);
            const matchesSearch = !searchTerm ||
                productName.toLowerCase().includes(searchTerm) ||
                (productDesc && productDesc.toLowerCase().includes(searchTerm));
            return matchesSearch;
        });

        // If a specific category is selected, only show products from that category
        if (selectedCategoryId !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.category === selectedCategoryId);
        }

        if (filteredProducts.length === 0) {
            const noProductsMsg = currentLang === 'en' ? 'No products available at the moment.' : 'لا توجد منتجات متاحة حالياً.';
            productsContainer.innerHTML = `<p style="text-align: center; padding: 40px; color: #666;">${noProductsMsg}</p>`;
            return;
        }

        // Group products by category for display
        const productsByCategory = {};
        filteredProducts.forEach(product => {
            const categoryId = product.category || 'uncategorized';
            if (!productsByCategory[categoryId]) {
                productsByCategory[categoryId] = [];
            }
            productsByCategory[categoryId].push(product);
        });

        // Define desired category order (in Arabic for sorting)
const desiredOrder = ['الشاورما', 'بوكس الشاورما', 'البرسيون', 'المشويات', 'البروستيد', 'الوجبات', 'برجر', 'سندوتش مشويات', 'البيتزا', 'مناقيش', 'سندوتشات غربي', 'المقبلات', 'مشروبات', 'الحلو'];

        // Sort category IDs based on desired order
        const sortedCategoryIds = Object.keys(productsByCategory).sort((a, b) => {
            const catA = categories.find(c => c.id === a);
            const catB = categories.find(c => c.id === b);
            const nameA = catA ? catA.name_ar : '';
            const nameB = catB ? catB.name_ar : '';
            const indexA = desiredOrder.indexOf(nameA);
            const indexB = desiredOrder.indexOf(nameB);
            return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
        });

        // Generate HTML for each category section
        let html = '';
        sortedCategoryIds.forEach(categoryId => {
            const categoryProducts = productsByCategory[categoryId];
            const category = categories.find(c => c.id === categoryId);
            const categoryName = category ? (currentLang === 'en' ? (category.name_en || category.name_ar) : category.name_ar) : (currentLang === 'en' ? 'Uncategorized' : 'غير مصنف');

            // Sort products within category (optional: by name or price)
            categoryProducts.sort((a, b) => {
                const nameA = (currentLang === 'en' ? (a.name_en || a.name) : (a.name_ar || a.name)) || '';
                const nameB = (currentLang === 'en' ? (b.name_en || b.name) : (b.name_ar || b.name)) || '';
                return nameA.localeCompare(nameB);
            });

            html += `
                <div class="category-section">
                    <h2 class="category-title">${categoryName}</h2>
                    <div class="products-grid">
                        ${categoryProducts.map(product => {
                            const defaultPrice = product.price;
                            const productName = currentLang === 'en' ? (product.name_en || product.name) : (product.name_ar || product.name);
                            const productDesc = currentLang === 'en' ? (product.description_en || product.description) : (product.description_ar || product.description);
                            const addToCartText = product.sizes && product.sizes.length > 0 ?
                                (currentLang === 'en' ? 'Choose Options' : 'اختر الخيارات') :
                                (currentLang === 'en' ? 'Add to Cart' : 'أضف للسلة');

                            return `
                            <div class="product-card" data-product-id="${product.id}" onclick="showProductDetailFromElement(this)">
                                <div class="product-image-container">
                                    <img src="${product.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjQ5NDIyIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+U2FnPC90ZXh0Pgo8L3N2Zz4='}" alt="${productName}" loading="lazy">
                                </div>
                                <div class="product-info">
                                    <h3>${productName}</h3>
                                    <p class="product-description">${productDesc || (currentLang === 'en' ? 'Product description not available' : 'وصف المنتج غير متوفر')}</p>
                                    <div class="product-price-action">
                                        <span class="product-price">${parseFloat(defaultPrice).toFixed(2)} ${currentLang === 'en' ? 'EGP' : 'ج.م'}</span>
                                        <button class="add-to-cart-btn primary-btn" data-product-id="${product.id}" onclick="event.stopPropagation(); ${product.sizes && product.sizes.length > 0 ? `showProductDetailFromElement(this)` : `addToCartFromElement(this)`}">
                                            ${addToCartText}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        });

        productsContainer.innerHTML = html;
    }

    function renderCart() {
        const sizeLabel = currentLang === 'en' ? 'Size: ' : 'الحجم: ';
        const additionsLabel = currentLang === 'en' ? 'Additions: ' : 'الإضافات: ';
        const currency = currentLang === 'en' ? 'EGP' : 'ج.م';

        if (cart.length === 0) {
            cartItemsList.innerHTML = '<li class="empty-message-list">' + translate('cartEmpty') + '</li>';
        } else {
            cartItemsList.innerHTML = cart.map((item, index) => {
                const product = products.find(p => p.id === item.id);

                let itemName = 'Unknown Product';
                let additionNames = [];

                if (product) {
                    // Calculate item name from product data for current language
                    itemName = currentLang === 'en' ? (product.name_en || product.name) : (product.name_ar || product.name);

                    // Generate size name if applicable
                    if (item.sizeIndex !== null && product.sizes && product.sizes[item.sizeIndex]) {
                        const size = product.sizes[item.sizeIndex];
                        const sizeName = currentLang === 'en' ? (size.name_en || size.name) : (size.name_ar || size.name);
                        itemName += ` (${sizeName})`;
                    }

                    // Generate addition names if applicable
                    if (item.additionIndices && item.additionIndices.length > 0 && product.additions) {
                        additionNames = item.additionIndices.map(index => {
                            if (product.additions[index]) {
                                const addition = product.additions[index];
                                return currentLang === 'en' ? (addition.name_en || addition.name) : (addition.name_ar || addition.name);
                            }
                            return '';
                        }).filter(name => name);
                    }

                    // Update the stored name and additionNames in the cart item
                    item.name = itemName;
                    item.additionNames = additionNames;
                }

                return `
                    <li class="cart-item" data-index="${index}">
                        <img src="${item.image || 'assets/images/logo.png'}" alt="${itemName}">
                        <div class="item-details">
                            <h4>${itemName}</h4>
                            <p>${item.quantity} × ${parseFloat(item.price).toFixed(2)} ${currency}</p>
                            ${additionNames.length > 0 ? `<small>${additionsLabel}${additionNames.join(', ')}</small>` : ''}
                        </div>
                        <div class="quantity-controls">
                            <button class="quantity-btn decrease-btn" onclick="updateCartItem(${index}, -1)">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn increase-btn" onclick="updateCartItem(${index}, 1)">+</button>
                            <button class="remove-item-btn" onclick="removeCartItem(${index})">×</button>
                        </div>
                    </li>
                `;
            }).join('');
        }

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = translate('totalPrice').replace('{price}', total.toFixed(2));
        cartCount.textContent = cart.length;

        updateCartButton();
    }

    function updateCartButton() {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        toggleCartBtn.innerHTML = translate('cartButton').replace('({count})', `(${cart.length})`);
    }

    async function renderOrders(phoneNumber = null) {
        const ordersContainer = document.getElementById('ordersContainer');

        if (!phoneNumber) {
            // Show phone input prompt
            ordersContainer.innerHTML = '<div class="no-orders-message">' + translate('enterPhonePrompt') + '</div>';
            return;
        }

        try {
            // Check if Firebase is initialized
            if (!db) {
                console.error('Firebase db is not initialized');
                throw new Error('Firebase not initialized');
            }

            // Show loading message
            ordersContainer.innerHTML = '<div class="loading-message">' + translate('loadingOrders') + '</div>';

            // Get all orders and filter client-side
            const allOrdersSnapshot = await db.collection('orders').get();

            const allOrders = allOrdersSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Filter by phone number and sort by date
            const orders = allOrders
                .filter(order => order.customerPhone === phoneNumber)
                .sort((a, b) => {
                    const dateA = a.date?.seconds || 0;
                    const dateB = b.date?.seconds || 0;
                    return dateB - dateA; // Descending order
                });

            if (orders.length === 0) {
                ordersContainer.innerHTML = '<div class="no-orders-message">لا توجد طلبات لهذا الرقم</div>';
                return;
            }

            // Render orders as cards
            ordersContainer.innerHTML = orders.map(order => {
                const branch = branches.find(b => b.id === order.branchId);
                const branchName = branch ? branch.name : 'غير محدد';
                const currency = currentLang === 'en' ? 'EGP' : 'ج.م';
                const statusText = getOrderStatusText(order.status);
                const statusClass = `status-${order.status.toLowerCase()}`;
                const orderDate = order.date ? new Date(order.date.seconds * 1000).toLocaleDateString('ar-EG') : 'غير محدد';

                return `
                    <div class="order-card">
                        <div class="order-header">
                            <div class="order-id">طلب #${order.id.slice(-8)}</div>
                            <div class="order-date">${orderDate}</div>
                        </div>
                        <div class="order-body">
                            <div class="order-info">
                                <div class="info-item">
                                    <span class="info-label">الفرع:</span>
                                    <span class="info-value">${branchName}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">الإجمالي:</span>
                                    <span class="info-value total-amount">${parseFloat(order.total).toFixed(2)} ${currency}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">الحالة:</span>
                                    <span class="info-value status-badge ${statusClass}">${statusText}</span>
                                </div>
                            </div>
                        </div>
                        <div class="order-footer">
                            <button class="btn secondary-btn view-details-btn" onclick="viewOrderDetails('${order.id}')">
                                عرض التفاصيل
                            </button>
                        </div>
                    </div>
                `;
            }).join('');

        } catch (error) {
            console.error('Error fetching orders:', error);
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);
            console.error('Full error object:', error);

            // Provide more specific error messages
            let errorMessage = 'حدث خطأ في تحميل الطلبات. يرجى المحاولة مرة أخرى لاحقاً.';

            if (error.code === 'permission-denied') {
                errorMessage = 'خطأ في صلاحيات الوصول. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى.';
            } else if (error.code === 'unavailable') {
                errorMessage = 'خدمة قاعدة البيانات غير متاحة حالياً. يرجى المحاولة لاحقاً.';
            } else if (error.code === 'not-found') {
                errorMessage = 'لم يتم العثور على مجموعة الطلبات. قد تكون المجموعة فارغة أو غير موجودة.';
            } else if (error.code === 'failed-precondition') {
                errorMessage = 'خطأ في إعدادات قاعدة البيانات. يرجى المحاولة لاحقاً.';
            } else if (error.code === 'resource-exhausted') {
                errorMessage = 'تم تجاوز حد الاستخدام. يرجى المحاولة لاحقاً.';
            } else if (error.message && error.message.includes('Firebase not initialized')) {
                errorMessage = 'خطأ في الاتصال بقاعدة البيانات. يرجى إعادة تحميل الصفحة.';
            } else if (error.message && error.message.includes('network')) {
                errorMessage = 'خطأ في الشبكة. يرجى التحقق من اتصال الإنترنت.';
            }

            ordersContainer.innerHTML = `<div class="error-message">${errorMessage}</div>`;
        }
    }

    function getOrderStatusText(status) {
        const statusTranslations = {
            'Pending': currentLang === 'en' ? 'Pending' : 'في الانتظار',
            'Preparing': currentLang === 'en' ? 'Preparing' : 'قيد التحضير',
            'Ready': currentLang === 'en' ? 'Ready' : 'جاهز',
            'Delivered': currentLang === 'en' ? 'Delivered' : 'تم التوصيل',
            'Cancelled': currentLang === 'en' ? 'Cancelled' : 'ملغي'
        };
        return statusTranslations[status] || status;
    }

    async function viewOrderDetails(orderId) {
        try {
            console.log('Fetching order details for:', orderId);

            // Get the order document
            const orderDoc = await db.collection('orders').doc(orderId).get();

            if (!orderDoc.exists) {
                alert('الطلب غير موجود');
                return;
            }

            const order = { id: orderDoc.id, ...orderDoc.data() };
            console.log('Order data:', order);

            // Populate order details modal
            document.getElementById('orderDetailId').textContent = order.id.slice(-8);
            document.getElementById('orderDetailDate').textContent = order.date ? new Date(order.date.seconds * 1000).toLocaleDateString('ar-EG') : 'غير محدد';
            document.getElementById('orderDetailStatus').textContent = getOrderStatusText(order.status);
            document.getElementById('orderDetailStatus').className = `status-badge status-${order.status.toLowerCase()}`;

            // Branch info
            const branch = branches.find(b => b.id === order.branchId);
            document.getElementById('orderDetailBranch').textContent = branch ? branch.name : 'غير محدد';

            // Customer info
            document.getElementById('orderDetailCustomerName').textContent = order.customerName || 'غير محدد';
            document.getElementById('orderDetailCustomerPhone').textContent = order.customerPhone || 'غير محدد';
            document.getElementById('orderDetailOrderType').textContent = order.orderType === 'Delivery' ? 'توصيل' : 'استلام من الفرع';

            // Address - only show for delivery orders
            const addressItem = document.getElementById('addressItem');
            if (order.orderType === 'Delivery' && order.customerAddress) {
                document.getElementById('orderDetailCustomerAddress').textContent = order.customerAddress;
                addressItem.style.display = 'block';
            } else {
                addressItem.style.display = 'none';
            }

            document.getElementById('orderDetailPaymentMethod').textContent = order.paymentMethod === 'Cash' ? 'نقداً عند الاستلام' : order.paymentMethod;

            // Order items
            const orderItemsList = document.getElementById('orderItemsList');
            orderItemsList.innerHTML = '';

            if (order.items && Array.isArray(order.items)) {
                order.items.forEach(item => {
                    // Product name
                    const nameItem = document.createElement('div');
                    nameItem.className = 'info-item';
                    nameItem.innerHTML = `<span class="info-label">المنتج:</span><span class="info-value">${item.name}</span>`;
                    orderItemsList.appendChild(nameItem);

                    // Quantity
                    const quantityItem = document.createElement('div');
                    quantityItem.className = 'info-item';
                    quantityItem.innerHTML = `<span class="info-label">الكمية:</span><span class="info-value">${item.quantity}</span>`;
                    orderItemsList.appendChild(quantityItem);

                    // Price
                    const priceItem = document.createElement('div');
                    priceItem.className = 'info-item';
                    priceItem.innerHTML = `<span class="info-label">السعر:</span><span class="info-value">${parseFloat(item.price).toFixed(2)} ج.م</span>`;
                    orderItemsList.appendChild(priceItem);

                    // Size if available
                    if (item.size) {
                        const sizeItem = document.createElement('div');
                        sizeItem.className = 'info-item';
                        sizeItem.innerHTML = `<span class="info-label">الحجم:</span><span class="info-value">${item.size}</span>`;
                        orderItemsList.appendChild(sizeItem);
                    }

                    // Additions if available
                    if (item.additions && item.additions.length > 0) {
                        const additionsItem = document.createElement('div');
                        additionsItem.className = 'info-item';
                        additionsItem.innerHTML = `<span class="info-label">الإضافات:</span><span class="info-value">${item.additions.join(', ')}</span>`;
                        orderItemsList.appendChild(additionsItem);
                    }
                });
            }

            // Total
            document.getElementById('orderDetailTotal').textContent = `${parseFloat(order.total).toFixed(2)} ج.م`;

            // Show modal
            showModal(document.getElementById('orderDetailsModal'));

        } catch (error) {
            console.error('Error fetching order details:', error);
            alert('حدث خطأ في تحميل تفاصيل الطلب. يرجى المحاولة مرة أخرى.');
        }
    }

    function populateBranchSelect() {
        const selects = [initialBranchSelect, document.getElementById('orderBranch')];
        selects.forEach(select => {
            if (!select) return;
            select.innerHTML = '<option value="" disabled selected>' + translate('branchSelectPlaceholder') + '</option>';
            branches.forEach(branch => {
                select.innerHTML += `<option value="${branch.id}">${branch.name}</option>`;
            });
        });
    }

    function populateCategoryFilter() {
        console.log('populateCategoryFilter called, currentLang:', currentLang);
        console.log('All categories loaded:', categories);
        categoryFilter.innerHTML = '<option value="all">' + translate('categoryAll') + '</option>';
        categories.forEach(category => {
            console.log('Category:', category.id, 'name_ar:', category.name_ar, 'name_en:', category.name_en);
            const categoryName = currentLang === 'en' ? (category.name_en || category.name_ar) : category.name_ar;
            console.log('Selected categoryName:', categoryName);
            categoryFilter.innerHTML += `<option value="${category.id}">${categoryName}</option>`;
        });
    }

    // =========================================================================
    // 6. دوال السلة والطلب (Cart & Order Functions)
    // =========================================================================

    function addToCart(productId, quantity = 1, options = [], comments = '') {
        if (products.length === 0) {
            showSuccessNotification(currentLang === 'en' ? 'Loading products, please wait...' : 'جاري تحميل المنتجات، يرجى الانتظار...');
            return;
        }
        const product = products.find(p => p.id === productId);
        if (!product) {
            showSuccessNotification(currentLang === 'en' ? 'Product not found' : 'المنتج غير موجود');
            return;
        }

        let selectedPrice = parseFloat(product.price);

        // Handle size selection
        if (selectedSizeIndex !== null && product.sizes && Array.isArray(product.sizes) && product.sizes[selectedSizeIndex]) {
            selectedPrice = parseFloat(product.sizes[selectedSizeIndex].price);
        }

        // Handle additions
        selectedAdditions.forEach(additionIndex => {
            if (product.additions && product.additions[additionIndex]) {
                selectedPrice += parseFloat(product.additions[additionIndex].price);
            }
        });

        // Calculate full item name
        let fullItemName = currentLang === 'en' ? (product.name_en || product.name) : (product.name_ar || product.name);
        if (selectedSizeIndex !== null && product.sizes && product.sizes[selectedSizeIndex]) {
            const size = product.sizes[selectedSizeIndex];
            const sizeName = currentLang === 'en' ? (size.name_en || size.name) : (size.name_ar || size.name);
            fullItemName += ` (${sizeName})`;
        }

        // Calculate addition names
        let additionNames = [];
        if (selectedAdditions.length > 0 && product.additions) {
            additionNames = selectedAdditions.map(index => {
                if (product.additions[index]) {
                    const addition = product.additions[index];
                    return currentLang === 'en' ? (addition.name_en || addition.name) : (addition.name_ar || addition.name);
                }
                return '';
            }).filter(name => name);
        }

        const existingItem = cart.find(item => item.id === productId &&
            item.sizeIndex === selectedSizeIndex &&
            JSON.stringify(item.additionIndices || []) === JSON.stringify(selectedAdditions) &&
            JSON.stringify(item.options) === JSON.stringify(options) &&
            item.comments === comments);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                price: selectedPrice,
                quantity: quantity,
                sizeIndex: selectedSizeIndex,
                additionIndices: [...selectedAdditions],
                options: options,
                comments: comments,
                image: product.image,
                name: fullItemName,
                additionNames: additionNames
            });
        }

        saveCart();
        renderCart();
        cartSidebar.classList.remove('hidden');
        showSuccessNotification(currentLang === 'en' ? 'Product added to cart' : 'تم إضافة المنتج للسلة');
    }

    function updateCartItem(index, change) {
        const newQuantity = cart[index].quantity + change;
        if (newQuantity <= 0) {
            removeCartItem(index);
            return;
        }
        cart[index].quantity = newQuantity;
        saveCart();
        renderCart();
    }

    function removeCartItem(index) {
        cart.splice(index, 1);
        saveCart();
        renderCart();
    }

    function clearCart() {
        cart = [];
        saveCart();
        renderCart();
        hideModal(cartSidebar);
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    /**
     * Submits the order to Firebase with loading state
     * @param {Object} orderData - The order data from the form
     * @returns {Promise<void>}
     */
    async function submitOrder(orderData) {
        const submitBtn = document.getElementById('confirmOrderBtn');
        const originalText = submitBtn ? submitBtn.textContent : '';

        // Show loading state
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = currentLang === 'en' ? 'Submitting...' : 'جاري الإرسال...';
        }

        try {
            const order = {
                ...orderData,
                items: cart,
                total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
                status: 'Pending',
                date: new Date(),
                branchId: currentBranch
            };

            await db.collection('orders').add(order);
            clearCart();
            hideModal(checkoutModal);
            showSuccessNotification('تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً.');
            showView('orders');
        } catch (error) {
            console.error('Error submitting order:', error);
            alert('فشل في إرسال الطلب. يرجى المحاولة مرة أخرى.');
        } finally {
            // Reset loading state
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        }
    }

    // =========================================================================
    // 7. دوال المنتجات التفصيلية (Product Detail Functions)
    // =========================================================================

    function showProductDetail(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        currentProductId = productId;
        selectedSizeIndex = null;
        selectedAdditions = [];

        // Select first size by default if available
        if (product.sizes && Array.isArray(product.sizes) && product.sizes.length > 0) {
            selectedSizeIndex = 0;
        }

        document.getElementById('detailProductImage').src = product.image || 'assets/images/logo.png';
        const productName = currentLang === 'en' ? (product.name_en || product.name) : (product.name_ar || product.name);
        const productDesc = currentLang === 'en' ? (product.description_en || product.description) : (product.description_ar || product.description);
        document.getElementById('detailProductName').textContent = productName;
        document.getElementById('detailProductDescription').textContent = productDesc || (currentLang === 'en' ? 'Product description not available' : 'وصف المنتج غير متوفر');
        document.getElementById('detailProductPrice').textContent = `${parseFloat(product.price).toFixed(2)} ${currentLang === 'en' ? 'EGP' : 'ج.م'}`;

        // Handle size selection and additions
        const productOptionsContainer = document.getElementById('productOptionsContainer');
        let optionsHtml = '';

        // Size selection
        if (product.sizes && Array.isArray(product.sizes) && product.sizes.length > 0) {
            const sizeRadios = product.sizes.map((size, index) => `
                <label class="size-item">
                    <input type="radio" name="productSize" data-size-index="${index}" data-price="${size.price}" onchange="selectSize(this)" ${index === 0 ? 'checked' : ''}>
                    <span>${currentLang === 'en' ? (size.name_en || size.name) : (size.name_ar || size.name)} - ${size.price} ${currentLang === 'en' ? 'EGP' : 'ج.م'}</span>
                </label>
            `).join('');

            optionsHtml += `
                <h4>${translate('chooseSizeTitle')}</h4>
                <div class="sizes-list">
                    ${sizeRadios}
                </div>
            `;
        }

        // Additions selection - always show the section
        const additionCheckboxes = product.additions && Array.isArray(product.additions) && product.additions.length > 0
            ? product.additions.map((addition, index) => `
                <label class="addition-item">
                    <input type="checkbox" data-addition-index="${index}" data-price="${addition.price}" onchange="toggleAddition(this)">
                    <span>${currentLang === 'en' ? (addition.name_en || addition.name) : (addition.name_ar || addition.name)} - ${addition.price} ${currentLang === 'en' ? 'EGP' : 'ج.م'}</span>
                </label>
            `).join('')
            : `<p style="color: #666; font-style: italic;">${currentLang === 'en' ? 'No add-ons available for this product' : 'لا توجد إضافات متاحة لهذا المنتج'}</p>`;

        const additionsTitle = currentLang === 'en' ? 'Available Add-ons (Optional)' : 'الإضافات المتاحة (اختياري)';
        optionsHtml += `
            <h4>${additionsTitle}</h4>
            <div class="additions-list">
                ${additionCheckboxes}
            </div>
        `;

        productOptionsContainer.innerHTML = optionsHtml;

        // Update price display after setting selections
        updateProductPriceDisplay();

        // Reset quantity
        document.getElementById('detailQuantityDisplay').textContent = '1';

        showModal(productDetailModal);
    }

    // =========================================================================
    // 8. دوال الإشعارات (Notification Functions)
    // =========================================================================

    function showSuccessNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification success-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // =========================================================================
    // 9. دوال التهيئة والأحداث (Initialization & Events)
    // =========================================================================

    async function initializeApp() {
        try {
            // Initialize Firebase
            if (firebase.apps.length === 0) {
                firebase.initializeApp(firebaseConfig);
            }
            db = firebase.firestore();

            // Load data
            await loadData();

            // Initialize UI
            populateBranchSelect();
            populateCategoryFilter();
            updateTranslations();
            renderProducts();
            renderCart();

            // Show branch selector if no branch selected
            if (!currentBranch) {
                showModal(branchSelectorModal);
            } else {
                showView('products');
            }

            // Attach event listeners
            attachEventListeners();

        } catch (error) {
            console.error('Error initializing app:', error);
            alert('فشل في تحميل التطبيق. يرجى التأكد من اتصال الإنترنت.');
        }
    }

    function attachEventListeners() {
        // Branch selection
        initialBranchSelect.addEventListener('change', () => {
            confirmBranchBtn.disabled = !initialBranchSelect.value;
        });

        confirmBranchBtn.addEventListener('click', () => {
            currentBranch = initialBranchSelect.value;
            localStorage.setItem('currentBranch', currentBranch);
            hideModal(branchSelectorModal);
            showView('products');
        });

        // Navigation
        ordersButton.addEventListener('click', () => {
            showView('orders');
            renderOrders(); // Show phone input prompt
        });

        // Search orders
        const searchOrdersBtn = document.getElementById('searchOrdersBtn');
        if (searchOrdersBtn) {
            searchOrdersBtn.addEventListener('click', () => {
                const phoneInput = document.getElementById('orderPhoneInput');
                const phoneNumber = phoneInput.value.trim();
                if (phoneNumber) {
                    renderOrders(phoneNumber);
                } else {
                    showSuccessNotification('يرجى إدخال رقم هاتف صحيح');
                }
            });
        }

        // Product filtering
        searchBar.addEventListener('input', debounce(renderProducts, 300));
        categoryFilter.addEventListener('change', renderProducts);

        // Cart
        toggleCartBtn.addEventListener('click', () => {
            cartSidebar.classList.toggle('hidden');
        });

        closeCartBtn.addEventListener('click', () => {
            cartSidebar.classList.add('hidden');
        });

        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                const emptyCartMsg = currentLang === 'en' ? 'Cart is empty!' : 'السلة فارغة!';
                alert(emptyCartMsg);
                return;
            }
            showModal(checkoutModal);
            const currency = currentLang === 'en' ? 'EGP' : 'ج.م';
            document.getElementById('checkoutTotalAmount').textContent =
                cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2) + ' ' + currency;
        });

        clearCartBtn.addEventListener('click', clearCart);

        // Checkout form
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(checkoutForm);
            const orderData = {
                customerName: formData.get('customerName'),
                customerPhone: formData.get('customerPhone'),
                customerAddress: formData.get('orderType') === 'Delivery' ? formData.get('customerAddress') : '',
                orderType: formData.get('orderType'),
                paymentMethod: formData.get('paymentMethod'),
                branchId: formData.get('orderBranch')
            };
            submitOrder(orderData);
        });

        // Order type toggle
        document.getElementById('deliveryOption').addEventListener('change', () => {
            document.getElementById('deliveryFields').style.display = 'block';
            document.getElementById('customerAddress').required = true;
        });

        document.getElementById('pickupOption').addEventListener('change', () => {
            document.getElementById('deliveryFields').style.display = 'none';
            document.getElementById('customerAddress').required = false;
        });

        // Product detail modal
        document.getElementById('closeProductDetailBtn').addEventListener('click', () => {
            hideModal(productDetailModal);
        });

        // Order details modal
        document.getElementById('closeOrderDetailsBtn').addEventListener('click', () => {
            hideModal(document.getElementById('orderDetailsModal'));
        });

        document.getElementById('detailAddToCartBtn').addEventListener('click', () => {
            const quantity = parseInt(document.getElementById('detailQuantityDisplay').textContent);
            const comments = document.getElementById('detailProductComments').value;
            if (currentProductId) {
                const product = products.find(p => p.id === currentProductId);
                if (product && product.sizes && product.sizes.length > 0 && selectedSizeIndex === null) {
                    showSuccessNotification(currentLang === 'en' ? 'Please select a size' : 'يرجى اختيار الحجم');
                    return;
                }
                addToCart(currentProductId, quantity, [], comments);
                hideModal(productDetailModal);
            }
        });

        // Quantity controls in product detail
        document.querySelectorAll('#productDetailModal [data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const display = document.getElementById('detailQuantityDisplay');
                let quantity = parseInt(display.textContent);
                if (e.target.getAttribute('data-action') === 'increment') {
                    quantity++;
                } else if (e.target.getAttribute('data-action') === 'decrement' && quantity > 1) {
                    quantity--;
                }
                display.textContent = quantity;
            });
        });

        // Language selector
        languageSelector.addEventListener('change', (e) => {
            currentLang = e.target.value;
            localStorage.setItem('language', currentLang);
            updateTranslations();
            renderProducts();
            populateCategoryFilter();
            renderCart();
            saveCart(); // Save updated cart names after language change
            cartSidebar.classList.remove('hidden'); // Show cart to display updated names

            // Check for missing English translations and notify accordingly
            if (currentLang === 'en') {
                const missingEnglish = products.some(p => !p.name_en);
                if (missingEnglish) {
                    showSuccessNotification('Language changed to English. Note: Some products do not have English names and will appear in Arabic.');
                } else {
                    showSuccessNotification('Language changed to English. All cart names updated.');
                }
            } else {
                showSuccessNotification('تم تغيير اللغة إلى العربية. تم تحديث أسماء السلة.');
            }

            // Update product detail modal if it's currently open
            if (currentProductId && !productDetailModal.classList.contains('hidden')) {
                showProductDetail(currentProductId);
            }
        });

        // Back to cart button
        document.getElementById('backToCartBtn').addEventListener('click', () => {
            hideModal(checkoutModal);
            cartSidebar.classList.remove('hidden');
        });
    }

    // =========================================================================
    // 10. دوال إضافية للأحجام والإضافات (Size and Addition Functions)
    // =========================================================================

    function selectSize(radio) {
        // Update selected size index
        selectedSizeIndex = parseInt(radio.getAttribute('data-size-index'));
        // Update price display including additions
        updateProductPriceDisplay();
    }

    function toggleAddition(checkbox) {
        const additionIndex = parseInt(checkbox.getAttribute('data-addition-index'));
        if (checkbox.checked) {
            if (!selectedAdditions.includes(additionIndex)) {
                selectedAdditions.push(additionIndex);
            }
        } else {
            selectedAdditions = selectedAdditions.filter(index => index !== additionIndex);
        }
        // Update price display including additions
        updateProductPriceDisplay();
    }

    function updateProductPriceDisplay() {
        const product = products.find(p => p.id === currentProductId);
        if (!product) return;

        let totalPrice = parseFloat(product.price);

        // Add size price if selected
        if (selectedSizeIndex !== null && product.sizes && product.sizes[selectedSizeIndex]) {
            totalPrice = parseFloat(product.sizes[selectedSizeIndex].price);
        }

        // Add additions prices
        selectedAdditions.forEach(additionIndex => {
            if (product.additions && product.additions[additionIndex]) {
                totalPrice += parseFloat(product.additions[additionIndex].price);
            }
        });

        document.getElementById('detailProductPrice').textContent = `${totalPrice.toFixed(2)} ${currentLang === 'en' ? 'EGP' : 'ج.م'}`;
    }

    function updateProductPrice(selectElement) {
        const productId = selectElement.getAttribute('data-product-id');
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        const price = selectedOption.getAttribute('data-price');
        const priceElement = document.getElementById(`price-${productId}`);
        if (priceElement) {
            priceElement.textContent = parseFloat(price).toFixed(2);
        }
    }



    // =========================================================================
    // 11. Global exports for HTML onclick handlers
    // =========================================================================

    function showProductDetailFromElement(element) {
        const productId = element.getAttribute('data-product-id');
        if (productId) {
            showProductDetail(productId);
        }
    }

    function addToCartFromElement(element) {
        const productId = element.getAttribute('data-product-id');
        if (productId) {
            // Reset selection state for direct cart adds
            selectedSizeIndex = null;
            selectedAdditions = [];
            addToCart(productId);
        }
    }

    function viewOrderDetailsFromElement(element) {
        const orderId = element.getAttribute('data-order-id');
        if (orderId) {
            viewOrderDetails(orderId);
        }
    }

    window.showView = showView;
    window.showProductDetail = showProductDetail;
    window.showProductDetailFromElement = showProductDetailFromElement;
    window.addToCart = addToCart;
    window.addToCartFromElement = addToCartFromElement;
    window.addProductToCart = addToCart;
    window.updateCartItem = updateCartItem;
    window.removeCartItem = removeCartItem;
    window.updateProductPrice = updateProductPrice;
    window.selectSize = selectSize;
    window.toggleAddition = toggleAddition;
    window.viewOrderDetails = viewOrderDetails;
    window.viewOrderDetailsFromElement = viewOrderDetailsFromElement;

    // Initialize app when DOM is ready
    document.addEventListener('DOMContentLoaded', initializeApp);

})();
