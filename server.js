const express = require('express');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const products = require('./data/products');

const carts = new Map();
const orders = new Map();

app.get('/api/products', (req, res) => {
  res.json({ success: true, data: products });
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }
  res.json({ success: true, data: product });
});

app.get('/api/cart', (req, res) => {
  const sessionId = req.headers['x-session-id'] || uuidv4();
  let cart = carts.get(sessionId);
  
  if (!cart) {
    cart = { items: [], sessionId };
    carts.set(sessionId, cart);
  }
  
  res.json({ success: true, data: calculateCartTotals(cart) });
});

app.post('/api/cart/add', (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const sessionId = req.headers['x-session-id'] || uuidv4();
  
  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }
  
  let cart = carts.get(sessionId);
  if (!cart) {
    cart = { items: [], sessionId };
  }
  
  const existingItem = cart.items.find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity, product });
  }
  
  carts.set(sessionId, cart);
  res.json({ success: true, data: calculateCartTotals(cart) });
});

app.put('/api/cart/update', (req, res) => {
  const { productId, quantity } = req.body;
  const sessionId = req.headers['x-session-id'];
  
  if (!sessionId) {
    return res.status(400).json({ success: false, error: 'Session ID required' });
  }
  
  let cart = carts.get(sessionId);
  if (!cart) {
    return res.status(404).json({ success: false, error: 'Cart not found' });
  }
  
  const itemIndex = cart.items.findIndex(item => item.productId === productId);
  if (itemIndex === -1) {
    return res.status(404).json({ success: false, error: 'Item not found in cart' });
  }
  
  if (quantity <= 0) {
    cart.items.splice(itemIndex, 1);
  } else {
    cart.items[itemIndex].quantity = quantity;
  }
  
  carts.set(sessionId, cart);
  res.json({ success: true, data: calculateCartTotals(cart) });
});

app.delete('/api/cart/remove/:productId', (req, res) => {
  const sessionId = req.headers['x-session-id'];
  const { productId } = req.params;
  
  if (!sessionId) {
    return res.status(400).json({ success: false, error: 'Session ID required' });
  }
  
  let cart = carts.get(sessionId);
  if (!cart) {
    return res.status(404).json({ success: false, error: 'Cart not found' });
  }
  
  cart.items = cart.items.filter(item => item.productId !== productId);
  carts.set(sessionId, cart);
  res.json({ success: true, data: calculateCartTotals(cart) });
});

app.delete('/api/cart/clear', (req, res) => {
  const sessionId = req.headers['x-session-id'];
  if (sessionId) {
    carts.delete(sessionId);
  }
  res.json({ success: true, data: { items: [], sessionId, subtotal: 0, tax: 0, total: 0 } });
});

app.post('/api/orders/create', (req, res) => {
  const sessionId = req.headers['x-session-id'];
  const { customerInfo } = req.body;
  
  if (!sessionId) {
    return res.status(400).json({ success: false, error: 'Session ID required' });
  }
  
  const cart = carts.get(sessionId);
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ success: false, error: 'Cart is empty' });
  }
  
  const cartWithTotals = calculateCartTotals(cart);
  const orderId = `order_${uuidv4().substring(0, 8)}`;
  
  const order = {
    id: orderId,
    items: cart.items,
    customerInfo,
    subtotal: cartWithTotals.subtotal,
    tax: cartWithTotals.tax,
    total: cartWithTotals.total,
    currency: 'INR',
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: new Date().toISOString()
  };
  
  orders.set(orderId, order);
  res.json({ success: true, data: order });
});

app.get('/api/orders/:orderId', (req, res) => {
  const order = orders.get(req.params.orderId);
  if (!order) {
    return res.status(404).json({ success: false, error: 'Order not found' });
  }
  res.json({ success: true, data: order });
});

app.patch('/api/orders/:orderId', (req, res) => {
  const order = orders.get(req.params.orderId);
  if (!order) {
    return res.status(404).json({ success: false, error: 'Order not found' });
  }
  
  const allowedUpdates = ['status', 'paymentStatus', 'paymentId', 'paymentMethod'];
  allowedUpdates.forEach(field => {
    if (req.body[field] !== undefined) {
      order[field] = req.body[field];
    }
  });
  
  order.updatedAt = new Date().toISOString();
  orders.set(req.params.orderId, order);
  res.json({ success: true, data: order });
});

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running', timestamp: new Date().toISOString() });
});

function calculateCartTotals(cart) {
  const subtotal = cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + tax;
  return {
    ...cart,
    subtotal,
    tax,
    total,
    itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0)
  };
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
