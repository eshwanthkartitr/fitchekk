export interface WardrobeItem {
  id: string;
  image: string;
  name: string;
  category: 'upper_body' | 'lower_body' | 'dresses';
  occasion: string[];
  votes: number;
  comments: number;
  tryOnResults?: string[];
} 