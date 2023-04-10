import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UserSearchComponent } from './components/user-search/users-search.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { GitHubUsersRoute } from './route';
import { UserListComponent } from './components/user-list/user-list.component';
import { effects, reducers } from './store/app.state';

@NgModule({
  declarations: [
    UserSearchComponent,
    UserDetailsComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    GitHubUsersRoute,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
  ]
})
export class GithubUsersModule { }
