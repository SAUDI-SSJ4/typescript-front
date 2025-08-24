export interface Blog {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  keywords: string[];
  category: string;
  status: 'published' | 'draft';
  author: string;
  createdAt: string;
  updatedAt: string;
  views?: number;
  likes?: number;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface BlogStats {
  totalBlogs: number;
  publishedBlogs: number;
  draftBlogs: number;
  totalViews: number;
  totalLikes: number;
}