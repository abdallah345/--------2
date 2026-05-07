// dashboard.js - النسخة الكاملة المُصححة مع الصلاحيات المحسنة
// تم إزالة التكرارات، إصلاح الأخطاء، وتحسين الصلاحيات دون حذف أي أجزاء أخرى.

(() => {
    // =========================================================================
    // 0. التهيئة وإعدادات Firebase 
    // =========================================================================
    const firebaseConfig = {
        apiKey: "AIzaSyDyv5Sk7OgN6SyjO4ceDXa05CK__0uMmho",
        authDomain: "sagshawarmaapp.firebaseapp.com",
        projectId: "sagshawarmaapp",
        storageBucket: "sagshawarmaapp.firebasestorage.app",
        messagingSenderId: "686758956412",
        appId: "1:686758956412:web:a4294d95879fefc4a2a8f9",
        measurementId: "G-X4W33DMJ1Z"
    };

    let db;
    let auth;
    let storage;
    let currentUserRole = ''; // متغير لتخزين رتبة المستخدم الحالي
    let currentUserId = ''; // متغير لتخزين معرف المستخدم الحالي



    // دالة شاملة لتطبيق الصلاحيات وإخفاء العناصر (مُحسنة)
    function applyPermissionsUI() {
        console.log('Applying permissions for role:', currentUserRole); // للتتبع
        const isRestricted = ['staff', 'viewer', 'cashier'].includes(currentUserRole);

        if (isRestricted) {
            // إخفاء التبويبات من القائمة الجانبية
            document.querySelectorAll('.nav-btn').forEach(item => {
                if (item.getAttribute('data-view')?.includes('users') ||
                    item.getAttribute('data-view')?.includes('reports')) {
                    item.style.setProperty('display', 'none', 'important');
                }
            });

            // إخفاء كل أزرار الإضافة والتعديل والحذف
            const style = document.createElement('style');
            style.innerHTML = `
                #addUserBtn, #addProductBtn, #addCategoryBtn, #addBranchBtn,
                .edit, .delete, .btn-icon.edit, .btn-icon.delete, .btn.danger:not(#logoutBtn), .btn.secondary:not(#closeOrderDetailBtn) {
                    display: none !important;
                }
            `;
            document.head.appendChild(style);
            console.log("تم تطبيق قيود الموظف بنجاح");
        } else {
            console.log("أنت أدمن أو مدير.. كل الصلاحيات متاحة");
        }
    }

    // بيانات التطبيق الرئيسية
    let products = [];
    let branches = [];
    let users = [];
    let orders = [];
    let categories = [];
    let currentView = 'products';

    const ROLES = [
        { id: 'admin', name_ar: 'مدير النظام' },
        { id: 'manager', name_ar: 'مدير فرع' },
        { id: 'staff', name_ar: 'موظف' },
        { id: 'cashier', name_ar: 'كاشير' },
        { id: 'viewer', name_ar: 'مشاهد' }
    ];

    // =========================================================================
    // 1. عناصر واجهة المستخدم (UI Elements)
    // =========================================================================
    const dashboardContainer = document.getElementById('dashboardContainer');
    const logoutBtn = document.getElementById('logoutBtn');

    // الأزرار والتنقل
    const navButtons = document.querySelectorAll('.nav-btn');
    const viewSections = document.querySelectorAll('.view');
    const currentViewTitle = document.getElementById('currentViewTitle');
    const addButtons = document.querySelectorAll('.add-btn');

    // معلومات المستخدم
    const loggedInUserName = document.getElementById('loggedInUserName');
    const loggedInUserRole = document.getElementById('loggedInUserRole');

    // المنتجات
    const productsGrid = document.getElementById('productsGrid');
    const productModal = document.getElementById('productModal');
    const productForm = document.getElementById('productForm');
    const productSearch = document.getElementById('productSearch');
    const productFilterCategory = document.getElementById('productFilterCategory');
    const existingProductImage = document.getElementById('existingProductImage');
    const existingImageUrlInput = document.getElementById('existingImageUrl');

    // خيارات المنتج الديناميكية
    const productOptionsContainer = document.getElementById('productOptionsContainer');
    const addOptionBtn = document.getElementById('addOptionBtn');
    const optionsList = document.getElementById('optionsList');
    const productOptionsInput = document.getElementById('productOptions');

    // الإضافات الديناميكية
    const productAdditionsContainer = document.getElementById('productAdditionsContainer');
    const addAdditionBtn = document.getElementById('addAdditionBtn');
    const additionsList = document.getElementById('additionsList');
    const productAdditionsInput = document.getElementById('productAdditions');

    // الفروع المتاحة للمنتج
    const productBranchesContainer = document.getElementById('productBranchesContainer');
    const selectAllBranchesBtn = document.getElementById('selectAllBranchesBtn');
    const clearAllBranchesBtn = document.getElementById('clearAllBranchesBtn');
    const branchesList = document.getElementById('branchesList');
    const productBranchesInput = document.getElementById('productBranches');

    // الطلبات
    const ordersTableBody = document.getElementById('ordersTableBody');
    const orderDetailModal = document.getElementById('orderDetailModal');
    const closeOrderDetailBtn = document.getElementById('closeOrderDetailBtn');
    const orderSearch = document.getElementById('orderSearch');
    const orderFilterStatus = document.getElementById('orderFilterStatus');
    const orderFilterBranch = document.getElementById('orderFilterBranch');

    // التقارير
    const reportsView = document.getElementById('reports-view');
    const generateReportsBtn = document.getElementById('generateReportsBtn');
    const totalSalesAmount = document.getElementById('totalSalesAmount');
    const reportBranchFilter = document.getElementById('reportBranchFilter');
    const reportStartDate = document.getElementById('reportStartDate');
    const reportEndDate = document.getElementById('reportEndDate');
    const bestSellersTableBody = document.getElementById('bestSellersTableBody');
    const bestSellersMessage = document.getElementById('bestSellersMessage');

    // الفروع
    const branchesTableBody = document.getElementById('branchesTableBody');
    const branchModal = document.getElementById('branchModal');
    const branchForm = document.getElementById('branchForm');
    const branchSearch = document.getElementById('branchSearch');
    const cancelBranchBtn = document.getElementById('cancelBranchBtn');

    // المستخدمين
    const usersTableBody = document.getElementById('usersTableBody');
    const userModal = document.getElementById('userModal');
    const userForm = document.getElementById('userForm');
    const userSearch = document.getElementById('userSearch');
    const cancelUserBtn = document.getElementById('cancelUserBtn');

    // الفئات
    const categoriesTableBody = document.getElementById('categoriesTableBody');
    const categoryModal = document.getElementById('categoryModal');
    const categoryForm = document.getElementById('categoryForm');
    const categoryKeyInput = document.getElementById('categoryKey');
    const cancelCategoryBtn = document.getElementById('cancelCategoryBtn');
    const addCategoryBtn = document.getElementById('addCategoryBtn');

    // =========================================================================
    // 2. دوال الخدمات المساعدة (Utility Functions)
    // =========================================================================

    // دوال إدارة الخيارات الديناميكية
    function addOption() {
        const optionName_ar = document.getElementById('optionName_ar').value.trim();
        const optionName_en = document.getElementById('optionName_en').value.trim();
        const optionPrice = parseFloat(document.getElementById('optionPrice').value) || 0;

        if (!optionName_ar) {
            alert('الرجاء إدخال اسم الخيار بالعربية.');
            return;
        }

        const optionItem = document.createElement('div');
        optionItem.className = 'option-item';
        optionItem.innerHTML = `
            <span>${optionName_ar} ${optionName_en ? '(' + optionName_en + ')' : ''} - ${optionPrice.toFixed(2)} ج.م</span>
            <button type="button" class="btn danger small remove-option">حذف</button>
            <input type="hidden" name="optionName_ar" value="${optionName_ar}">
            <input type="hidden" name="optionName_en" value="${optionName_en}">
            <input type="hidden" name="optionPrice" value="${optionPrice}">
        `;

        optionItem.querySelector('.remove-option').addEventListener('click', () => {
            optionItem.remove();
            updateOptionsInput();
        });

        optionsList.appendChild(optionItem);
        document.getElementById('optionName_ar').value = '';
        document.getElementById('optionName_en').value = '';
        document.getElementById('optionPrice').value = '';
        updateOptionsInput();
    }

    function updateOptionsInput() {
        const options = [];
        optionsList.querySelectorAll('.option-item').forEach(item => {
            const name_ar = item.querySelector('input[name="optionName_ar"]').value;
            const name_en = item.querySelector('input[name="optionName_en"]').value;
            const price = parseFloat(item.querySelector('input[name="optionPrice"]').value);
            options.push({ name_ar, name_en, price });
        });
        productOptionsInput.value = JSON.stringify(options);
    }

    // دوال إدارة الإضافات الديناميكية
    function addAddition() {
        const additionName_ar = document.getElementById('additionName_ar').value.trim();
        const additionName_en = document.getElementById('additionName_en').value.trim();
        const additionPrice = parseFloat(document.getElementById('additionPrice').value) || 0;

        if (!additionName_ar) {
            alert('الرجاء إدخال اسم الإضافة بالعربية.');
            return;
        }

        const additionItem = document.createElement('div');
        additionItem.className = 'addition-item';
        additionItem.innerHTML = `
            <span>${additionName_ar} ${additionName_en ? '(' + additionName_en + ')' : ''} - ${additionPrice.toFixed(2)} ج.م</span>
            <button type="button" class="btn danger small remove-addition">حذف</button>
            <input type="hidden" name="additionName_ar" value="${additionName_ar}">
            <input type="hidden" name="additionName_en" value="${additionName_en}">
            <input type="hidden" name="additionPrice" value="${additionPrice}">
        `;

        additionItem.querySelector('.remove-addition').addEventListener('click', () => {
            additionItem.remove();
            updateAdditionsInput();
        });

        additionsList.appendChild(additionItem);
        document.getElementById('additionName_ar').value = '';
        document.getElementById('additionName_en').value = '';
        document.getElementById('additionPrice').value = '';
        updateAdditionsInput();
    }

    function updateAdditionsInput() {
        const additions = [];
        additionsList.querySelectorAll('.addition-item').forEach(item => {
            const name_ar = item.querySelector('input[name="additionName_ar"]').value;
            const name_en = item.querySelector('input[name="additionName_en"]').value;
            const price = parseFloat(item.querySelector('input[name="additionPrice"]').value);
            additions.push({ name_ar, name_en, price });
        });
        productAdditionsInput.value = JSON.stringify(additions);
    }

    // دوال إدارة الفروع المتاحة
    function populateBranchesList(selectedBranches = []) {
        if (!branchesList) return;

        branchesList.innerHTML = '';

        branches.forEach(branch => {
            const branchItem = document.createElement('div');
            branchItem.className = 'branch-item';
            branchItem.innerHTML = `
                <label>
                    <input type="checkbox" value="${branch.id}" ${selectedBranches.includes(branch.id) ? 'checked' : ''}>
                    ${branch.name}
                </label>
            `;
            branchesList.appendChild(branchItem);
        });

        // إضافة event listeners للcheckboxes
        branchesList.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', updateBranchesInput);
        });
    }

    function updateBranchesInput() {
        const selectedBranches = Array.from(branchesList.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
        productBranchesInput.value = JSON.stringify(selectedBranches);
    }

    function selectAllBranches() {
        branchesList.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = true;
        });
        updateBranchesInput();
    }

    function clearAllBranches() {
        branchesList.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        updateBranchesInput();
    }
    async function getCollection(collectionName) {
        try {
            if (typeof db === 'undefined') return [];
            const snapshot = await db.collection(collectionName).get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error(`Error fetching collection ${collectionName}:`, error);
            return [];
        }
    }

    function translateStatus(status) {
        const translations = {
            'Pending': 'قيد الانتظار', 'Processing': 'قيد التجهيز', 'Ready': 'جاهز للاستلام',
            'Out for Delivery': 'في الطريق', 'Delivered': 'تم التوصيل', 'Canceled': 'ملغي'
        };
        return translations[status] || status;
    }

    function getRoleDisplayName(roleId) {
        return ROLES.find(r => r.id === roleId)?.name_ar || roleId;
    }

    function translateRole(role) {
        const roles = { 'admin': 'مدير نظام', 'manager': 'مدير فرع', 'staff': 'موظف', 'viewer': 'مشاهد', 'cashier': 'كاشير' };
        return roles[role] || role;
    }

    function showModal(modalElement, title = null) {
        if (!modalElement) return;
        modalElement.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        if (title) {
            const titleEl = modalElement.querySelector('.modal-title');
            if (titleEl) titleEl.textContent = title;
        }
        addButtons.forEach(btn => btn.classList.add('hidden'));
    }

    function hideModal(modalElement) {
        if (!modalElement) return;
        modalElement.classList.add('hidden');
        document.body.style.overflow = '';
        if (modalElement.querySelector('form')) {
            modalElement.querySelector('form').reset();
        }
        showView(currentView);
    }

    // تعطيل رفع الملف (لخطة Spark)
    async function uploadFile(file, folderName) {
        console.warn("Attempted to upload file: " + file.name + ", but Firebase Storage is disabled in Spark Plan. Returning local path.");
        return 'assets/images/' + file.name;
    }

    // تعطيل حذف الملف (لخطة Spark)
    async function deleteFile(fileUrl) {
        console.warn("Attempted to delete file: " + fileUrl + ", but Firebase Storage is disabled in Spark Plan.");
        return;
    }

    function showSuccessNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification success-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    async function fetchCategories() {
        try {
            const snapshot = await db.collection('categories').get();
            categories = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    function populateCategorySelect(selectedCategoryId = '') {
        const categorySelect = document.getElementById('productCategory');
        if (!categorySelect) return;

        categorySelect.innerHTML = '<option value="" disabled selected>اختر فئة</option>';

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name_ar;
            if (selectedCategoryId && category.id === selectedCategoryId) {
                option.selected = true;
            }
            categorySelect.appendChild(option);
        });
    }

    // =========================================================================
    // 3. دوال المصادقة والتحميل (Authentication & Data Loading)
    // =========================================================================
    async function loadData() {
        const [productsList, branchesList, usersList, ordersList, categoriesList] = await Promise.all([
            getCollection('products'),
            getCollection('branches'),
            getCollection('users'),
            getCollection('orders'),
            getCollection('categories')
        ]);

        products = productsList;
        branches = branchesList;
        users = usersList;
        orders = ordersList;
        categories = categoriesList;
    }



    async function handleAuthState(user) {
        if (user) {
            let userData = null;

            try {
                let userDoc = await db.collection('users').doc(user.uid).get();

                if (userDoc.exists) {
                    userData = userDoc.data();
                } else {
                    const emailSnapshot = await db.collection('users').where('email', '==', user.email).limit(1).get();
                    if (!emailSnapshot.empty) {
                        userData = emailSnapshot.docs[0].data();
                    }
                }

                if (userData && ['admin', 'manager', 'staff', 'cashier', 'viewer'].includes(userData.role)) {

                    if (dashboardContainer) dashboardContainer.classList.remove('hidden');

                    if (loggedInUserName) loggedInUserName.textContent = userData.name || user.email;
                    if (loggedInUserRole) loggedInUserRole.textContent = getRoleDisplayName(userData.role);

                    currentUserRole = userData.role;
                    currentUserId = user.uid;
                    applyPermissionsUI(); // تطبيق الصلاحيات

                    await loadData();
                    showView(currentView);

                    return;
                }

                console.warn("User authenticated but unauthorized by role check. Logging out.");
                await auth.signOut();
                window.location.href = 'login.html';

            } catch (e) {
                console.error("Authorization check failed:", e);
                await auth.signOut();
                window.location.href = 'login.html';
            }

        } else {
            if (dashboardContainer) dashboardContainer.classList.add('hidden');

            if (window.location.pathname.indexOf('login.html') === -1) {
                window.location.href = 'login.html';
            }
        }
    }

    // التهيئة الأولية للتطبيق
    async function initializeApp() {
        if (typeof firebase === 'undefined' || typeof firebase.firestore === 'undefined') {
            await new Promise(resolve => setTimeout(resolve, 100));
            if (typeof firebase === 'undefined' || typeof firebase.firestore === 'undefined') {
                console.error("Firebase library not found.");
                alert("فشل في تحميل لوحة التحكم. يرجى التأكد من إدراج جميع سكريبتات Firebase في ملف HTML بالترتيب الصحيح.");
                return;
            }
        }

        try {
            let app;
            if (firebase.apps.length === 0) {
                app = firebase.initializeApp(firebaseConfig);
            } else {
                app = firebase.app();
            }

            db = app.firestore();
            auth = app.auth();

            auth.onAuthStateChanged(handleAuthState);

            attachEventListeners();

        } catch (e) {
            console.error("Critical error during application initialization:", e);
            alert("فشل في تحميل لوحة التحكم. يرجى التأكد من إعدادات Firebase أو اتصال الشبكة.");
        }
    }

    // =========================================================================
    // 4. دوال العرض (Rendering) 
    // =========================================================================
    function renderProducts() {
        if (!productsGrid) return;

        const searchTerm = productSearch ? productSearch.value.toLowerCase() : '';
        const categoryFilter = productFilterCategory ? productFilterCategory.value : 'all';

        const filteredProducts = products.filter(p => {
            let matchesSearch = !searchTerm || 
                (p.name_ar && p.name_ar.toLowerCase().includes(searchTerm)) ||
                (p.name_en && p.name_en.toLowerCase().includes(searchTerm)) ||
                (p.name && p.name.toLowerCase().includes(searchTerm)) ||
                (p.description && p.description.toLowerCase().includes(searchTerm)) ||
                (p.description_en && p.description_en.toLowerCase().includes(searchTerm));
            let matchesCategory = (categoryFilter === 'all' || p.category === categoryFilter);
            return matchesSearch && matchesCategory;
        });

        productsGrid.innerHTML = filteredProducts.map(p => {
            const categoryName = categories.find(c => c.id === p.category)?.name_ar || p.category || 'غير محدد';
            const originalPrice = parseFloat(p.price);
            const discountPercentage = parseFloat(p.discount_percentage) || 0;
            const discountedPrice = discountPercentage > 0 ? originalPrice * (1 - discountPercentage / 100) : originalPrice;
            const priceDisplay = discountPercentage > 0 ?
                `<span class="product-price discounted">${discountedPrice.toFixed(2)} ج.م</span> <span class="original-price">${originalPrice.toFixed(2)} ج.م</span>` :
                `<span class="product-price">${originalPrice.toFixed(2)} ج.م</span>`;

            return `
                <div class="product-card">
                    <img src="${p.image || 'assets/images/logo.png'}" alt="${p.name}" class="product-image">
                    <div class="product-info">
                        <h3>${p.name_ar || p.name_en || p.name || 'غير محدد'}</h3>
                        <p class="category-tag">${categoryName}</p>
                        ${priceDisplay}
                    </div>
                    <div class="product-actions">
                        <button class="btn secondary small" onclick="editProduct('${p.id}')"><i class="fas fa-edit"></i> تعديل</button>
                        <button class="btn danger small" onclick="deleteProduct('${p.id}')"><i class="fas fa-trash"></i> حذف</button>
                    </div>
                </div>
            `;
        }).join('');

        if (filteredProducts.length === 0) {
            productsGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">لا توجد منتجات تطابق معايير البحث أو التصفية الحالية.</p>';
        }

        if (productFilterCategory) {
            const currentFilter = productFilterCategory.value;
            productFilterCategory.innerHTML = "<option value=\"all\">جميع الفئات</option>" + categories.map(c => `<option value="${c.id}">${c.name_ar}</option>`).join('');
            productFilterCategory.value = currentFilter;
        }
    }

    function renderOrders() {
        if (!ordersTableBody) return;

        const searchTerm = orderSearch ? orderSearch.value.toLowerCase() : '';
        const statusFilter = orderFilterStatus ? orderFilterStatus.value : 'all';
        const branchFilter = orderFilterBranch ? orderFilterBranch.value : 'all';

        const filtered = orders.filter(o => {
            let matchesSearch = !searchTerm || o.id.toLowerCase().includes(searchTerm) || (o.customerName && o.customerName.toLowerCase().includes(searchTerm));
            let matchesStatus = (statusFilter === 'all' || o.status === statusFilter);
            let matchesBranch = (branchFilter === 'all' || o.branchId === branchFilter);
            return matchesSearch && matchesStatus && matchesBranch;
        });

        const sortedOrders = filtered.sort((a, b) => {
            const dateA = a.date?.toDate ? a.date.toDate() : (a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.date || 0));
            const dateB = b.date?.toDate ? b.date.toDate() : (b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.date || 0));
            return dateB - dateA;
        });

        ordersTableBody.innerHTML = sortedOrders.map(o => {
            const branch = branches.find(b => b.id === o.branchId);
            const orderDate = o.date?.toDate ? o.date.toDate() : (o.createdAt?.toDate ? o.createdAt.toDate() : new Date());
            const date = orderDate.toLocaleDateString('ar-EG');
            const time = orderDate.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });

                return `
                <tr>
                    <td>${o.id.substring(0, 8)}...</td>
                    <td>${o.customerName || 'N/A'} - ${o.customerPhone || 'N/A'}</td>
                    <td>${branch ? branch.name : 'N/A'}</td>
                    <td>${parseFloat(o.total).toFixed(2)} ج.م</td>
                    <td><span class="status-badge status-${o.status.toLowerCase().replace(/\s/g, '-')}">${translateStatus(o.status)}</span></td>
                    <td>${date} ${time}</td>
                    <td>
                        <select class="status-select" onchange="updateOrderStatus('${o.id}', this.value)">
                            ${['Pending', 'Processing', 'Ready', 'Out for Delivery', 'Delivered', 'Canceled'].map(s => `
                                <option value="${s}" ${o.status === s ? 'selected' : ''}>${translateStatus(s)}</option>
                            `).join('')}
                        </select>
                         <button class="btn primary small" onclick="showOrderDetail('${o.id}')"><i class="fas fa-eye"></i> عرض التفاصيل</button>
                    </td>
                </tr>
            `;
        }).join('');

        if (sortedOrders.length === 0) {
            ordersTableBody.innerHTML = '<tr><td colspan="7" style="text-align: center;">لا توجد طلبات تطابق معايير البحث أو التصفية الحالية.</td></tr>';
        }

        if (orderFilterBranch) {
            const currentFilter = orderFilterBranch.value;
            orderFilterBranch.innerHTML = '<option value="all">جميع الفروع</option>' +
                branches.map(b => `<option value="${b.id}">${b.name}</option>`).join('');
            orderFilterBranch.value = currentFilter;
        }
    }

    function renderReports() {
        if (!reportsView) return;

        if (reportBranchFilter) {
            reportBranchFilter.innerHTML = '<option value="all">جميع الفروع</option>' +
                branches.map(b => `<option value="${b.id}">${b.name}</option>`).join('');
        }

        const today = new Date();
        const thirtyDaysAgo = new Date(today.getTime() - (30 * 24 * 60 * 60 * 1000));

        if (reportEndDate && !reportEndDate.value) reportEndDate.value = today.toISOString().split('T')[0];
        if (reportStartDate && !reportStartDate.value) reportStartDate.value = thirtyDaysAgo.toISOString().split('T')[0];

        calculateTotalSales();
        calculateBestSellingProducts();
    }

    async function calculateTotalSales() {
        if (!db || !totalSalesAmount) return;

        totalSalesAmount.textContent = "جاري الحساب...";

        try {
            let ordersRef = db.collection('orders');
            let query = ordersRef.where('status', '==', 'Delivered');

            const branchId = reportBranchFilter?.value;
            if (branchId && branchId !== 'all') {
                query = query.where('branchId', '==', branchId);
            }

            const startDateString = reportStartDate?.value;
            const endDateString = reportEndDate?.value;

            if (startDateString || endDateString) {
                const snapshotAll = await query.get();
                let filteredOrders = snapshotAll.docs.map(doc => doc.data());

                if (startDateString) {
                    const startDate = new Date(startDateString);
                    filteredOrders = filteredOrders.filter(order => {
                        const orderDate = order.createdAt?.toDate ? order.createdAt.toDate() : new Date();
                        return orderDate >= startDate;
                    });
                }

                if (endDateString) {
                    const endDate = new Date(endDateString);
                    endDate.setHours(23, 59, 59, 999);
                    filteredOrders = filteredOrders.filter(order => {
                        const orderDate = order.createdAt?.toDate ? order.createdAt.toDate() : new Date();
                        return orderDate <= endDate;
                    });
                }

                let totalAmount = 0;
                filteredOrders.forEach(order => {
                    if (order.total && typeof order.total === 'number') {
                        totalAmount += order.total;
                    }
                });

                totalSalesAmount.textContent = `${totalAmount.toFixed(2)} ج.م`;
                console.log("Total sales calculated:", totalAmount, "Filtered orders:", filteredOrders.length);
            } else {
                // No date filters - fetch all delivered orders for branch
                const snapshot = await query.get();
                let totalAmount = 0;
                snapshot.forEach(doc => {
                    const order = doc.data();
                    if (order.total && typeof order.total === 'number') {
                        totalAmount += order.total;
                    }
                });
                totalSalesAmount.textContent = `${totalAmount.toFixed(2)} ج.م`;
                console.log("Total sales calculated (no date filter):", totalAmount);
            }
        } catch (error) {
            console.error("Error calculating total sales:", error);
            totalSalesAmount.textContent = `خطأ: ${error.message}`;
        }
    }

    async function calculateBestSellingProducts() {
        if (!db || !bestSellersTableBody) return;

        bestSellersTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">جاري تجميع البيانات...</td></tr>';
        bestSellersMessage.textContent = '';

        try {
            let ordersRef = db.collection('orders');
            let query = ordersRef.where('status', '==', 'Delivered');

            const branchId = reportBranchFilter?.value;
            if (branchId && branchId !== 'all') {
                query = query.where('branchId', '==', branchId);
            }

            const snapshotAll = await query.get();
            let filteredOrders = snapshotAll.docs.map(doc => doc.data());

            const startDateString = reportStartDate?.value;
            const endDateString = reportEndDate?.value;

            if (startDateString || endDateString) {
                if (startDateString) {
                    const startDate = new Date(startDateString);
                    filteredOrders = filteredOrders.filter(order => {
                        const orderDate = order.createdAt?.toDate ? order.createdAt.toDate() : new Date();
                        return orderDate >= startDate;
                    });
                }

                if (endDateString) {
                    const endDate = new Date(endDateString);
                    endDate.setHours(23, 59, 59, 999);
                    filteredOrders = filteredOrders.filter(order => {
                        const orderDate = order.createdAt?.toDate ? order.createdAt.toDate() : new Date();
                        return orderDate <= endDate;
                    });
                }
            }

            const productSales = {};
            filteredOrders.forEach(order => {
                (order.items || []).forEach(item => {
                    const productId = item.productId || item.id;
                    const quantity = item.quantity || 1;

                    if (!productSales[productId]) {
                        const productDetails = products.find(prod => prod.id === productId);
                        productSales[productId] = {
                            id: productId,
                            name: productDetails?.name_ar || productDetails?.name || item.name_ar || item.name || 'غير معروف',
                            quantity: 0
                        };
                    }
                    productSales[productId].quantity += quantity;
                });
            });

            const sortedProducts = Object.values(productSales)
                .sort((a, b) => b.quantity - a.quantity)
                .slice(0, 10);

            if (sortedProducts.length === 0) {
                bestSellersTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">لا توجد طلبات مسلّمة في الفترة المحددة.</td></tr>';
                bestSellersMessage.textContent = 'جرب توسيع نطاق التاريخ أو اختيار "جميع الفروع"';
                return;
            }

            bestSellersTableBody.innerHTML = sortedProducts.map((p, index) => {
                const productDetails = products.find(prod => prod.id === p.id);
                const categoryName = productDetails ? (categories.find(c => c.id === productDetails.category)?.name_ar || 'N/A') : 'N/A';

                return `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${p.name}</td>
                        <td>${categoryName}</td>
                        <td>${p.quantity}</td>
                    </tr>
                `;
            }).join('');

            console.log("Best sellers calculated:", sortedProducts.length, "products from", filteredOrders.length, "orders");

        } catch (error) {
            console.error("Error calculating best sellers:", error);
            bestSellersTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">خطأ: ' + error.message + '</td></tr>';
        }
    }

    function renderBranches() {
        if (!branchesTableBody) return;

        const searchTerm = branchSearch ? branchSearch.value.toLowerCase() : '';

        const filteredBranches = branches.filter(b => {
            let matchesSearch = !searchTerm || (b.name && b.name.toLowerCase().includes(searchTerm)) || (b.location && b.location.toLowerCase().includes(searchTerm));
            return matchesSearch;
        });

        branchesTableBody.innerHTML = filteredBranches.map(b => `
            <tr>
                <td>${b.id.substring(0, 8)}...</td>
                <td>${b.name}</td>
                <td>${b.location}</td>
                <td>${b.phone}</td>
                <td> 
                    <button class="btn secondary small" onclick="editBranch('${b.id}')"><i class="fas fa-edit"></i> تعديل</button>
                    <button class="btn danger small" onclick="deleteBranch('${b.id}')"><i class="fas fa-trash"></i> حذف</button>
                </td>
            </tr>
        `).join('');
    }

    function renderUsers() {
        if (!usersTableBody) return;

        if (currentUserRole !== 'admin' && currentUserRole !== 'manager') {
            usersTableBody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:red; padding:20px;">عذراً، لا تملك صلاحية لعرض بيانات المستخدمين.</td></tr>';
            return;
        }

        const searchTerm = userSearch ? userSearch.value.toLowerCase() : '';

        const filteredUsers = users.filter(u => {
            let matchesSearch = !searchTerm || (u.name && u.name.toLowerCase().includes(searchTerm)) || (u.email && u.email.toLowerCase().includes(searchTerm));
            return matchesSearch;
        });

        usersTableBody.innerHTML = filteredUsers.map(u => {
            const roleName = getRoleDisplayName(u.role);
            const branchName = branches.find(b => b.id === u.branchId)?.name || 'N/A';
            return `
                <tr>
                    <td>${u.name || 'N/A'}</td>
                    <td>${u.email}</td>
                    <td><span class="role-tag role-${u.role}">${roleName}</span></td>
                    <td>${branchName}</td>
                    <td> 
                        <button class="btn secondary small" onclick="editUser('${u.id}')"><i class="fas fa-edit"></i> تعديل</button>
                        <button class="btn danger small" onclick="deleteUser('${u.id}')"><i class="fas fa-trash"></i> حذف</button>
                    </td>
                </tr>
            `;
        }).join('');

        if (filteredUsers.length === 0) {
            usersTableBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">لا يوجد مستخدمون مطابقون لمعايير البحث الحالية.</td></tr>';
        }
    }

    function fetchAndRenderCategories() {
        if (!categoriesTableBody) return;

        const sortedCategories = categories.sort((a, b) => (a.name_ar || '').localeCompare(b.name_ar || ''));

        categoriesTableBody.innerHTML = sortedCategories.map(c => `
            <tr>
                <td>${c.id}</td>
                <td>${c.name_ar}</td>
                <td>${c.name_en}</td>
                <td>
                    <button class="btn secondary small" onclick="editCategory('${c.id}')"><i class="fas fa-edit"></i> تعديل</button>
                    <button class="btn danger small" onclick="deleteCategory('${c.id}')"><i class="fas fa-trash"></i> حذف</button>
                </td>
            </tr>
        `).join('');

        renderProducts();
    }

    function renderCategories() {
        fetchAndRenderCategories();
    }

    // =========================================================================
    // 5. دوال الإجراءات (CRUD) 
    // =========================================================================
    async function submitProduct(e) {
        e.preventDefault();

        const id = document.getElementById('productId').value;
        const imageFile = document.getElementById('productImageFile').files[0];
        const existingImage = document.getElementById('existingProductImage').value;
        let imageUrl = existingImage;

        const data = {
            name_ar: document.getElementById('productName').value.trim(),
            name_en: document.getElementById('productName_en').value.trim(),
            description: document.getElementById('productDescription').value.trim(),
            description_en: document.getElementById('productDescription_en').value.trim(),
            category: document.getElementById('productCategory').value.trim(),
            price: parseFloat(document.getElementById('productPrice').value),
            options: document.getElementById('productOptions').value.trim() || '[]',
            additions: document.getElementById('productAdditions').value.trim() || '[]',
            branches: document.getElementById('productBranches').value.trim() || '[]',
            is_new: document.getElementById('productIsNew').checked,
            discount_percentage: parseFloat(document.getElementById('productDiscountPercentage').value) || null,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        if (!data.name_ar || !data.category || isNaN(data.price)) {
            alert('الرجاء إدخال اسم المنتج (العربية)، الفئة والسعر بشكل صحيح.');
            return;
        }

        try {
            if (imageFile) {
                imageUrl = 'assets/images/' + imageFile.name;
            }
            data.image = imageUrl;

            if (id) {
                await db.collection('products').doc(id).set(data, { merge: true });
            } else {
                data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
                await db.collection('products').add(data);
            }

            showSuccessNotification('تم حفظ المنتج بنجاح.');
            await loadData();
            renderProducts();
            productForm.reset();
            hideModal(productModal);

        } catch (e) {
            console.error("Error saving product:", e);
            alert('فشل في حفظ المنتج: ' + e.message);
        }
    }

    async function submitBranch(e) {
        e.preventDefault();
        const id = document.getElementById('branchId').value;

        const data = {
            name: document.getElementById('branchName').value.trim(),
            location: document.getElementById('branchLocation').value.trim(),
            phone: document.getElementById('branchPhone').value.trim(),
        };

        if (!data.name || !data.location || !data.phone) {
            alert('الرجاء إدخال جميع الحقول.');
            return;
        }

        try {
            if (id) {
                await db.collection('branches').doc(id).update(data);
            } else {
                await db.collection('branches').add(data);
            }

            showSuccessNotification('تم حفظ الفرع بنجاح.');
            await loadData();
            renderBranches();
            branchForm.reset();
            hideModal(branchModal);

        } catch (e) {
            console.error("Error saving branch:", e);
            alert('فشل في حفظ الفرع: ' + e.message);
        }
    }

    async function submitCategory(e) {
        e.preventDefault();

        const dbId = document.getElementById('categoryId').value;
        const categoryKeyInput = document.getElementById('categoryKey');

        const categoryKey = categoryKeyInput.value.trim();
        const name_ar = document.getElementById('categoryName_ar').value.trim();
        const name_en = document.getElementById('categoryName_en').value.trim();

        if (!categoryKey || !name_ar) {
            alert('الرجاء تعبئة جميع الحقول المطلوبة.');
            return;
        }

        const categoryData = {
            name_ar: name_ar,
            name_en: name_en,
            id: categoryKey
        };

        try {
            let docRef;

            if (dbId) {
                docRef = db.collection('categories').doc(dbId);
                await docRef.update(categoryData);
                showSuccessNotification('تم تعديل الفئة بنجاح!');
            } else {
                docRef = db.collection('categories').doc(categoryKey);
                await docRef.set(categoryData);
                showSuccessNotification('تم إضافة الفئة بنجاح!');
            }

            hideModal(categoryModal);

            await fetchCategories();
            renderCategories();

        } catch (error) {
            console.error("Error saving category:", error);
            alert("فشل في حفظ الفئة: " + error.message);
        }
    }

    async function submitUser(e) {
        e.preventDefault();
        const id = document.getElementById('userId').value;
        const email = document.getElementById('userEmail').value.trim();
        const password = document.getElementById('userPassword').value.trim();

        const data = {
            name: document.getElementById('userName').value.trim(),
            email: email,
            role: document.getElementById('userRole').value,
            branchId: document.getElementById('userBranch').value || null,
        };

        if (!data.name || !data.email || !data.role) {
            alert('الرجاء إدخال جميع الحقول الضرورية.');
            return;
        }

        if (!id && !password) {
            alert('يجب إدخال كلمة مرور للمستخدم الجديد.');
            return;
        }

        if (currentUserRole === 'manager' && (data.role === 'admin' || data.role === 'manager')) {
            alert("ممنوع ترفع رتبة أعلى منك");
            return;
        }

    try {
        if (id) {
            // Check if email is being changed for existing user
            const currentDoc = await db.collection('users').doc(id).get();
            const currentData = currentDoc.data();
            if (data.email !== currentData.email) {
                alert('لا يمكن تغيير البريد الإلكتروني للمستخدم الموجود. إذا كنت تريد تغيير البريد، يجب حذف المستخدم وإنشاء جديد.');
                return;
            }
            await db.collection('users').doc(id).set(data, { merge: true });
        } else {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            await db.collection('users').doc(userCredential.user.uid).set({
                ...data,
                id: userCredential.user.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }

        showSuccessNotification('تم حفظ بيانات المستخدم بنجاح.');
        await loadData();
        renderUsers();
        userForm.reset();
        hideModal(userModal);

    } catch (e) {
        console.error("Error saving user:", e);
        alert('فشل في حفظ المستخدم: ' + e.message);
    }
}

    function populateBranchSelect(selectedBranch = null) {
        const select = document.getElementById('userBranch');
        if (!select) return; 

        select.innerHTML = '<option value="">-- لا يوجد فرع محدد --</option>' + 
            branches.map(b => `
                <option value="${b.id}" ${b.id === selectedBranch ? 'selected' : ''}>
                    ${b.name}
                </option>
            `).join('');
    }
    
    function populateRoleSelect(selectedRole = null) {
        const roleSelect = document.getElementById('userRole');
        if(roleSelect) roleSelect.innerHTML = '<option value="">-- اختر دور --</option>' + ROLES.map(r => 
            `<option value="${r.id}" ${r.id === selectedRole ? 'selected' : ''}>${r.name_ar}</option>`
        ).join('');
    }

    function editCategory(id) {
        const category = categories.find(c => c.id === id);
        if (!category) return;

        showModal(categoryModal, 'تعديل الفئة');
        document.getElementById('categoryId').value = category.id;
        document.getElementById('categoryKey').value = category.id;
        document.getElementById('categoryName_ar').value = category.name_ar || '';
        document.getElementById('categoryName_en').value = category.name_en || '';

        document.getElementById('categoryKey').disabled = true;
    }

    // Edit and Delete functions for Products
    function editProduct(id) {
        const product = products.find(p => p.id === id);
        if (!product) return;
        showModal(productModal, 'تعديل المنتج');
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name_ar || product.name || '';
        document.getElementById('productName_en').value = product.name_en || '';
        document.getElementById('productDescription').value = product.description || '';
        document.getElementById('productPrice').value = product.price || '';
        document.getElementById('productOptions').value = product.options || '[]';
        document.getElementById('existingProductImage').value = product.image || '';
        document.getElementById('productIsNew').checked = product.is_new || false;
        document.getElementById('productDiscountPercentage').value = product.discount_percentage || '';

        // Populate category select
        populateCategorySelect(product.category);

        // Populate branches list
        const selectedBranches = JSON.parse(product.branches || '[]');
        populateBranchesList(selectedBranches);
        updateBranchesInput();

        // Populate options list from existing options
        const options = JSON.parse(product.options || '[]');
        optionsList.innerHTML = '';
        options.forEach(opt => {
            const optionItem = document.createElement('div');
            optionItem.className = 'option-item';
            optionItem.innerHTML = `
                <span>${opt.name_ar || opt.name} ${opt.name_en ? '(' + opt.name_en + ')' : ''} - ${opt.price.toFixed(2)} ج.م</span>
                <button type="button" class="btn danger small remove-option">حذف</button>
                <input type="hidden" name="optionName_ar" value="${opt.name_ar || opt.name}">
                <input type="hidden" name="optionName_en" value="${opt.name_en || ''}">
                <input type="hidden" name="optionPrice" value="${opt.price}">
            `;
            optionItem.querySelector('.remove-option').addEventListener('click', () => {
                optionItem.remove();
                updateOptionsInput();
            });
            optionsList.appendChild(optionItem);
        });

        // Populate additions list from existing additions
        const additions = JSON.parse(product.additions || '[]');
        additionsList.innerHTML = '';
        additions.forEach(add => {
            const additionItem = document.createElement('div');
            additionItem.className = 'addition-item';
            additionItem.innerHTML = `
                <span>${add.name_ar || add.name} ${add.name_en ? '(' + add.name_en + ')' : ''} - ${add.price.toFixed(2)} ج.م</span>
                <button type="button" class="btn danger small remove-addition">حذف</button>
                <input type="hidden" name="additionName_ar" value="${add.name_ar || add.name}">
                <input type="hidden" name="additionName_en" value="${add.name_en || ''}">
                <input type="hidden" name="additionPrice" value="${add.price}">
            `;
            additionItem.querySelector('.remove-addition').addEventListener('click', () => {
                additionItem.remove();
                updateAdditionsInput();
            });
            additionsList.appendChild(additionItem);
        });
        updateAdditionsInput();
    }

    async function deleteProduct(id) {
        try {
            await db.collection('products').doc(id).delete();
            showSuccessNotification('تم حذف المنتج بنجاح.');
            await loadData();
            renderProducts();
        } catch (e) {
            console.error("Error deleting product:", e);
            alert('فشل في حذف المنتج: ' + e.message);
        }
    }

    // Edit and Delete functions for Branches
    function editBranch(id) {
        const branch = branches.find(b => b.id === id);
        if (!branch) return;
        showModal(branchModal, 'تعديل الفرع');
        document.getElementById('branchId').value = branch.id;
        document.getElementById('branchName').value = branch.name || '';
        document.getElementById('branchLocation').value = branch.location || '';
        document.getElementById('branchPhone').value = branch.phone || '';
    }

    async function deleteBranch(id) {
        if (!confirm('هل أنت متأكد من حذف هذا الفرع؟')) return;
        try {
            await db.collection('branches').doc(id).delete();
            showSuccessNotification('تم حذف الفرع بنجاح.');
            await loadData();
            renderBranches();
        } catch (e) {
            console.error("Error deleting branch:", e);
            alert('فشل في حذف الفرع: ' + e.message);
        }
    }

    // Edit and Delete functions for Users
    async function editUser(id) {
        const doc = await db.collection('users').doc(id).get();
        const data = doc.data();

        document.getElementById('userId').value = id;
        document.getElementById('userName').value = data.name;
        document.getElementById('userEmail').value = data.email;
        document.getElementById('userEmail').disabled = true;
        populateBranchSelect(data.branchId);
        populateRoleSelect(data.role);
        document.getElementById('userRole').value = data.role;
        document.getElementById('userBranch').value = data.branchId || '';
        showModal(userModal, 'تعديل المستخدم');
    }

    async function deleteUser(id) {
        if (!confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return;

        // Prevent managers from deleting admins
        if (currentUserRole === 'manager') {
            const userDoc = await db.collection('users').doc(id).get();
            const userData = userDoc.data();
            if (userData && userData.role === 'admin') {
                alert('لا يمكن لمدير الفرع حذف مدير النظام.');
                return;
            }
        }

        try {
            await db.collection('users').doc(id).delete();
            showSuccessNotification('تم حذف المستخدم بنجاح.');
            await loadData();
            renderUsers();
        } catch (e) {
            console.error("Error deleting user:", e);
            alert('فشل في حذف المستخدم: ' + e.message);
        }
    }

    // Delete function for Categories
    async function deleteCategory(id) {
        if (!confirm('هل أنت متأكد من حذف هذه الفئة؟')) return;
        try {
            await db.collection('categories').doc(id).delete();
            showSuccessNotification('تم حذف الفئة بنجاح.');
            await loadData();
            renderCategories();
        } catch (e) {
            console.error("Error deleting category:", e);
            alert('فشل في حذف الفئة: ' + e.message);
        }
    }

    // Order functions
    async function updateOrderStatus(orderId, newStatus) {
        try {
            await db.collection('orders').doc(orderId).update({ status: newStatus });
            showSuccessNotification('تم تحديث حالة الطلب بنجاح.');
            await loadData();
            renderOrders();
        } catch (e) {
            console.error("Error updating order status:", e);
            alert('فشل في تحديث حالة الطلب: ' + e.message);
        }
    }

    function showOrderDetail(orderId) {
        const order = orders.find(o => o.id === orderId);
        if (!order) return;
        const detailOrderIdEl = document.getElementById('detailOrderId');
        if (detailOrderIdEl) detailOrderIdEl.textContent = order.id;
        const detailCustomerNameEl = document.getElementById('detailCustomerName');
        if (detailCustomerNameEl) detailCustomerNameEl.textContent = ((order.customerName || order.customer_name || '') && (order.customerName || order.customer_name || '').trim()) || 'غير محدد';
        const detailCustomerPhoneEl = document.getElementById('detailCustomerPhone');
        if (detailCustomerPhoneEl) detailCustomerPhoneEl.textContent = ((order.customerPhone || order.customer_phone || '') && (order.customerPhone || order.customer_phone || '').trim()) || 'غير محدد';
        const detailCustomerAddressEl = document.getElementById('detailCustomerAddress');
        if (detailCustomerAddressEl) detailCustomerAddressEl.textContent = ((order.customerAddress || order.customer_address || '') && (order.customerAddress || order.customer_address || '').trim()) || 'غير محدد';
        const branch = branches.find(b => b.id === order.branchId);
    const detailBranchNameEl = document.getElementById('detailBranchName');
    if (detailBranchNameEl) detailBranchNameEl.textContent = branch ? branch.name : 'غير محدد';
        const detailOrderStatusEl = document.getElementById('detailOrderStatus');
        if (detailOrderStatusEl) {
            detailOrderStatusEl.textContent = translateStatus(order.status);
            detailOrderStatusEl.className = 'badge status-' + order.status.toLowerCase().replace(/\s/g, '-');
        }
        const detailTotalAmountEl = document.getElementById('detailTotalAmount');
        if (detailTotalAmountEl) detailTotalAmountEl.textContent = parseFloat(order.total).toFixed(2) + ' ج.م';
        const itemsList = document.getElementById('orderItemsList');
        if (itemsList) itemsList.innerHTML = (order.items || []).map(item => `<li>${item.name} - الكمية: ${item.quantity} - السعر: ${parseFloat(item.price).toFixed(2)} ج.م</li>`).join('');
        showModal(orderDetailModal, 'تفاصيل الطلب');
    }

    // =========================================================================
    // 6. تبديل الأقسام (Views) والأحداث
    // =========================================================================

    function showView(viewName) {
        viewSections.forEach(view => view.classList.add('hidden'));
        addButtons.forEach(btn => btn.classList.add('hidden'));

        const targetView = document.getElementById(viewName + '-view');
        if (targetView) {
            targetView.classList.remove('hidden');
            const navBtnEl = document.querySelector(`.nav-btn[data-view="${viewName}"]`);
            if (navBtnEl) currentViewTitle.textContent = navBtnEl.textContent.trim();
            currentView = viewName; 
        }

        const addButton = document.querySelector(`.add-btn[data-view-btn="${viewName}"]`);
        if (addButton) addButton.classList.remove('hidden');

        if (viewName === 'products') renderProducts();
        else if (viewName === 'orders') renderOrders();
        else if (viewName === 'reports') renderReports();
        else if (viewName === 'branches') renderBranches();
        else if (viewName === 'users') renderUsers();
        else if (viewName === 'categories') renderCategories();
        
        navButtons.forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`.nav-btn[data-view="${viewName}"]`);
        if (activeBtn) activeBtn.classList.add('active');
    }

    function attachEventListeners() {
        if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
        
        navButtons.forEach(btn => {
            btn.addEventListener('click', () => showView(btn.getAttribute('data-view')));
        });
        
        const addProductBtn = document.getElementById('addProductBtn');
        if (addProductBtn) addProductBtn.addEventListener('click', () => {
            showModal(productModal, 'إضافة منتج جديد');
            productForm.reset();
            document.getElementById('productId').value = '';
            populateCategorySelect();
            optionsList.innerHTML = '';
            productOptionsInput.value = '[]';
            additionsList.innerHTML = '';
            productAdditionsInput.value = '[]';
            populateBranchesList([]);
        });

        if (addOptionBtn) addOptionBtn.addEventListener('click', addOption);
        if (addAdditionBtn) addAdditionBtn.addEventListener('click', addAddition);
        if (selectAllBranchesBtn) selectAllBranchesBtn.addEventListener('click', selectAllBranches);
        if (clearAllBranchesBtn) clearAllBranchesBtn.addEventListener('click', clearAllBranches);

        if (document.getElementById('cancelProductBtn')) document.getElementById('cancelProductBtn').addEventListener('click', () => { hideModal(productModal); });
        if (productForm) productForm.addEventListener('submit', submitProduct);

        if (document.getElementById('addBranchBtn')) document.getElementById('addBranchBtn').addEventListener('click', () => { 
            showModal(branchModal, 'إضافة فرع جديد'); 
            branchForm.reset(); 
            document.getElementById('branchId').value = ''; 
        });
        if (cancelBranchBtn) cancelBranchBtn.addEventListener('click', () => { hideModal(branchModal); });
        if (branchForm) branchForm.addEventListener('submit', submitBranch);
        
        if (document.getElementById('addUserBtn')) document.getElementById('addUserBtn').addEventListener('click', () => {
            showModal(userModal, 'إضافة مستخدم جديد');
            userForm.reset();
            document.getElementById('userId').value = '';
            populateRoleSelect(null);
            populateBranchSelect(null);
            const userPasswordInput = document.getElementById('userPassword');
            if (userPasswordInput) userPasswordInput.closest('div').classList.remove('hidden');
            const userEmail = document.getElementById('userEmail');
            if (userEmail) userEmail.disabled = false;
        });
        if (cancelUserBtn) cancelUserBtn.addEventListener('click', () => { hideModal(userModal); });
        if (userForm) userForm.addEventListener('submit', submitUser);
        
        if (addCategoryBtn) addCategoryBtn.addEventListener('click', () => { 
            showModal(categoryModal, 'إضافة فئة جديدة'); 
            categoryForm.reset(); 
            categoryKeyInput.disabled = false; 
        });
        if (cancelCategoryBtn) cancelCategoryBtn.addEventListener('click', () => { hideModal(categoryModal); });
        if (categoryForm) categoryForm.addEventListener('submit', submitCategory);

        if (productSearch) productSearch.addEventListener('input', () => { renderProducts(); });
        if (orderSearch) orderSearch.addEventListener('input', () => { renderOrders(); });
        if (branchSearch) branchSearch.addEventListener('input', () => { renderBranches(); });
        if (userSearch) userSearch.addEventListener('input', () => { renderUsers(); });
        
        if (productFilterCategory) productFilterCategory.addEventListener('change', () => { renderProducts(); });
        if (orderFilterStatus) orderFilterStatus.addEventListener('change', () => { renderOrders(); });
        if (orderFilterBranch) orderFilterBranch.addEventListener('change', () => { renderOrders(); });

        // Refresh button for orders
        const refreshOrdersBtn = document.getElementById('refreshOrdersBtn');
        if (refreshOrdersBtn) {
            refreshOrdersBtn.addEventListener('click', async () => {
                refreshOrdersBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                refreshOrdersBtn.disabled = true;
                try {
                    await loadData();
                    renderOrders();
                    showSuccessNotification('تم تحديث قائمة الطلبات بنجاح');
                } catch (error) {
                    console.error('Refresh error:', error);
                    alert('فشل في تحديث الطلبات');
                } finally {
                    refreshOrdersBtn.innerHTML = '<i class="fas fa-sync-alt"></i>';
                    refreshOrdersBtn.disabled = false;
                }
            });
        }
        
        if (closeOrderDetailBtn) closeOrderDetailBtn.addEventListener('click', () => { hideModal(orderDetailModal); });
        
        if (generateReportsBtn) generateReportsBtn.addEventListener('click', () => {
            calculateTotalSales();
            calculateBestSellingProducts();
        });
    }

    async function handleLogout() {
        try {
            await auth.signOut();
            localStorage.clear(); 
            window.location.href = 'login.html';
        } catch (e) {
            console.error("Error signing out:", e);
            alert("فشل تسجيل الخروج.");
        }
    }

    // =========================================================================
    // 7. تشغيل التطبيق وتوفير الدوال عالمياً (Global Export) 
    // =========================================================================
    
    document.addEventListener('DOMContentLoaded', initializeApp);

    window.editProduct = editProduct;
    window.deleteProduct = deleteProduct;
    window.updateOrderStatus = updateOrderStatus;
    window.showOrderDetail = showOrderDetail;
    window.editCategory = editCategory;
    window.deleteCategory = deleteCategory;
    window.editBranch = editBranch;
    window.deleteBranch = deleteBranch;
    window.deleteUser = deleteUser;
    window.renderUsers = renderUsers;
    window.submitUser = submitUser;
    window.showView = showView;

    window.editUser = async (id) => {
        const doc = await db.collection('users').doc(id).get();
        const data = doc.data();
        
        document.getElementById('userId').value = id;
        document.getElementById('userName').value = data.name;
        document.getElementById('userEmail').value = data.email;
        document.getElementById('userEmail').disabled = true;
        document.getElementById('userRole').value = data.role;
        document.getElementById('userModal').classList.remove('hidden');
    };



    const newLocal = window.showView = (viewId) => {
        if (viewId === 'users' && currentUserRole === 'staff') {
            alert("⚠");
        }
    };

})();
