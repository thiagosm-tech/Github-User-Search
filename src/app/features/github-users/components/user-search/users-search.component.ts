import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { SearchUsersUseCase } from 'src/app/core/use-cases/search-users.use-case';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-user-search',
  templateUrl: './users-search.component.html',
  styleUrls: ['./users-search.component.scss']
})
export class UserSearchComponent {
  searchValue$: any

  constructor(private store: Store<AppState>, private _searchGitHubUsers: SearchUsersUseCase) { 
    this.searchValue$ = this.store.select(state => state.searchValue)
  }

  searchGitHubUsers(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value
    this._searchGitHubUsers.search(searchValue);
  }
}