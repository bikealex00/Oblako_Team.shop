// Кошик для товарів
let cart = [];

// Ссылка на твой Telegram (впиши имя аккаунта без значка @)
const TELEGRAM_USERNAME = "OblakoTeam_Work"; 

// Логіка входу через екран привітання
function enterStore() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContents = document.querySelectorAll('.hidden-content');

    // Плавно ховаємо вітальну заставку
    welcomeScreen.style.opacity = '0';
    welcomeScreen.style.transform = 'scale(1.03)';

    // Після завершення CSS-анімації повністю видаляємо заставку та проявляємо сайт
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        
        mainContents.forEach(element => {
            element.classList.add('show-content');
        });
    }, 700);
}

// Перемикач віджета кошика (відкрити/закрити)
function toggleCart() {
    document.getElementById('cartModal').classList.toggle('active');
}

// Додавання елементів до кошика
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }

    updateCartUI();
}

// Оновлення кошика
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
                <div style="font-weight: 600; margin-bottom: 4px;">${item.name}</div>
                <small style="color: #888;">${item.price} ₴ за шт. × ${item.quantity}</small>
            </div>
            <div style="font-weight: bold; color: #ff003c;">${itemSum} ₴</div>
        `;
        itemsListEl.appendChild(itemDiv);
    });

    totalPriceEl.textContent = `${totalSum} ₴`;
}

// Генерація повідомлення та надсилання в Telegram + Очищення кошика та Вікно Подяки
function sendToTelegram() {
    if (cart.length === 0) {
        alert("Ваш кошик порожній!");
        return;
    }

    let message = "Привіт, OblakoTeam! Я хочу зробити замовлення на вашому сайті:\n\n";
    let totalSum = 0;

    cart.forEach((item, index) => {
        const itemSum = item.price * item.quantity;
        totalSum += itemSum;
        message += `${index + 1}. 🛒 ${item.name} — ${item.quantity} шт. (${itemSum} ₴)\n`;
    });

    message += `\n💰 Загальна сума замовлення: ${totalSum} ₴`;

    const encodedMessage = encodeURIComponent(message);
    const telegramUrl = `https://t.me/${TELEGRAM_USERNAME}?text=${encodedMessage}`;

    // 1. Відкриваємо Telegram в новій вкладці
    window.open(telegramUrl, '_blank');

    // 2. Очищаємо масив кошика
    cart = [];

    // 3. Перемальовуємо кошик на сайті (він стане порожнім, лічильник скинеться на 0)
    updateCartUI();

    // 4. Закриваємо віджет кошика (прибираємо клас active)
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.classList.remove('active');
    }

    // 5. Показуємо красиве вікно подяки українською мовою
    showThankYouModal();
}

// Функція для генерації красивого модального вікна подяки
function showThankYouModal() {
    const modal = document.createElement('div');
    modal.className = 'thank-you-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-icon">❤️</div>
            <h2>Дякуємо за замовлення!</h2>
            <p>Ваша заявка успішно сформована та надіслана.</p>
            <p>Менеджер уже чекає на вас у <strong>Telegram</strong> для підтвердження деталей!</p>
            <button class="close-modal-btn" onclick="this.parentElement.parentElement.remove()">Чудово</button>
        </div>
    `;
    
    document.body.appendChild(modal);

    
}
