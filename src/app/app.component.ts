import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  token: string = localStorage.getItem('token') || '';
  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (this.token) {
      this.authService.profile();
    }
  }
}
