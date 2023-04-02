import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AppState } from '../store/app.state';
import { GitHubUsersState } from '../store/users/user.reducer';

@Injectable({
  providedIn: 'root'
})
export class StoreGuard {

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.select(state => state.gitHubUsers)
      .pipe(
        map((gitHubUsers: GitHubUsersState) => !!gitHubUsers.selectedUser),
        tap(hasSelectedUser => {
          if (!hasSelectedUser) {
            this.router.navigate(['/user-search']);
          }
        })
      );
  }
}