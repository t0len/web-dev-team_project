export interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
    coverImage: string;
    fileUrl: string;
    category: string;
    rating: number;
    reviews: Review[];
  }
  
  export interface Review {
    id: number;
    user: {
      id: number;
      name: string;
    };
    rating: number;
    comment: string;
    created_at: string;
  }
  
  export interface User {
    id: number;
    email: string;
    name: string;
    isAdmin: boolean;
  }