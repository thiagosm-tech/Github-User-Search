import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import * as UserActions from './user.actions';

@Injectable()
export class GitHubUsersEffects {

    constructor(private actions$: Actions, private userService: UserService) { }

    searchUsers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(UserActions.searchUsers),
            exhaustMap((action) =>
                this.userService.searchUsers(action.query).pipe(
                    map((users) => {
                        return UserActions.searchUsersSuccess({ users })
                    }),
                    catchError((error) => of(UserActions.searchUsersFailure({ error })))
                )
            )
        )
    });
}