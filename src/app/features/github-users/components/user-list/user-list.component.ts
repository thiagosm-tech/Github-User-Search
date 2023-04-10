import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { GitHubUser } from 'src/app/core/entities/users.entity';
import { SearchUsersUseCase } from 'src/app/core/use-cases/search-users.use-case';
import { AppState } from '../../store/app.state';
import { GitHubUsersState, getGitHubUsers } from '../../store/users/user.reducer';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  public githubUsers$: Observable<GitHubUsersState>;

  constructor(
    private router: Router,
    private store: Store<AppState>, 
    private searchUsersUseCase: SearchUsersUseCase
  ) {
    this.githubUsers$ = this.store.select(getGitHubUsers);
    this.searchUsersUseCase = searchUsersUseCase;
  }

  public viewUserDetails(user: GitHubUser): void {
    this.searchUsersUseCase.storeSelectedUser(user);
    this.navigateToUserDetails();
  }
  
  private navigateToUserDetails(): void {
    this.router.navigate(['user-details']);
  }
}