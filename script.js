let cart = [];

// Ссылка на твой Telegram (вместо 'OblakoTeam_Work' напиши ваш реальный username)
const TELEGRAM_USERNAME = "OblakoTeam_Work"; 

// Відкрити / Закрити кошик
function toggleCart() {
    document.getElementById('cartModal').classList.toggle('active');
}

// Додати товар до кошика
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }

    updateCartUI();
}

// Оновлення відображення кошика
function updateCartUI() {
    const cartCountEl = document.getElementById('cart-count');
    const itemsListEl = document.getElementById('cart-items-list');
    const totalPriceEl = document.getElementById('cart-total-price');

    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalCount;

    itemsListEl.innerHTML = '';

    if (cart.length === 0) {
        itemsListEl.innerHTML = '<p class="empty-text">Кошик поки що порожній</p>';
        totalPriceEl.textContent = '0 ₴';
        return;
    }

    let totalSum = 0;

    cart.forEach(item => {
        const itemSum = item.price * item.quantity;
        totalSum += itemSum;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <div>
                <div><strong>${item.name}</strong></div>
                <small>${item.price} ₴ x ${item.quantity}</small>
            </div>
            <div>${itemSum} ₴</div>
        `;
        itemsListEl.appendChild(itemDiv);
    });

    totalPriceEl.textContent = `${totalSum} ₴`;
}

// Формування замовлення українською мовою та відправка в Telegram
function sendToTelegram() {
    if (cart.length === 0) {
        alert("Ваш кошик порожній!");
        return;
    }

    // Привітання та початок тексту замовлення
    let message = "Привіт, OblakoTeam! Я хочу зробити замовлення на вашому сайті:\n\n";
    let totalSum = 0;

    // Збір усіх позицій
    cart.forEach((item, index) => {
        const itemSum = item.price * item.quantity;
        totalSum += itemSum;
        message += `${index + 1}. ${item.name} — ${item.quantity} шт. (${itemSum} ₴)\n`;
    });

    // Загальна сума
    message += `\n💰 Загальна сума за все: ${totalSum} ₴`;

    // Кодування тексту для URL
    const encodedMessage = encodeURIComponent(message);
    
    // Посилання на переписку
    const telegramUrl = `https://t.me/${TELEGRAM_USERNAME}?text=${encodedMessage}`;

    // Перехід в Telegram у новій вкладці
    window.open(telegramUrl, '_blank');
}
