// Asosiy ma'lumotlar
let currentUser = null;
let menuItems = []; // Hozircha bo'sh
let orders = [];
let cart = [];

// Test ma'lumotlari
const testChef = {
    login: 'oshpaz',
    password: '12345',
    name: 'Sarvar Oshpaz'
};

// O'quvchilar ro'yxati
let students = JSON.parse(localStorage.getItem('students')) || [];

// Sahifa yuklanganda
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

// Dastlabki sozlash
function initializeApp() {
    loadDataFromLocalStorage();
    updateClock();
    setupEventListeners();
    checkPreviousSession();
}

// Ma'lumotlarni yuklash
function loadDataFromLocalStorage() {
    try {
        // Menyu elementlari
        menuItems = JSON.parse(localStorage.getItem('menuItems')) || [];

        // Boshqa ma'lumotlar
        orders = JSON.parse(localStorage.getItem('orders')) || [];
        students = JSON.parse(localStorage.getItem('students')) || [];
        cart = JSON.parse(localStorage.getItem('cart')) || [];
    } catch (error) {
        console.error('Ma\'lumotlarni yuklashda xato:', error);
        menuItems = [];
        orders = [];
        students = [];
        cart = [];
    }
}

// Soatni yangilash
function updateClock() {
    try {
        const now = new Date();
        const time = now.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
        const date = now.toLocaleDateString('uz-UZ', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        // Oshpaz paneli uchun vaqt
        const chefTimeElement = document.getElementById('chefTime');
        if (chefTimeElement) chefTimeElement.textContent = time;

        // O'quvchi paneli uchun sana
        const currentDateElement = document.getElementById('currentDate');
        if (currentDateElement) currentDateElement.textContent = date;

        setTimeout(updateClock, 60000);
    } catch (error) {
        console.error('Soatni yangilashda xato:', error);
    }
}

// Event listenerlarni sozlash
function setupEventListeners() {
    // O'quvchi kirish
    const studentLoginForm = document.getElementById('studentLoginForm');
    if (studentLoginForm) {
        studentLoginForm.addEventListener('submit', handleStudentLogin);
    }

    // O'quvchi ro'yxatdan o'tish
    const studentRegisterForm = document.getElementById('studentRegisterForm');
    if (studentRegisterForm) {
        studentRegisterForm.addEventListener('submit', handleStudentRegister);
    }

    // Oshpaz kirish
    const chefLoginForm = document.getElementById('chefLoginForm');
    if (chefLoginForm) {
        chefLoginForm.addEventListener('submit', handleChefLogin);
    }

    // Chiqish
    const studentLogout = document.getElementById('studentLogout');
    if (studentLogout) {
        studentLogout.addEventListener('click', logout);
    }

    const chefLogout = document.getElementById('chefLogout');
    if (chefLogout) {
        chefLogout.addEventListener('click', logout);
    }

    // Formalar orasida o'tish
    const showStudentRegister = document.getElementById('showStudentRegister');
    if (showStudentRegister) {
        showStudentRegister.addEventListener('click', function (e) {
            e.preventDefault();
            document.getElementById('studentLoginForm').classList.add('hidden');
            document.getElementById('studentRegisterForm').classList.remove('hidden');
        });
    }

    const showStudentLogin = document.getElementById('showStudentLogin');
    if (showStudentLogin) {
        showStudentLogin.addEventListener('click', function (e) {
            e.preventDefault();
            document.getElementById('studentRegisterForm').classList.add('hidden');
            document.getElementById('studentLoginForm').classList.remove('hidden');
        });
    }

    // Filter tugmalari
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const category = this.getAttribute('data-category');
            filterMenuByCategory(category);
        });
    });

    // Buyurtma berish va tozalash
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', placeOrder);
    }

    const clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
}

// ========== AUTH FUNCTIONS ==========

function handleStudentLogin(e) {
    e.preventDefault();
    const login = document.getElementById('studentLogin').value.trim();
    const password = document.getElementById('studentPassword').value;

    const student = students.find(s => s.name === login && s.password === password);

    if (student) {
        currentUser = {
            type: 'student',
            name: student.name,
            grade: student.grade
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showStudentDashboard();
        showNotification('Muvaffaqiyatli kirdingiz!', 'success');
    } else {
        showNotification('Login yoki parol noto\'g\'ri!', 'error');
    }
}

function handleStudentRegister(e) {
    e.preventDefault();
    const name = document.getElementById('studentRegName').value.trim();
    const password = document.getElementById('studentRegPassword').value;
    const grade = document.getElementById('studentRegGrade').value;

    if (!name || !password || !grade) {
        showNotification('Barcha maydonlarni to\'ldiring!', 'error');
        return;
    }

    if (students.find(s => s.name === name)) {
        showNotification('Bu ism bilan allaqachon ro\'yxatdan o\'tilgan!', 'error');
        return;
    }

    const newStudent = {
        name: name,
        password: password,
        grade: grade
    };
    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));

    showNotification('Muvaffaqiyatli ro\'yxatdan o\'tdingiz!', 'success');

    document.getElementById('studentRegisterForm').classList.add('hidden');
    document.getElementById('studentLoginForm').classList.remove('hidden');
    document.getElementById('studentLogin').value = name;
    document.getElementById('studentPassword').value = '';
}

function handleChefLogin(e) {
    e.preventDefault();
    const login = document.getElementById('chefLogin').value.trim();
    const password = document.getElementById('chefPassword').value;

    if (login === testChef.login && password === testChef.password) {
        currentUser = {
            type: 'chef',
            name: testChef.name
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showChefDashboard();
        showNotification('Oshpaz paneliga xush kelibsiz!', 'success');
    } else {
        showNotification('Login yoki parol noto\'g\'ri!', 'error');
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showAuthSection();
    showNotification('Tizimdan chiqdingiz', 'success');
}

// ========== DASHBOARD FUNCTIONS ==========

function showAuthSection() {
    document.getElementById('authSection').classList.remove('hidden');
    document.getElementById('studentDashboard').classList.add('hidden');
    document.getElementById('chefDashboard').classList.add('hidden');

    // Formalar tozalash
    document.getElementById('studentLoginForm').reset();
    document.getElementById('studentRegisterForm').reset();
    document.getElementById('chefLoginForm').reset();
}

function showStudentDashboard() {
    document.getElementById('authSection').classList.add('hidden');
    document.getElementById('studentDashboard').classList.remove('hidden');
    document.getElementById('chefDashboard').classList.add('hidden');

    // Foydalanuvchi ma'lumotlari
    document.getElementById('studentName').textContent = currentUser.name;
    document.getElementById('studentClass').textContent = currentUser.grade;

    // Menyu va savatni yuklash
    loadMenuItems();
    updateSelectedItemsDisplay();
    loadStudentOrders();
}

function showChefDashboard() {
    document.getElementById('authSection').classList.add('hidden');
    document.getElementById('studentDashboard').classList.add('hidden');
    document.getElementById('chefDashboard').classList.remove('hidden');

    // Oshpaz ma'lumotlari
    document.getElementById('chefName').textContent = currentUser.name;

    // Buyurtmalarni yuklash
    loadChefOrders();
}

function checkPreviousSession() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        if (currentUser.type === 'student') {
            showStudentDashboard();
        } else if (currentUser.type === 'chef') {
            showChefDashboard();
        }
    }
}

// ========== MENYU FUNCTIONS ==========

function loadMenuItems() {
    const menuContainer = document.getElementById('menuItems');
    if (!menuContainer || !currentUser || !currentUser.grade) return;

    const studentGrade = currentUser.grade;

    // Faqat o'quvchi sinfiga mos mahsulotlarni ko'rsatish
    const filteredItems = menuItems.filter(item => item.grades.includes(studentGrade));

    menuContainer.innerHTML = '';

    if (filteredItems.length === 0) {
        menuContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-utensils"></i>
                <p>Menyuda mahsulotlar yo'q</p>
                <small>Administrator menyuni to'ldiradi</small>
            </div>
        `;
        return;
    }

    filteredItems.forEach(item => {
        const cartItem = cart.find(ci => ci.id === item.id);
        const quantity = cartItem ? cartItem.quantity : 0;

        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.setAttribute('data-category', item.category);
        menuItem.setAttribute('data-type', item.type);

        menuItem.innerHTML = `
            <div class="menu-image" style="background-image: url('${item.image}')"></div>
            <div class="menu-content">
                <div class="menu-title">
                    <span class="menu-name">${item.name}</span>
                    <span class="menu-price">${item.price.toLocaleString()} so'm</span>
                </div>
                <p class="menu-description">${item.description}</p>
                <div class="menu-details">
                    <div><i class="far fa-clock"></i> ${item.readyTime}</div>
                    <div>
                        ${item.type === 'food' ?
                '<i class="fas fa-utensils"></i> Ovqat' :
                '<i class="fas fa-wine-glass"></i> Ichimlik'
            }
                    </div>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn minus" data-id="${item.id}" ${quantity === 0 ? 'disabled' : ''}>
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity-display" id="quantity-${item.id}">${quantity}</span>
                    <button class="quantity-btn" data-id="${item.id}">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        `;

        menuContainer.appendChild(menuItem);
    });

    // Miqdor tugmalari
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const itemId = parseInt(this.getAttribute('data-id'));
            const isMinus = this.classList.contains('minus');
            updateCart(itemId, isMinus);
        });
    });
}

function filterMenuByCategory(category) {
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        if (category === 'all') {
            // Barchasini ko'rsatish
            item.style.display = 'block';
        } else if (category === 'food') {
            // Faqat ovqatlarni ko'rsatish
            const itemType = item.getAttribute('data-type');
            item.style.display = itemType === 'food' ? 'block' : 'none';
        } else if (category === 'drink') {
            // Faqat ichimliklarni ko'rsatish
            const itemType = item.getAttribute('data-type');
            item.style.display = itemType === 'drink' ? 'block' : 'none';
        }
    });
}

// ========== CART FUNCTIONS ==========

function updateCart(itemId, isMinus = false) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    const cartIndex = cart.findIndex(ci => ci.id === itemId);

    if (cartIndex === -1) {
        if (!isMinus) {
            cart.push({
                id: itemId,
                name: item.name,
                price: item.price,
                quantity: 1
            });
        }
    } else {
        if (isMinus) {
            if (cart[cartIndex].quantity > 1) {
                cart[cartIndex].quantity--;
            } else {
                cart.splice(cartIndex, 1);
            }
        } else {
            cart[cartIndex].quantity++;
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateQuantityDisplay(itemId);
    updateSelectedItemsDisplay();
}

function updateQuantityDisplay(itemId) {
    const quantityDisplay = document.getElementById(`quantity-${itemId}`);
    if (quantityDisplay) {
        const cartItem = cart.find(ci => ci.id === itemId);
        const quantity = cartItem ? cartItem.quantity : 0;
        quantityDisplay.textContent = quantity;

        const minusBtn = quantityDisplay.previousElementSibling;
        if (minusBtn) {
            minusBtn.disabled = quantity === 0;
        }
    }
}

function updateSelectedItemsDisplay() {
    const selectedItemsList = document.getElementById('selectedItemsList');
    const cartTotal = document.getElementById('cartTotal');
    const placeOrderBtn = document.getElementById('placeOrderBtn');

    if (!selectedItemsList || !cartTotal || !placeOrderBtn) return;

    if (cart.length === 0) {
        selectedItemsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-shopping-cart"></i>
                <p>Savat bo'sh</p>
                <small>Menyudan mahsulot tanlang</small>
            </div>
        `;
        cartTotal.textContent = '0 so\'m';
        placeOrderBtn.disabled = true;
        return;
    }

    let total = 0;
    let itemsHTML = '';

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        itemsHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <p>${item.quantity} x ${item.price.toLocaleString()} so'm = ${itemTotal.toLocaleString()} so'm</p>
                </div>
                <button class="btn btn-sm btn-danger remove-item-btn" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    });

    selectedItemsList.innerHTML = itemsHTML;
    cartTotal.textContent = `${total.toLocaleString()} so'm`;
    placeOrderBtn.disabled = false;

    // O'chirish tugmalari
    document.querySelectorAll('.remove-item-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const itemId = parseInt(this.getAttribute('data-id'));
            removeItemFromCart(itemId);
        });
    });
}

function removeItemFromCart(itemId) {
    const cartIndex = cart.findIndex(ci => ci.id === itemId);
    if (cartIndex !== -1) {
        cart.splice(cartIndex, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateQuantityDisplay(itemId);
        updateSelectedItemsDisplay();
    }
}

function clearCart() {
    if (cart.length === 0) {
        showNotification('Savat bo\'sh!', 'error');
        return;
    }

    if (confirm('Savatdagi barcha mahsulotlarni o\'chirishni istaysizmi?')) {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));

        // Barcha miqdor ko'rsatgichlarini yangilash
        menuItems.forEach(item => {
            updateQuantityDisplay(item.id);
        });

        updateSelectedItemsDisplay();
        showNotification('Savat tozalandi', 'success');
    }
}

// ========== ORDER FUNCTIONS ==========

function placeOrder() {
    if (cart.length === 0) {
        showNotification('Savat bo\'sh! Mahsulot tanlang', 'error');
        return;
    }

    const orderItems = cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity
    }));

    const totalAmount = orderItems.reduce((sum, item) => sum + item.total, 0);

    const newOrder = {
        id: Date.now(),
        studentName: currentUser.name,
        studentGrade: currentUser.grade,
        items: orderItems,
        totalAmount: totalAmount,
        orderTime: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
        orderDate: new Date().toLocaleDateString('uz-UZ'),
        status: 'Yangi'
    };

    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Savatni tozalash
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));

    // Ko'rinishlarni yangilash
    menuItems.forEach(item => {
        updateQuantityDisplay(item.id);
    });

    updateSelectedItemsDisplay();

    showNotification(`Buyurtmangiz qabul qilindi! Jami: ${totalAmount.toLocaleString()} so'm`, 'success');

    loadStudentOrders();
}

// Buyurtma holatini o'zgartirish
function updateOrderStatus(orderId, status) {
    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex !== -1) {
        orders[orderIndex].status = status;
        localStorage.setItem('orders', JSON.stringify(orders));

        // Agar buyurtma tayyor bo'lsa
        if (status === 'Tayyor') {
            const order = orders[orderIndex];
            showNotification(`Buyurtma #${orderId} tayyor! ${order.studentName} ga xabar yuborildi.`, 'info');
        }

        // Ko'rinishlarni yangilash
        loadStudentOrders();
        loadChefOrders();
    }
}

function loadStudentOrders() {
    const ordersContainer = document.getElementById('studentOrders');
    if (!ordersContainer) return;

    const studentOrders = orders.filter(order => order.studentName === currentUser.name);

    if (studentOrders.length === 0) {
        ordersContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard-list"></i>
                <p>Hali buyurtma bermagansiz</p>
            </div>
        `;
        return;
    }

    ordersContainer.innerHTML = '';
    [...studentOrders].reverse().forEach(order => {
        const itemsText = order.items.map(item =>
            `${item.name} (${item.quantity} x ${item.price.toLocaleString()} so'm)`
        ).join(', ');

        // Status badge
        let statusClass = '';
        if (order.status === 'Yangi') {
            statusClass = 'status-new';
        } else if (order.status === 'Tayyorlanmoqda') {
            statusClass = 'status-preparing';
        } else if (order.status === 'Tayyor') {
            statusClass = 'status-ready';
        }

        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';
        orderCard.innerHTML = `
            <div class="order-header">
                <div class="order-student">Buyurtma #${order.id}</div>
                <div class="${statusClass}">${order.status}</div>
            </div>
            <div class="order-items">${itemsText}</div>
            <div class="order-items">Jami: ${order.totalAmount.toLocaleString()} so'm</div>
            <div class="order-time">${order.orderDate} ${order.orderTime}</div>
        `;

        ordersContainer.appendChild(orderCard);
    });
}

function loadChefOrders() {
    const ordersContainer = document.getElementById('chefOrders');
    if (!ordersContainer) return;

    if (orders.length === 0) {
        ordersContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-check-circle"></i>
                <p>Hozircha yangi buyurtmalar yo'q</p>
            </div>
        `;
        return;
    }

    ordersContainer.innerHTML = '';
    [...orders].reverse().forEach(order => {
        const itemsText = order.items.map(item =>
            `${item.name} (${item.quantity} ta)`
        ).join(', ');

        // Status badge
        let statusClass = '';
        if (order.status === 'Yangi') {
            statusClass = 'status-new';
        } else if (order.status === 'Tayyorlanmoqda') {
            statusClass = 'status-preparing';
        } else if (order.status === 'Tayyor') {
            statusClass = 'status-ready';
        }

        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';
        orderCard.innerHTML = `
            <div class="order-header">
                <div class="order-student">${order.studentName}</div>
                <div class="order-grade">${order.studentGrade} sinf</div>
            </div>
            <div class="order-items">${itemsText}</div>
            <div class="order-items">Jami: ${order.totalAmount.toLocaleString()} so'm</div>
            <div class="order-time">${order.orderDate} ${order.orderTime}</div>
            <div class="order-status">
                <span class="${statusClass}">${order.status}</span>
            </div>
            <div class="order-actions">
                ${order.status === 'Yangi' ? `
                    <button class="btn btn-sm btn-secondary" onclick="updateOrderStatus(${order.id}, 'Tayyorlanmoqda')">
                        Tayyorlanmoqda
                    </button>
                ` : ''}
                ${order.status === 'Tayyorlanmoqda' ? `
                    <button class="btn btn-sm btn-success" onclick="updateOrderStatus(${order.id}, 'Tayyor')">
                        Tayyor
                    </button>
                ` : ''}
            </div>
        `;

        ordersContainer.appendChild(orderCard);
    });
}

// ========== UTILITY FUNCTIONS ==========

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    if (!notification) return;

    const icon = type === 'success' ? 'check-circle' :
        type === 'error' ? 'exclamation-circle' : 'info-circle';

    notification.innerHTML = `<i class="fas fa-${icon}"></i> ${message}`;
    notification.className = `notification ${type}`;
    notification.classList.remove('hidden');

    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

// ========== MENYUGA QO'SHISH FUNKSIYALARI ==========

// 1. Yangi OVQAT qo'shish
function addNewFoodItem(foodItem) {
    // Yangi ID generatsiya qilish
    const maxId = menuItems.length > 0 ? Math.max(...menuItems.map(item => item.id)) : 0;
    const newId = maxId + 1;

    const newFood = {
        id: newId,
        ...foodItem,
        type: "food",
        category: "food"
    };

    menuItems.push(newFood);
    localStorage.setItem('menuItems', JSON.stringify(menuItems));

    // Agar o'quvchi panelida bo'lsa, menyuni yangilash
    if (currentUser && currentUser.type === 'student') {
        loadMenuItems();
    }

    return newFood;
}

// 2. Yangi ICHIMLIK qo'shish
function addNewDrinkItem(drinkItem) {
    // Yangi ID generatsiya qilish
    const maxId = menuItems.length > 0 ? Math.max(...menuItems.map(item => item.id)) : 0;
    const newId = maxId + 1;

    const newDrink = {
        id: newId,
        ...drinkItem,
        type: "drink",
        category: "drink"
    };

    menuItems.push(newDrink);
    localStorage.setItem('menuItems', JSON.stringify(menuItems));

    // Agar o'quvchi panelida bo'lsa, menyuni yangilash
    if (currentUser && currentUser.type === 'student') {
        loadMenuItems();
    }

    return newDrink;
}

// 3. Menyudan mahsulot o'chirish
function removeMenuItem(itemId) {
    const itemIndex = menuItems.findIndex(item => item.id === itemId);
    if (itemIndex === -1) return false;

    menuItems.splice(itemIndex, 1);
    localStorage.setItem('menuItems', JSON.stringify(menuItems));

    // Agar o'quvchi panelida bo'lsa, menyuni yangilash
    if (currentUser && currentUser.type === 'student') {
        loadMenuItems();
    }

    return true;
}

// Global qilish
// window.updateOrderStatus = updateOrderStatus;
// window.addNewFoodItem = addNewFoodItem;
// window.addNewDrinkItem = addNewDrinkItem;
// window.removeMenuItem = removeMenuItem;