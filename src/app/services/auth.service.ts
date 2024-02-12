import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/models/user.model';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null | undefined>(undefined);
  public readonly user: Observable<User | null | undefined> =
    this.userSubject.asObservable();

  error: string = '';

  constructor(
    private readonly apiService: ApiService,
    private router: Router
  ) {}

  login(email: string, password: string) {
    this.error = '';

    this.apiService.login(email, password).subscribe({
      next: (authPayload) => {
        this.userSubject.next(authPayload.user);
        localStorage.setItem('token', authPayload.token);
        this.router.navigate(['']);
      },
      error: (e) => {
        if (e.status === 400) {
          this.error = 'Incorrect credentials!';
        } else {
          this.error = 'Something went wrong.';
        }
        this.userSubject.next(null);
      },
    });
  }

  isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }

  getError() {
    return this.error;
  }

  signup(email: string, password: string, name: string) {
    this.error = '';

    this.apiService.signup(email, password, name).subscribe({
      next: (authPayload) => {
        this.userSubject.next(authPayload.user);
        localStorage.setItem('token', authPayload.token);
        this.router.navigate(['']);
      },
      error: (e) => {
        if (e.error.error.includes('Email already in use')) {
          this.error = 'This email is already in use';
        } else if (e.error.error.includes('Password not strong enough')) {
          this.error = e.error.error;
        } else {
          this.error = 'Something went wrong.';
        }
        console.log('signup error', e);
        this.userSubject.next(null);
      },
    });
  }

  profile() {
    console.log('get user');
    this.apiService.profile().subscribe({
      next: (user) => this.userSubject.next(user),
      error: (e) => {
        this.userSubject.next(null);
      },
    });
  }

  logout() {
    this.userSubject.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
