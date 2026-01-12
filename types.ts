
export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  category: string;
  rating: string;
  year: string;
  isUserUploaded?: boolean;
}

export type Category = 'Trending' | 'Popular' | 'Action' | 'Sci-Fi' | 'My Uploads';

export interface UploadFormData {
  title: string;
  description: string;
  category: string;
  thumbnail: string | null;
  video: string | null;
}
