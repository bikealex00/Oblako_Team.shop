// 1. Список товаров
const products = [
    { id: 1, name: 'Cloud Hoodie', price: 4500, img: '☁️' },
    { id: 2, name: 'Oblako T-Shirt', price: 2200, img: '👕' },
    { id: 3, name: 'Admin Cap', price: 1500, img: '🧢' },
    { id: 4, name: 'Dev Backpack', price: 6800, img: '🎒' }
];

let cart = JSON.parse(localStorage.getItem('oblakoteam_cart')) || [];

// 2. Функция отрисовки товаров на главной
function displayProducts() {
    const container = document.getElementById('products-grid');
    if(!container) return;
    
    container.innerHTML = products.map(product => `
        <div class="card">
            <div class="card-img">${product.img}</div>
            <h3>${product.name}</h3>
            <p>Цена: ${product.price} ₽</p>
            <button class="btn-add" onclick="addToCart(${product.id})">В корзину</button>
        </div>
    `).join('');
}

// 3. Добавление в корзину
window.addToCart = (id) => {
    const item = products.find(p => p.id === id);
    cart.push(item);
    updateCart();
    alert(`${item.name} добавлен в корзину!`);
};

// 4. Обновление корзины
function updateCart() {
    localStorage.setItem('oblakoteam_cart', JSON.stringify(cart));
    const cartCount = document.getElementById('cart-count');
    if(cartCount) cartCount.innerText = cart.length;
    renderCartItems();
}

function renderCartItems() {
    const list = document.getElementById('cart-items-list');
    const totalEl = document.getElementById('cart-total-price');
    
    list.innerHTML = cart.map((item, index) => `
        <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
            <span>${item.name}</span>
            <b>${item.price} ₽</b>
            <button onclick="removeFromCart(${index})" style="color:red; border:none; background:none; cursor:pointer;">✕</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalEl.innerText = total + ' ₽';
}

window.removeFromCart = (index) => {
    cart.splice(index, 1);
    updateCart();
};

// Переключатель корзины
window.toggleCart = () => {
    document.getElementById('cart-sidebar').classList.toggle('active');
};

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCart();
});
