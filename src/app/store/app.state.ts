import { ActionReducerMap } from '@ngrx/store';

import { GitHubUsersEffects } from './users/user.effects';
import { GitHubUsersState, gitHubUsersReducer } from './users/user.reducer';

export interface AppState {
  gitHubUsers: GitHubUsersState;
}

export const reducers: ActionReducerMap<AppState> = {
  gitHubUsers: gitHubUsersReducer,
};

export const effects = [
    GitHubUsersEffects
]