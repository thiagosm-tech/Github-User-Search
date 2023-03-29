import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getGitHubUsers } from 'src/app/store/users/user.reducer';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  users$ = this.store.select(getGitHubUsers);

  constructor(private store: Store<AppState>, private router: Router) { }

  returnUsersSearch() {
    this.router.navigate([``]);
  }
}
