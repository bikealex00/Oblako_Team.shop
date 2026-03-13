const products = [
    { id: 1, name: 'Чаша Oblako Phunnel M Stone', price: 490, cat: 'Чаши', img: '🏺' },
    { id: 2, name: 'Кальян Amy Deluxe SS', price: 3100, cat: 'Кальяны', img: '💨' },
    { id: 3, name: 'Колба для кальяна Craft', price: 600, cat: 'Колбы', img: '⚱️' },
    { id: 4, name: 'Щипцы для угля Blade', price: 380, cat: 'Аксессуары', img: '✂️' },
    { id: 5, name: 'Шило Oblako Limited', price: 200, cat: 'Аксессуары', img: '📍' },
    { id: 6, name: 'Силиконовый шланг Soft Touch', price: 250, cat: 'Аксессуары', img: '🐍' }
];

let cart = JSON.parse(localStorage.getItem('oblakoteam_cart')) || [];

function render(items = products) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = items.map(p => `
        <div class="card">
            <div class="card-img">${p.img}</div>
            <p style="color:#888; font-size:12px; margin:0;">${p.cat}</p>
            <h3>${p.name}</h3>
            <span class="price">${p.price} ₴</span>
            <button class="buy-btn" onclick="addToCart(${p.id})">Купить</button>
        </div>
    `).join('');
}

window.filterCat = (cat) => {
    if (cat === 'Все') render(products);
    else render(products.filter(p => p.cat === cat));
};

window.addToCart = (id) => {
    const p = products.find(x => x.id === id);
    cart.push(p);
    updateCart();
};

window.toggleCart = () => {
    document.getElementById('cart-sidebar').classList.toggle('active');
    document.getElementById('cart-overlay').style.display = 
        document.getElementById('cart-sidebar').classList.contains('active') ? 'block' : 'none';
};

function updateCart() {
    localStorage.setItem('oblakoteam_cart', JSON.stringify(cart));
    document.getElementById('cart-count').innerText = cart.length;
    const itemsDiv = document.getElementById('cart-items');
    itemsDiv.innerHTML = cart.map((item, i) => `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px;">
            <div style="font-size:14px;"><b>${item.name}</b><br>${item.price} ₴</div>
            <button onclick="remove(${i})" style="border:none; background:none; color:red; cursor:pointer;">✕</button>
        </div>
    `).join('');
    const total = cart.reduce((s, i) => s + i.price, 0);
    document.getElementById('cart-total').innerText = total + ' ₴';
}

window.remove = (i) => { cart.splice(i, 1); updateCart(); };

window.sendOrder = () => {
    if(cart.length === 0) return alert('Корзина пуста');
    const text = cart.map(item => `- ${item.name} (${item.price} ₴)`).join('%0A');
    const total = cart.reduce((s, i) => s + i.price, 0);
    // Ссылка на твой Telegram (замени "твой_ник")
    window.open(`https://t.me/твой_ник?text=Новый заказ!%0A${text}%0A%0AИтого: ${total} ₴`);
};

render();
updateCart();
