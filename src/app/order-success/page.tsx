'use client';

import Link from 'next/link';

export default function OrderSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      {/* Success Icon */}
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
      <p className="text-gray-600 mb-8">
        Thank you for your purchase. We&apos;ve sent a confirmation email with your order details.
        Your order will be delivered within 3-5 business days.
      </p>

      {/* Order Info */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <p className="text-sm text-gray-500 mb-2">Order Number</p>
        <p className="text-xl font-mono font-semibold text-gray-900">
          ORD-{Date.now().toString().slice(-8)}
        </p>
      </div>

      {/* Next Steps */}
      <div className="text-left bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">What&apos;s Next?</h2>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0">1</span>
            <span className="text-gray-600">You&apos;ll receive an order confirmation email shortly</span>
          </li>
          <li className="flex items-start">
            <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0">2</span>
            <span className="text-gray-600">We&apos;ll notify you when your order ships</span>
          </li>
          <li className="flex items-start">
            <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0">3</span>
            <span className="text-gray-600">Track your order with the tracking link in your email</span>
          </li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/products"
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Continue Shopping
        </Link>
        <Link
          href="/"
          className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
