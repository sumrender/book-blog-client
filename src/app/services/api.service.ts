import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthPayload, User } from 'src/models/user.model';
import { Blog, CreateBlog } from 'src/models/blog.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = 'http://localhost:5000/api';
  constructor(private httpClient: HttpClient) {}

  getBlogs() {
    return this.httpClient.get<Blog[]>(`${this.url}/blogs`);
  }

  getBlog(id: string) {
    return this.httpClient.get<Blog>(`${this.url}/blogs/${id}`);
  }

  createBlog(blog: CreateBlog) {
    console.log('create blog post called');
    return this.httpClient.post<Blog>(`${this.url}/blogs`, blog);
  }

  updateBlog(id: string, blog: Partial<CreateBlog>) {
    return this.httpClient.patch<Blog>(`${this.url}/blogs/${id}`, blog);
  }

  deleteBlog(id: string) {
    return this.httpClient.delete<Blog>(`${this.url}/blogs/${id}`);
  }

  signup(email: string, password: string, name: string) {
    return this.httpClient.post<AuthPayload>(`${this.url}/users/signup`, {
      email,
      password,
      name,
    });
  }

  login(email: string, password: string) {
    return this.httpClient.post<AuthPayload>(`${this.url}/users/login`, {
      email,
      password,
    });
  }

  profile() {
    console.log('profile called');
    return this.httpClient.get<User>(`${this.url}/users/profile`);
  }
}
