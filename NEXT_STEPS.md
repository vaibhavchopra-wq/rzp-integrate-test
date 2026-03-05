# Next Steps - Razorpay Integration Setup

## 1. Add Your Razorpay API Credentials

Open the `.env` file in your project root and replace the placeholder values:

```
RAZORPAY_KEY_ID=your_actual_key_id_here
RAZORPAY_KEY_SECRET=your_actual_key_secret_here
```

### Where to find your credentials

1. Log in to the [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Navigate to **Settings** → **API Keys**
3. Generate or copy your **Key ID** and **Key Secret**
4. For testing, use **Test Mode** keys (they start with `rzp_test_`)


## 2. Test the Integration

After adding your credentials, start your development server and test with these credentials:

### Test Card
| Field       | Value                |
|-------------|----------------------|
| Card Number | 4111 1111 1111 1111  |
| Expiry      | Any future date      |
| CVV         | Any 3-digit number   |

### Test UPI
| Field | Value              |
|-------|--------------------|
| VPA   | success@razorpay   |

## 3. Go Live

When you are ready for production:

1. Switch to **Live Mode** on the Razorpay Dashboard
2. Generate **Live** API keys
3. Replace the test keys in your `.env` with the live keys
4. Ensure your server is running over HTTPS
