import React, { useState } from 'react';
import { ShoppingBag, Loader2 } from 'lucide-react';
import ProductList from './components/ProductList';
import CartPreview from './components/CartPreview';
import { CartProvider } from './context/CartContext';
import { Product } from './types';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      setProducts(data.products);
    } catch (err) {
      setError('Failed to fetch products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <ShoppingBag className="w-12 h-12 text-indigo-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Product Showcase
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Click the button below to fetch amazing products
            </p>
            <button
              onClick={fetchProducts}
              disabled={loading}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  Loading...
                </>
              ) : (
                'Fetch Products'
              )}
            </button>
          </div>

          {error && (
            <div className="text-center text-red-600 mb-8 p-4 bg-red-50 rounded-lg">
              {error}
            </div>
          )}

          <ProductList products={products} />
          <CartPreview />
        </div>
      </div>
    </CartProvider>
  );
}

export default App;