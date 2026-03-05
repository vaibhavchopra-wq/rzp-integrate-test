// Razorpay Payment Integration
async function initiateRazorpayPayment(amount, onSuccess, onError) {
  try {
    if (!window.Razorpay) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }

    const orderResponse = await fetch('/api/razorpay/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });

    const orderData = await orderResponse.json();
    if (!orderData.success) throw new Error(orderData.error || 'Failed to create order');

    const options = {
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: document.title || 'Payment',
      order_id: orderData.orderId,
      handler: async function(response) {
        const verifyResponse = await fetch('/api/razorpay/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(response),
        });
        const verifyData = await verifyResponse.json();
        if (verifyData.success) { if (onSuccess) onSuccess(verifyData); }
        else { if (onError) onError(new Error(verifyData.error)); }
      },
      modal: { ondismiss: () => { if (onError) onError(new Error('Payment cancelled')); } },
      theme: { color: '#528FF0' },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.on('payment.failed', (r) => { if (onError) onError(new Error(r.error.description)); });
    razorpay.open();
  } catch (error) {
    console.error('Payment failed:', error);
    if (onError) onError(error);
  }
}
