import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { BlogComponent } from './pages/blog/blog.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'blogs',
    component: BlogsComponent,
    title: 'Blogs',
  },
  {
    path: 'blogs/new',
    component: BlogComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'blogs/:id',
    component: BlogComponent,
  },
  {
    path: 'users/login',
    component: LoginComponent,
    canActivate: [NotAuthGuard],
  },
  {
    path: 'users/signup',
    component: SignupComponent,
    canActivate: [NotAuthGuard],
  },
  {
    path: 'users/profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BlogsComponent,
    BlogComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
