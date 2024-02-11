import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  email: string = '';
  password: string = '';

  constructor(private readonly authService: AuthService) {}

  onSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    this.authService.signup(this.email, this.password);
  }
}
