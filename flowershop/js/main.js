// 1. قائمة المنتجات
const products = [
    {
        id: 1,
        name: "وردة حمراء",
        price: "LE 50.00",
        category: "ورد طبيعي",
        image: "images/red rose.jpg"
    },
    {
        id: 2,
        name: "وردة بيضاء",
        price: "LE 50.00",
        category: "ورد طبيعي",
        image: "images/with rose.jpg"
    },
    {
        id: 3,
        name: "ليلي",
        price: "LE 400.00",
        category: "ورد طبيعي",
        image: "images/WhatsApp Image 2026-07-23 at 5.38.21 PM.jpeg"
    },
    {
        id: 4,
        name: "10 وردات توليب",
        price: "LE 1,500.00",
        category: "ورد طبيعي",
        image: "images/WhatsApp Image 2026-07-23 at 5.39.36 PM.jpeg"
    },
    {
        id: 5,
        name: "بوكيه جاهزة",
        price: "LE 2,000.00",
        category: "بوكيهات جاهزة",
        image: "images/WhatsApp Image 2026-07-23 at 6.23.17 PM.jpeg"
    }
];


let cart = [];

// 2. دالة عرض المنتجات في الصفحة
function displayProducts(items) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';

    items.forEach(product => {
        // تم تعديل زر الإضافة لتمرير الـ ID بتاع المنتج الصح: addToCart(${product.id})
        const card = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price}</p>
                <button class="add-btn" onclick="addToCart(${product.id})">أضف للسلة</button>
            </div>
        `;
        grid.innerHTML += card;
    });
}

// 3. فتح وإغلاق السلة
function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.toggle('active');
}

// 4. دالة إضافة المنتج لـ Array السلة
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    updateCartUI();
}

// 5. تحديث واجهة السلة (عروض المنتجات + الحسابات)
function updateCartUI() {
    const cartContainer = document.getElementById('cart-items');
    let total = 0;
    let count = 0;
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p style="text-align:center; color:#888; margin-top:20px;">السلة فارغة حالياً</p>';
    } else {
        cart.forEach(item => {
            // استخراج السعر بالرقم بدون كلمة LE
            const numericPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
            total += numericPrice * item.qty;
            count += item.qty;

            cartContainer.innerHTML += `
                <div class="cart-item" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                    <img src="${item.image}" style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover;">
                    <div style="flex:1; margin-right: 10px; text-align: right;">
                        <h4 style="font-size:0.95rem; margin:0;">${item.name}</h4>
                        <small style="color:#666;">${item.price} × ${item.qty}</small>
                    </div>
                </div>
            `;
        });
    }

    document.getElementById('cart-count').innerText = count;
    document.getElementById('cart-total').innerText = total.toLocaleString();
}

// 6. فلترة المنتجات
function filterProducts(category) {
    // تغيير شكل الأزرار المحددة
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if(category === 'all') {
        displayProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        displayProducts(filtered);
    }
}

// 7. دالة إرسال الطلب للواتساب
function checkoutWhatsApp() {
    if (cart.length === 0) return alert('السلة فارغة!');
    
    let message = "مرحباً، أود طلب الزهور التالية:%0A";
    cart.forEach(item => {
        message += `- ${item.name} (العدد: ${item.qty})%0A`;
    });
    message += `%0Aالإجمالي: ${document.getElementById('cart-total').innerText} LE`;
    
    const phoneNumber = "201066106283";
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

// تشغيل عرض المنتجات لأول مرة عند فتح الصفحة
displayProducts(products);