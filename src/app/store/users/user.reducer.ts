import { Action, createReducer, createSelector, on, createFeatureSelector } from '@ngrx/store';
import { GitHubUser, GitHubUsers } from '../../shared/models/user.model';
import * as UserActions from './user.actions';

export interface GitHubUsersState extends GitHubUsers {
  selectedUser: GitHubUser | null,
  storeUserSearch: string
}

export const initialGitHubUsersState: GitHubUsersState = {
  total_count: 0,
  incomplete_results: true,
  items: [],
  selectedUser: null,
  storeUserSearch: ''
}

export const _gitHubUsersReducer = createReducer(
  initialGitHubUsersState,
  on(UserActions.searchUsers, (state, { query }) => ({
    ...state,
    searchQuery: query,
    isLoading: true,
    error: null,
  })),
  on(UserActions.searchUsersSuccess, (state, { users }) => ({
    ...state,
    total_count: users.total_count,
    incomplete_results: users.incomplete_results,
    items: users.items,
    isLoading: false,
    error: null,
  })),
  on(UserActions.searchUsersFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: true,
  })),
  on(UserActions.clearUsers, (state) => ({
    ...state,
    total_count: 0,
    incomplete_results: true,
    items: [],
    isLoading: false,
    error: false,
  })),
  on(UserActions.getUserDetails, (state, { user }) => ({
    ...state,
    selectedUser: user,
    isLoading: false,
    error: false,
  })),
  on(UserActions.storeUserSearch, (state, { userSearch }) => ({
    ...state,
    storeUserSearch: userSearch,
    isLoading: false,
    error: false,
  })),
);

export function gitHubUsersReducer(state = initialGitHubUsersState, action: Action) {
  return _gitHubUsersReducer(state, action);
}

const getGitHubUsersFeatureState = createFeatureSelector<GitHubUsersState>(
  'gitHubUsers'
)

export const getGitHubUsers = createSelector(
  getGitHubUsersFeatureState,
  (state: GitHubUsersState) => state
)