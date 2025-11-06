// src/types/index.ts

export interface Image {
  id: number;
  title: string;
  description: string;
  image_file: string; // URL of the image
  uploaded_at: string; // ISO date string
}

export interface GalleryResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Image[];
}
