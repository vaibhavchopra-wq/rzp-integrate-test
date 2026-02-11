export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">About ShopNext</h1>

      <div className="prose prose-lg text-gray-600">
        <p className="lead text-xl mb-6">
          Welcome to ShopNext, your premier destination for premium products at unbeatable prices.
        </p>

        <p className="mb-6">
          Founded in 2024, ShopNext was born out of a simple idea: everyone deserves access to
          high-quality products without breaking the bank. We carefully curate our collection
          to bring you the best electronics, fashion, lifestyle products, and more.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Our Promise</h2>

        <ul className="space-y-4 mb-8">
          <li className="flex items-start">
            <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span><strong>Quality Guaranteed:</strong> Every product goes through rigorous quality checks</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span><strong>Fast Shipping:</strong> Get your orders delivered within 2-5 business days</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span><strong>Easy Returns:</strong> 7-day hassle-free return policy</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span><strong>Secure Payments:</strong> Your transactions are protected with industry-standard encryption</span>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Contact Us</h2>

        <p className="mb-4">
          Have questions? We&apos;d love to hear from you!
        </p>

        <div className="bg-gray-50 rounded-lg p-6">
          <p className="mb-2"><strong>Email:</strong> support@shopnext.com</p>
          <p className="mb-2"><strong>Phone:</strong> +91 1800-123-4567</p>
          <p><strong>Address:</strong> 123 Commerce Street, Bengaluru, Karnataka 560001</p>
        </div>
      </div>
    </div>
  );
}
