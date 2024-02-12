import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user: User | undefined;
  constructor(private readonly apiService: ApiService) {}
  ngOnInit() {
    this.apiService.profile().subscribe({
      next: (user) => (this.user = user),
    });
  }
}
