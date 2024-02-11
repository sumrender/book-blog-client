import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Blog } from 'src/models/blog.model';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent {
  blogs: Blog[] = [];
  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.apiService.getBlogs().subscribe((blogs) => {
      this.blogs = blogs;
    });
  }

  goToBlog(blog: Blog) {
    this.router.navigate([`blogs/${blog._id}`]);
  }
}
