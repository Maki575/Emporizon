export interface SocialMediaPost {
  id: string;
  platform: 'pinterest' | 'instagram' | 'tiktok';
  mediaType: 'image' | 'video';
  mediaUrl: string;
  title?: string;
  description: string;
  metadata: Record<string, unknown>;
  createdAt: Date;
}

export interface ProductListing {
  id: string;
  title: string;
  description: string;
  images: string[];
  price?: number;
  category?: string;
  asin?: string;
  sku?: string;
  sourcePost: SocialMediaPost;
}