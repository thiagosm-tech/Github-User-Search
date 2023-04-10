import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserSearchComponent } from './components/user-search/users-search.component';

const routes: Routes = [
    { path: '', redirectTo: '/user-search', pathMatch: 'full' },
    { path: 'user-search', component: UserSearchComponent },
    { path: 'user-details', component: UserDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GitHubUsersRoute { }