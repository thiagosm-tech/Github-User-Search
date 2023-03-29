import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime } from 'rxjs/operators';
import { GitHubUser } from '../../shared/models/user.model';

import { AppState } from 'src/app/store/app.state';
import { getGitHubUsers, GitHubUsersState } from 'src/app/store/users/user.reducer';
import * as fromGitHubUsersActions from '../../store/users/user.actions';

@Component({
  selector: 'app-user-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  githubUsers$ = this.store.select(getGitHubUsers);
  githubUsers!: GitHubUsersState;
  searchUserName = new FormControl('');

  constructor(private store: Store<AppState>, private router: Router) {
    this.setupSearchUserNameListener();
  }

  ngOnInit(): void {
    this.checkStoredUserSearch();
  }

  setupSearchUserNameListener(): void {
    this.searchUserName.valueChanges.pipe(
      debounceTime(300),
    ).subscribe((value: any) => {
      if (value.length >= 3) {
        this.searchUsers(1, 10)
      } else {
        this.store.dispatch(fromGitHubUsersActions.clearUsers({ query: undefined }))
      }
    });
  }

  checkStoredUserSearch() {
    let storedSearch = '';

    this.githubUsers$.subscribe(data => {
      this.githubUsers = data;
      storedSearch = data.storeUserSearch
    });

    if (storedSearch != this.searchUserName.value && storedSearch != '') {
      this.searchUserName.patchValue(storedSearch);
    }
  }

  searchUsers(page?: number, perPage?: number) {
    const query = {
      userName: this.searchUserName.value,
      page: page || 1,
      perPage: perPage || 10,
    }
    this.store.dispatch(fromGitHubUsersActions.searchUsers({ query }));
  }

  dispatchGetUserDetails(user: GitHubUser) {
    this.store.dispatch(fromGitHubUsersActions.getUserDetails({ user }));
  }

  dispatchStoreUserSearch() {
    this.store.dispatch(fromGitHubUsersActions.storeUserSearch({ userSearch: this.searchUserName.value || '' }));
  }

  navigateToUserDetails() {
    this.router.navigate([`user-details`]);
  }

  viewUserDetails(user: GitHubUser) {
    this.dispatchGetUserDetails(user);
    this.dispatchStoreUserSearch();
    this.navigateToUserDetails();
  }
}