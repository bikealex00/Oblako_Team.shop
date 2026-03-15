const products = [
    { id: 1, name: 'Чаша Oblako Phunnel M Stone', price: 490, cat: 'Чаши', img: '🏺' },
    { id: 2, name: 'Кальян Amy Deluxe SS - Black', price: 3100, cat: 'Кальяны', img: '💨' },
    { id: 3, name: 'Колба Craft Clear', price: 650, cat: 'Колби', img: '⚱️' },
    { id: 4, name: 'Щипці Blade Hookah Premium', price: 420, cat: 'Аксесуари', img: '✂️' },
    { id: 5, name: 'Шило Oblako Silver Edition', price: 250, cat: 'Аксесуари', img: '📍' },
    { id: 6, name: 'Чаша Oblako Flow M Yellow', price: 550, cat: 'Чаші', img: '🌪️' }
];

let cart = JSON.parse(localStorage.getItem('oblakoteam_cart')) || [];

function render(data = products) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = data.map(p => `
        <div class="card">
            <div class="card-img">${p.img}</div>
            <p style="color:#888; font-size:12px;">${p.cat}</p>
            <h3 style="margin: 10px 0; font-size: 16px;">${p.name}</h3>
            <span class="price">${p.price} ₴</span>
            <button class="buy-btn" onclick="addToCart(${p.id})">Купити</button>
        </div>
    `).join('');
}

window.addToCart = (id) => {
    const p = products.find(x => x.id === id);
    cart.push(p);
    updateCart();
    toggleCart(); // Сразу открываем корзину, чтобы человек видел заказ
};

window.toggleCart = () => {
    const sb = document.getElementById('cart-sidebar');
    const ov = document.getElementById('cart-overlay');
    sb.classList.toggle('active');
    ov.style.display = sb.classList.contains('active') ? 'block' : 'none';
};

function updateCart() {
    localStorage.setItem('oblakoteam_cart', JSON.stringify(cart));
    document.getElementById('cart-count').innerText = cart.length;
    const itemsDiv = document.getElementById('cart-items-content');
    
    itemsDiv.innerHTML = cart.map((item, i) => `
        <div style="display:flex; justify-content:space-between; margin-bottom:15px; border-bottom:1px solid #f5f5f5; padding-bottom:10px;">
            <div><b>${item.name}</b><br><span style="color:#0066cc">${item.price} ₴</span></div>
            <button onclick="remove(${i})" style="border:none; background:none; cursor:pointer; color:#ccc;">✕</button>
        </div>
    `).join('');
    
    const total = cart.reduce((s, i) => s + i.price, 0);
    document.getElementById('total-price').innerText = total + ' ₴';
}

window.remove = (i) => { cart.splice(i, 1); updateCart(); };

window.filterCat = (cat) => {
    if(cat === 'Все') render(products);
    else render(products.filter(p => p.cat === cat));
};

window.sendToTelegram = () => {
    if(cart.length === 0) return alert('Кошик порожній!');
    const orderText = cart.map(item => `• ${item.name} (${item.price} ₴)`).join('%0A');
    const total = cart.reduce((s, i) => s + i.price, 0);
    const message = `Вітаю! Хочу зробити замовлення в OblakoTeam Store:!%0A%0A${orderText}%0A%0AРазом: ${total} ₴`;
    window.open(`https://t.me/Market199?text=${message}`, '_blank');
};

render();
updateCart();
