import { ActionReducerMap } from '@ngrx/store';

import { GitHubUsersEffects } from './users/user.effects';
import { GitHubUsersState, gitHubUsersReducer, searchReducer } from './users/user.reducer';

export interface AppState {
  gitHubUsers: GitHubUsersState;
  searchValue: string;
}

export const reducers: ActionReducerMap<AppState> = {
  gitHubUsers: gitHubUsersReducer,
  searchValue: searchReducer
};

export const effects = [
    GitHubUsersEffects
]