import axios from 'axios';
import { z } from 'zod';

const PINTEREST_API_URL = 'https://api.pinterest.com/v5';

// Schema for Pinterest API responses
const PinSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  media: z.object({
    images: z.object({
      original: z.object({
        url: z.string(),
      }),
    }),
  }),
  created_at: z.string(),
  link: z.string().optional(),
});

export type Pin = z.infer<typeof PinSchema>;

export class PinterestService {
  private accessToken: string | null = null;

  constructor() {
    this.accessToken = localStorage.getItem('pinterest_access_token');
  }

  private get headers() {
    return {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    };
  }

  async authenticate(code: string): Promise<void> {
    try {
      const response = await axios.post('/api/pinterest/oauth/token', { code });
      this.accessToken = response.data.access_token;
      localStorage.setItem('pinterest_access_token', this.accessToken);
    } catch (error) {
      console.error('Pinterest authentication failed:', error);
      throw new Error('Failed to authenticate with Pinterest');
    }
  }

  async getUserPins(limit = 25): Promise<Pin[]> {
    if (!this.accessToken) {
      throw new Error('Not authenticated with Pinterest');
    }

    try {
      const response = await axios.get(`${PINTEREST_API_URL}/user/pins`, {
        headers: this.headers,
        params: { limit },
      });

      const pins = z.array(PinSchema).parse(response.data.items);
      return pins;
    } catch (error) {
      console.error('Failed to fetch Pinterest pins:', error);
      throw new Error('Failed to fetch Pinterest pins');
    }
  }

  async getPin(pinId: string): Promise<Pin> {
    if (!this.accessToken) {
      throw new Error('Not authenticated with Pinterest');
    }

    try {
      const response = await axios.get(`${PINTEREST_API_URL}/pins/${pinId}`, {
        headers: this.headers,
      });

      const pin = PinSchema.parse(response.data);
      return pin;
    } catch (error) {
      console.error('Failed to fetch Pinterest pin:', error);
      throw new Error('Failed to fetch Pinterest pin');
    }
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  logout(): void {
    this.accessToken = null;
    localStorage.removeItem('pinterest_access_token');
  }
}