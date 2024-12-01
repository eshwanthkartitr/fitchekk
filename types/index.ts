export interface FitAnalysis {
  rating: number;
  feedback: string;
  occasion: string;
}

export interface VoteResponse {
  success: boolean;
  action?: 'added' | 'removed' | 'changed';
  error?: string;
}

export interface Fit {
  id: string;
  image: string;
  userImage: string;
  username: string;
  votes: number;
  comments: number;
  description: string;
} 