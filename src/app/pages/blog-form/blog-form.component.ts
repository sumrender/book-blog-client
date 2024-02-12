import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss'],
})
export class BlogFormComponent {
  blogTitle: string = '';
  blogContent: string = '';

  editorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '200px',
    placeholder: 'Enter blog content...',
  };

  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router
  ) {}

  createBlog() {
    this.apiService
      .createBlog({
        title: this.blogTitle,
        content: this.blogContent,
      })
      .subscribe({
        error: (e) => console.log('error creating blog', e),
        complete: () => this.router.navigate(['/blogs']),
      });
  }
}
