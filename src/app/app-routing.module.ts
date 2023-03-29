import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/user-search', pathMatch: 'full' },
  {
    path: 'user-search',
    loadChildren: () => import('./features/user-search/user-search.module').then(m => m.UserSearchModule)
  },
  {
    path: 'user-details',
    loadChildren: () => import('./features/user-details/user-details.module').then(m => m.UserDetailsModule)
  },
  { path: '**', redirectTo: '/user-search' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
