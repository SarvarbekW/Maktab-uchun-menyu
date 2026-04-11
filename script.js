// Asosiy ma'lumotlar
let currentUser = null;
let menuItems = [];
let orders = [];
let cart = [];

// Test ma'lumotlari
const testChef = {
    login: 'oshpaz',
    password: '12345',
    name: 'Ali Oshpaz'
};

let students = JSON.parse(localStorage.getItem('students')) || [];

// ========== TO'LIQ OVQATLAR VA ICHIMLIKLAR ==========
const initialMenuItems = [
    // ========== OVQATLAR (15 ta) ==========
    { id: 1, name: "🍕 Pitsa", description: "Margarita pitsa, pishloq va pomidor sousi bilan", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", price: 35000, readyTime: "20 daqiqa", grades: ["1-4", "5-8", "9-11"], type: "food", category: "food" },
    { id: 2, name: "🌯 Lavash", description: "Tovuqli lavash, yangi sabzavotlar va sous bilan", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", price: 22000, readyTime: "15 daqiqa", grades: ["1-4", "5-8", "9-11"], type: "food", category: "food" },
    { id: 3, name: "🍢 Shashlik", description: "Mol go'shtidan shashlik, piyoz va non bilan", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", price: 28000, readyTime: "25 daqiqa", grades: ["5-8", "9-11"], type: "food", category: "food" },
    { id: 4, name: "🍔 Gamburger", description: "Go'shtli gamburger, salat, pomidor va sous bilan", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", price: 25000, readyTime: "10 daqiqa", grades: ["1-4", "5-8", "9-11"], type: "food", category: "food" },
    { id: 5, name: "🌭 Hot-Dog", description: "Sosiskali hot-dog, ketçap va xantal bilan", image: "https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", price: 15000, readyTime: "5 daqiqa", grades: ["1-4", "5-8", "9-11"], type: "food", category: "food" },
    { id: 6, name: "🥙 Doner", description: "Tovuq doner, salat va souslar bilan", image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", price: 20000, readyTime: "8 daqiqa", grades: ["5-8", "9-11"], type: "food", category: "food" },
    { id: 7, name: "🍚 Osh", description: "To'y oshi, sabzi va go'sht bilan", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", price: 18000, readyTime: "30 daqiqa", grades: ["5-8", "9-11"], type: "food", category: "food" },
    { id: 8, name: "🥟 Manti", description: "Go'shtli manti, qaymoq va sirka bilan", image: "https://images.unsplash.com/photo-1563379091339-03246963d9d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", price: 22000, readyTime: "20 daqiqa", grades: ["9-11"], type: "food", category: "food" },
    { id: 9, name: "🥮 Somsa", description: "Go'shtli somsa, issiq xamir bilan", image: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", price: 8000, readyTime: "15 daqiqa", grades: ["1-4", "5-8", "9-11"], type: "food", category: "food" },
    { id: 10, name: "🍲 Sho'rva", description: "Go'shtli sho'rva, kartoshka va sabzavotlar bilan", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", price: 15000, readyTime: "25 daqiqa", grades: ["5-8", "9-11"], type: "food", category: "food" },
    { id: 11, name: "🥣 Mastava", description: "Go'shtli mastava, guruch va sabzavotlar bilan", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", price: 12000, readyTime: "20 daqiqa", grades: ["1-4", "5-8", "9-11"], type: "food", category: "food" },
    { id: 12, name: "🍗 Tovuq qanotlari", description: "Qovurilgan tovuq qanotlari, sous bilan", image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", price: 25000, readyTime: "18 daqiqa", grades: ["5-8", "9-11"], type: "food", category: "food" },
    { id: 13, name: "🍟 Qovurilgan kartoshka", description: "Qovurilgan kartoshka, souslar bilan", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", price: 10000, readyTime: "10 daqiqa", grades: ["1-4", "5-8", "9-11"], type: "food", category: "food" },
    { id: 14, name: "🥗 Salat", description: "Yangi sabzavotlar salati", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", price: 12000, readyTime: "10 daqiqa", grades: ["5-8", "9-11"], type: "food", category: "food" },
    { id: 15, name: "🍖 Qozon kabob", description: "Qozonda tayyorlangan kabob, piyoz bilan", image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", price: 28000, readyTime: "30 daqiqa", grades: ["9-11"], type: "food", category: "food" },
    
    // ========== ICHIMLIKLAR (12 ta) ==========
    { id: 101, name: "🥤 Coca-Cola", description: "Sovuq Coca-Cola (0.5L)", image: "https://images.unsplash.com/photo-1561758033-7e924f619b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", price: 7000, readyTime: "Har doim tayyor", grades: ["1-4", "5-8", "9-11"], type: "drink", category: "drink" },
    { id: 102, name: "🍊 Fanta", description: "Apelsinli Fanta (0.5L)", image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", price: 7000, readyTime: "Har doim tayyor", grades: ["1-4", "5-8", "9-11"], type: "drink", category: "drink" },
    { id: 103, name: "🍋 Sprite", description: "Limonli Sprite (0.5L)", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", price: 7000, readyTime: "Har doim tayyor", grades: ["1-4", "5-8", "9-11"], type: "drink", category: "drink" },
    { id: 104, name: "🥤 Pepsi", description: "Sovuq Pepsi (0.5L)", image: "https://images.unsplash.com/photo-1629203850906-1bb5b0e4b0a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", price: 6500, readyTime: "Har doim tayyor", grades: ["1-4", "5-8", "9-11"], type: "drink", category: "drink" },
    { id: 105, name: "☕ Kofe", description: "Qora kofe, shakar bilan", image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", price: 6000, readyTime: "5 daqiqa", grades: ["9-11"], type: "drink", category: "drink" },
    { id: 106, name: "🍵 Choy (Qora)", description: "Qora choy, shakar bilan", image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", price: 3000, readyTime: "Har doim tayyor", grades: ["1-4", "5-8", "9-11"], type: "drink", category: "drink" },
    { id: 107, name: "🍵 Choy (Yashil)", description: "Yashil choy, limon bilan", image: "https://images.unsplash.com/photo-1597481499751-6d6c1c5d7b3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", price: 4000, readyTime: "Har doim tayyor", grades: ["1-4", "5-8", "9-11"], type: "drink", category: "drink" },
    { id: 108, name: "🍹 Kompot", description: "Mevali kompot, tabiiy shirinlik", image: "https://images.unsplash.com/photo-1475938476802-32a7e851dad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", price: 5000, readyTime: "Har doim tayyor", grades: ["1-4", "5-8", "9-11"], type: "drink", category: "drink" },
    { id: 109, name: "🧃 Sok (Olma)", description: "Tabiiy olma sharbati (0.3L)", image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", price: 6000, readyTime: "Har doim tayyor", grades: ["1-4", "5-8", "9-11"], type: "drink", category: "drink" },
    { id: 110, name: "🧃 Sok (Apelsin)", description: "Tabiiy apelsin sharbati (0.3L)", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", price: 6000, readyTime: "Har doim tayyor", grades: ["1-4", "5-8", "9-11"], type: "drink", category: "drink" },
    { id: 111, name: "🥛 Ayron", description: "Sovuq ayron, tuz bilan", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", price: 5000, readyTime: "Har doim tayyor", grades: ["1-4", "5-8", "9-11"], type: "drink", category: "drink" },
    { id: 112, name: "💧 Suv (0.5L)", description: "Toza suv (0.5 litr)", image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", price: 2000, readyTime: "Har doim tayyor", grades: ["1-4", "5-8", "9-11"], type: "drink", category: "drink" }
];


// Sahifa yuklanganda
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadDataFromLocalStorage();
    updateClock();
    setupEventListeners();
    checkPreviousSession();
}

function loadDataFromLocalStorage() {
    try {
        menuItems = JSON.parse(localStorage.getItem('menuItems')) || initialMenuItems;
        if (!localStorage.getItem('menuItems')) {
            localStorage.setItem('menuItems', JSON.stringify(initialMenuItems));
        }
        orders = JSON.parse(localStorage.getItem('orders')) || [];
        students = JSON.parse(localStorage.getItem('students')) || [];
        cart = JSON.parse(localStorage.getItem('cart')) || [];
    } catch (error) {
        console.error('Ma\'lumotlarni yuklashda xato:', error);
        menuItems = initialMenuItems;
        orders = [];
        students = [];
        cart = [];
    }
}

function updateClock() {
    try {
        const now = new Date();
        const time = now.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
        const date = now.toLocaleDateString('uz-UZ', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        
        const chefTimeElement = document.getElementById('chefTime');
        if (chefTimeElement) chefTimeElement.textContent = time;
        
        const currentDateElement = document.getElementById('currentDate');
        if (currentDateElement) currentDateElement.textContent = date;
        
        setTimeout(updateClock, 60000);
    } catch (error) {
        console.error('Soatni yangilashda xato:', error);
    }
}

function setupEventListeners() {
    document.getElementById('studentLoginForm').addEventListener('submit', handleStudentLogin);
    document.getElementById('studentRegisterForm').addEventListener('submit', handleStudentRegister);
    document.getElementById('chefLoginForm').addEventListener('submit', handleChefLogin);
    document.getElementById('studentLogout').addEventListener('click', logout);
    document.getElementById('chefLogout').addEventListener('click', logout);
    
    document.getElementById('showStudentRegister').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('studentLoginForm').classList.add('hidden');
        document.getElementById('studentRegisterForm').classList.remove('hidden');
    });
    
    document.getElementById('showStudentLogin').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('studentRegisterForm').classList.add('hidden');
        document.getElementById('studentLoginForm').classList.remove('hidden');
    });
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterMenuByCategory(this.getAttribute('data-category'));
        });
    });
    
    document.getElementById('placeOrderBtn').addEventListener('click', placeOrder);
    document.getElementById('clearCartBtn').addEventListener('click', clearCart);
}

function handleStudentLogin(e) {
    e.preventDefault();
    const login = document.getElementById('studentLogin').value.trim();
    const password = document.getElementById('studentPassword').value;
    
    const student = students.find(s => s.name === login && s.password === password);
    
    if (student) {
        currentUser = { type: 'student', name: student.name, grade: student.grade };
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
    
    students.push({ name, password, grade });
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
        currentUser = { type: 'chef', name: testChef.name };
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

function showAuthSection() {
    document.getElementById('authSection').classList.remove('hidden');
    document.getElementById('studentDashboard').classList.add('hidden');
    document.getElementById('chefDashboard').classList.add('hidden');
}

function showStudentDashboard() {
    document.getElementById('authSection').classList.add('hidden');
    document.getElementById('studentDashboard').classList.remove('hidden');
    document.getElementById('chefDashboard').classList.add('hidden');
    
    document.getElementById('studentName').textContent = currentUser.name;
    document.getElementById('studentClass').textContent = currentUser.grade;
    
    loadMenuItems();
    updateSelectedItemsDisplay();
    loadStudentOrders();
}

function showChefDashboard() {
    document.getElementById('authSection').classList.add('hidden');
    document.getElementById('studentDashboard').classList.add('hidden');
    document.getElementById('chefDashboard').classList.remove('hidden');
    
    document.getElementById('chefName').textContent = currentUser.name;
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

function loadMenuItems() {
    const menuContainer = document.getElementById('menuItems');
    if (!menuContainer || !currentUser || !currentUser.grade) return;
    
    const studentGrade = currentUser.grade;
    const filteredItems = menuItems.filter(item => item.grades.includes(studentGrade));
    
    menuContainer.innerHTML = '';
    
    if (filteredItems.length === 0) {
        menuContainer.innerHTML = `<div class="empty-state"><i class="fas fa-utensils"></i><p>Bugun menyu mavjud emas</p></div>`;
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
                    <div>${item.type === 'food' ? '<i class="fas fa-utensils"></i> Ovqat' : '<i class="fas fa-wine-glass"></i> Ichimlik'}</div>
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
    
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = parseInt(this.getAttribute('data-id'));
            updateCart(itemId, this.classList.contains('minus'));
        });
    });
}

function filterMenuByCategory(category) {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        if (category === 'all') {
            item.style.display = 'block';
        } else if (category === 'food') {
            item.style.display = item.getAttribute('data-type') === 'food' ? 'block' : 'none';
        } else if (category === 'drink') {
            item.style.display = item.getAttribute('data-type') === 'drink' ? 'block' : 'none';
        }
    });
}

function updateCart(itemId, isMinus = false) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;
    
    const cartIndex = cart.findIndex(ci => ci.id === itemId);
    
    if (cartIndex === -1) {
        if (!isMinus) {
            cart.push({ id: itemId, name: item.name, price: item.price, quantity: 1 });
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
        if (minusBtn) minusBtn.disabled = quantity === 0;
    }
}

function updateSelectedItemsDisplay() {
    const selectedItemsList = document.getElementById('selectedItemsList');
    const cartTotal = document.getElementById('cartTotal');
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    
    if (!selectedItemsList || !cartTotal || !placeOrderBtn) return;
    
    if (cart.length === 0) {
        selectedItemsList.innerHTML = `<div class="empty-state"><i class="fas fa-shopping-cart"></i><p>Savat bo'sh</p><small>Menyudan mahsulot tanlang</small></div>`;
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
    
    document.querySelectorAll('.remove-item-btn').forEach(btn => {
        btn.addEventListener('click', function() {
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
        menuItems.forEach(item => updateQuantityDisplay(item.id));
        updateSelectedItemsDisplay();
        showNotification('Savat tozalandi', 'success');
    }
}

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
    
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    menuItems.forEach(item => updateQuantityDisplay(item.id));
    updateSelectedItemsDisplay();
    
    showNotification(`Buyurtmangiz qabul qilindi! Jami: ${totalAmount.toLocaleString()} so'm`, 'success');
    loadStudentOrders();
}

function updateOrderStatus(orderId, status) {
    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex !== -1) {
        orders[orderIndex].status = status;
        localStorage.setItem('orders', JSON.stringify(orders));
        
        if (status === 'Tayyor') {
            showNotification(`Buyurtma #${orderId} tayyor!`, 'info');
        }
        
        loadStudentOrders();
        loadChefOrders();
    }
}

function loadStudentOrders() {
    const ordersContainer = document.getElementById('studentOrders');
    if (!ordersContainer) return;
    
    const studentOrders = orders.filter(order => order.studentName === currentUser.name);
    
    if (studentOrders.length === 0) {
        ordersContainer.innerHTML = `<div class="empty-state"><i class="fas fa-clipboard-list"></i><p>Hali buyurtma bermagansiz</p></div>`;
        return;
    }
    
    ordersContainer.innerHTML = '';
    [...studentOrders].reverse().forEach(order => {
        const itemsText = order.items.map(item => `${item.name} (${item.quantity} x ${item.price.toLocaleString()} so'm)`).join(', ');
        
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';
        orderCard.innerHTML = `
            <div class="order-header">
                <div class="order-student">Buyurtma #${order.id}</div>
                <div class="status-${order.status.toLowerCase()}">${order.status}</div>
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
        ordersContainer.innerHTML = `<div class="empty-state"><i class="fas fa-check-circle"></i><p>Hozircha yangi buyurtmalar yo'q</p></div>`;
        return;
    }
    
    ordersContainer.innerHTML = '';
    [...orders].reverse().forEach(order => {
        const itemsText = order.items.map(item => `${item.name} (${item.quantity} ta)`).join(', ');
        
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
            <div class="order-status"><span class="status-${order.status.toLowerCase()}">${order.status}</span></div>
            <div class="order-actions">
                ${order.status === 'Yangi' ? `<button class="btn btn-sm btn-secondary" onclick="updateOrderStatus(${order.id}, 'Tayyorlanmoqda')">Tayyorlanmoqda</button>` : ''}
                ${order.status === 'Tayyorlanmoqda' ? `<button class="btn btn-sm btn-success" onclick="updateOrderStatus(${order.id}, 'Tayyor')">Tayyor</button>` : ''}
            </div>
        `;
        ordersContainer.appendChild(orderCard);
    });
}

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    if (!notification) return;
    
    const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle';
    notification.innerHTML = `<i class="fas fa-${icon}"></i> ${message}`;
    notification.className = `notification ${type}`;
    notification.classList.remove('hidden');
    
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

// Global funksiyalar
window.updateOrderStatus = updateOrderStatus;