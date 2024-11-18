import React from 'react';
import { Layout } from './Layout';
import { SocialMediaConnector } from './SocialMediaConnector';
import { ProductGrid } from './ProductGrid';
import { Settings, ShoppingBag, Share2 } from 'lucide-react';

export function Dashboard() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Share2 className="h-8 w-8 text-indigo-600" />
                <h1 className="text-2xl font-bold text-gray-900">Social Commerce Hub</h1>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <Settings className="h-6 w-6 text-gray-600" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <ShoppingBag className="h-6 w-6 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Connect Your Accounts</h2>
              <SocialMediaConnector />
            </section>

            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Your Content</h2>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Import New Content
                </button>
              </div>
              <ProductGrid />
            </section>
          </div>
        </main>
      </div>
    </Layout>
  );
}