const API_BASE = '';

let sessionId = localStorage.getItem('sessionId');
if (!sessionId) {
  sessionId = generateUUID();
  localStorage.setItem('sessionId', sessionId);
}

let cart = { items: [], subtotal: 0, tax: 0, total: 0, itemCount: 0 };
let products = [];
let currentOrder = null;

document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  setupEventListeners();
});

async function initializeApp() {
  await Promise.all([loadProducts(), loadCart()]);
}

async function apiCall(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'X-Session-ID': sessionId,
    ...options.headers
  };
  const response = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  return response.json();
}

async function loadProducts() {
  try {
    const result = await apiCall('/api/products');
    if (result.success) {
      products = result.data;
      renderProducts();
    }
  } catch (error) {
    console.error('Failed to load products:', error);
    showToast('Failed to load products', 'error');
  }
}

async function loadCart() {
  try {
    const result = await apiCall('/api/cart');
    if (result.success) {
      cart = result.data;
      updateCartUI();
    }
  } catch (error) {
    console.error('Failed to load cart:', error);
  }
}

async function addToCart(productId) {
  try {
    const result = await apiCall('/api/cart/add', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity: 1 })
    });
    if (result.success) {
      cart = result.data;
      updateCartUI();
      showToast('Added to cart!', 'success');
    }
  } catch (error) {
    console.error('Failed to add to cart:', error);
    showToast('Failed to add to cart', 'error');
  }
}

async function updateCartItem(productId, quantity) {
  try {
    const result = await apiCall('/api/cart/update', {
      method: 'PUT',
      body: JSON.stringify({ productId, quantity })
    });
    if (result.success) {
      cart = result.data;
      updateCartUI();
      renderCartItems();
    }
  } catch (error) {
    console.error('Failed to update cart:', error);
    showToast('Failed to update cart', 'error');
  }
}

async function removeFromCart(productId) {
  try {
    const result = await apiCall(`/api/cart/remove/${productId}`, { method: 'DELETE' });
    if (result.success) {
      cart = result.data;
      updateCartUI();
      renderCartItems();
      showToast('Item removed', 'success');
    }
  } catch (error) {
    console.error('Failed to remove from cart:', error);
    showToast('Failed to remove item', 'error');
  }
}

async function createOrder(customerInfo) {
  try {
    const result = await apiCall('/api/orders/create', {
      method: 'POST',
      body: JSON.stringify({ customerInfo })
    });
    if (result.success) {
      currentOrder = result.data;
      return currentOrder;
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Failed to create order:', error);
    throw error;
  }
}

async function initiatePayment(order, customerInfo) {
  console.log('Payment integration needed');
  console.log('Order:', order);
  console.log('Customer:', customerInfo);
  showToast('Payment not configured', 'error');
  alert(`Order created: ${order.id}\nTotal: ₹${order.total}`);
}

function renderProducts() {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-footer">
          <span class="product-price">
            <span class="currency">₹</span>${product.price.toLocaleString('en-IN')}
          </span>
          <button class="add-to-cart" onclick="addToCart('${product.id}')">Add to Cart</button>
        </div>
      </div>
    </div>
  `).join('');
}

function updateCartUI() {
  document.getElementById('cart-count').textContent = cart.itemCount || 0;
}

function renderCartItems() {
  const container = document.getElementById('cart-items');
  const footer = document.getElementById('cart-footer');

  if (!cart.items || cart.items.length === 0) {
    container.innerHTML = `<div class="cart-empty"><div class="cart-empty-icon">🛒</div><p>Your cart is empty</p></div>`;
    footer.innerHTML = '';
    return;
  }

  container.innerHTML = cart.items.map(item => `
    <div class="cart-item">
      <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-image">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.product.name}</div>
        <div class="cart-item-price">₹${item.product.price.toLocaleString('en-IN')}</div>
        <div class="cart-item-quantity">
          <button class="qty-btn" onclick="updateCartItem('${item.productId}', ${item.quantity - 1})">-</button>
          <span class="qty-value">${item.quantity}</span>
          <button class="qty-btn" onclick="updateCartItem('${item.productId}', ${item.quantity + 1})">+</button>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart('${item.productId}')">Remove</button>
      </div>
    </div>
  `).join('');

  footer.innerHTML = `
    <div class="cart-totals">
      <div class="cart-total-row"><span>Subtotal</span><span>₹${cart.subtotal.toLocaleString('en-IN')}</span></div>
      <div class="cart-total-row"><span>Tax (18% GST)</span><span>₹${cart.tax.toLocaleString('en-IN')}</span></div>
      <div class="cart-total-row total"><span>Total</span><span>₹${cart.total.toLocaleString('en-IN')}</span></div>
    </div>
    <button class="btn btn-primary btn-block" onclick="openCheckoutModal()">Proceed to Checkout</button>
  `;
}

function renderOrderSummary() {
  const container = document.getElementById('order-summary');
  container.innerHTML = `
    <h3>Order Summary</h3>
    <div class="order-summary-row"><span>Subtotal (${cart.itemCount} items)</span><span>₹${cart.subtotal.toLocaleString('en-IN')}</span></div>
    <div class="order-summary-row"><span>Tax (18% GST)</span><span>₹${cart.tax.toLocaleString('en-IN')}</span></div>
    <div class="order-summary-row total"><span>Total</span><span>₹${cart.total.toLocaleString('en-IN')}</span></div>
  `;
}

function setupEventListeners() {
  document.getElementById('cart-toggle').addEventListener('click', openCart);
  document.getElementById('cart-close').addEventListener('click', closeCart);
  document.getElementById('cart-overlay').addEventListener('click', closeCart);
  document.getElementById('modal-close').addEventListener('click', closeCheckoutModal);
  document.getElementById('checkout-modal').addEventListener('click', (e) => {
    if (e.target.id === 'checkout-modal') closeCheckoutModal();
  });
  document.getElementById('checkout-form').addEventListener('submit', handleCheckout);
}

function openCart() {
  renderCartItems();
  document.getElementById('cart-sidebar').classList.add('active');
  document.getElementById('cart-overlay').classList.add('active');
}

function closeCart() {
  document.getElementById('cart-sidebar').classList.remove('active');
  document.getElementById('cart-overlay').classList.remove('active');
}

function openCheckoutModal() {
  if (!cart.items || cart.items.length === 0) {
    showToast('Your cart is empty', 'error');
    return;
  }
  closeCart();
  renderOrderSummary();
  document.getElementById('checkout-modal').classList.add('active');
}

function closeCheckoutModal() {
  document.getElementById('checkout-modal').classList.remove('active');
}

async function handleCheckout(e) {
  e.preventDefault();
  const form = e.target;
  const customerInfo = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    address: form.address.value
  };

  const payButton = document.getElementById('pay-btn');
  payButton.disabled = true;
  payButton.innerHTML = '<span class="spinner"></span> Processing...';

  try {
    const order = await createOrder(customerInfo);
    await initiatePayment(order, customerInfo);
  } catch (error) {
    showToast(error.message || 'Checkout failed', 'error');
  } finally {
    payButton.disabled = false;
    payButton.innerHTML = 'Place Order';
  }
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
