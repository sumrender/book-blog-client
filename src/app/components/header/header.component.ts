import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loggedIn!: Observable<boolean>;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loggedIn = this.authService.user.pipe(map(user => !!user));
  }

  handleLogout(){
    this.authService.logout();
  }
}
