export interface Blog {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlog {
  title: string;
  content: string;
}
