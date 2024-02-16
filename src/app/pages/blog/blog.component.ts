import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Blog } from 'src/models/blog.model';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
  id: string = '';
  blog: Blog | undefined;
  user: User | undefined | null;

  updateBlog: boolean = false;
  updatedBlogTitle: string = '';
  updatedBlogContent: string = '';

  editorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '200px',
    placeholder: 'Enter blog content...',
  };
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.apiService.getBlog(this.id).subscribe((blog) => {
        this.blog = blog;
      });
    });

    this.authService.user.subscribe((user) => {
      this.user = user;
    })
  }

  toggleUpdateBlog() {
    this.updateBlog = !this.updateBlog;
    this.updatedBlogTitle = this.blog!.title;
    this.updatedBlogContent = this.blog!.content;
  }

  deleteBlog() {
    this.apiService.deleteBlog(this.blog!._id).subscribe({
      complete: () => this.router.navigate([`/blogs`]),
    });
  }

  handleBlogUpdate() {
    this.apiService
      .updateBlog(this.blog!._id, {
        title: this.updatedBlogTitle,
        content: this.updatedBlogContent,
      })
      .subscribe({
        complete: () => {
          this.blog!.title = this.updatedBlogTitle;
          this.blog!.content = this.updatedBlogContent;
          this.toggleUpdateBlog();
        },
      });
  }
}
