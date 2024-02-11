import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private readonly authService: AuthService) {}

  onSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    this.authService.login(this.email, this.password);
  }
}
