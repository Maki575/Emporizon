import React from 'react';
import { ShoppingCart, Heart, Loader2 } from 'lucide-react';
import { usePinterestPins } from '../hooks/usePinterest';

export function ProductGrid() {
  const { data: pins, isLoading, error } = usePinterestPins();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Failed to load content. Please try again later.
      </div>
    );
  }

  if (!pins?.length) {
    return (
      <div className="text-center text-gray-500 p-4">
        No content found. Connect your social media accounts to get started.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pins.map((pin) => (
        <ProductCard
          key={pin.id}
          product={{
            id: pin.id,
            imageUrl: pin.media.images.original.url,
            title: pin.title || 'Untitled Pin',
            platform: 'pinterest',
            likes: 0, // Pinterest API v5 doesn't provide like counts
          }}
        />
      ))}
    </div>
  );
}

interface ProductCardProps {
  product: {
    id: string;
    imageUrl: string;
    title: string;
    platform: string;
    likes: number;
  };
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative aspect-square">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <span className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-700 backdrop-blur-sm">
            {product.platform}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-500">
            <Heart className="h-5 w-5" />
            <span>{product.likes}</span>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <ShoppingCart className="h-4 w-4" />
            <span>List on Amazon</span>
          </button>
        </div>
      </div>
    </div>
  );
}