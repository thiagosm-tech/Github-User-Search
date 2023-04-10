import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { getGitHubUsers } from '../../store/users/user.reducer';
import { AppState } from '../../store/app.state';


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
