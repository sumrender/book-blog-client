import { User } from './user.model';

export interface Blog {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: User;
}

export interface CreateBlog {
  title: string;
  content: string;
}
