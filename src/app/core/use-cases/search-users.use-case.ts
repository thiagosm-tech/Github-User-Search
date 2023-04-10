import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromGitHubUsersActions from '../../features/github-users/store/users/user.actions';
import { GitHubUser } from '../entities/users.entity';
import { AppState } from 'src/app/features/github-users/store/app.state';

@Injectable({
  providedIn: 'root'
})
export class SearchUsersUseCase {
  
  constructor(private store: Store<AppState>) {}

  public search(name: string): void {
    const query = name?.trim();
    if (query?.length >= 3) {
      this.dispatchSearchUsers(query);
      this.dispatchUpdateSearchValue(query);
    } else {
      this.dispatchClearUsers();
    }
  }

  private dispatchSearchUsers(query: string): void {
    this.store.dispatch(fromGitHubUsersActions.searchUsers({ query }));
  }

  private dispatchUpdateSearchValue(searchValue: string): void {
    this.store.dispatch(fromGitHubUsersActions.updateSearchValue({ searchValue }));
  }

  private dispatchClearUsers(): void {
    this.store.dispatch(fromGitHubUsersActions.clearUsers({ query: null }));
  }

  public storeSelectedUser(user: GitHubUser): void {
    this.store.dispatch(fromGitHubUsersActions.getUserDetails({ user }));
  }
}