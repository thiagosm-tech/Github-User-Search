import { createAction, props } from '@ngrx/store';
import { GitHubUsers, GitHubUser } from '../../entities/users.entity';

export const searchUsers = createAction('[User] Search Users', props<{ query: any }>());
export const searchUsersSuccess = createAction('[User] Search Users Success', props<{ users: GitHubUsers }>());
export const searchUsersFailure = createAction('[User] Search Users Failure', props<{ error: any }>());

export const clearUsers = createAction('[User] Clear GitHubUsers', props<{ query: any }>());
export const getUserDetails = createAction('[User] Get User Details', props<{ user: GitHubUser }>());
export const storeUserSearch = createAction('[User] Store User Search', props<{ userSearch: string }>());

export const updateSearchValue = createAction('[Search] Update Search Value',props<{ searchValue: string }>());

