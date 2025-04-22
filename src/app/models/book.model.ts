export interface Book {
  id: number;
  title: string;
  description: string;
  author: string;
  publishedYear: number;
  cover: string;
  file: string | null;
}
