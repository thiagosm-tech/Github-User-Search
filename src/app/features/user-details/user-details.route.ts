import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDetailsComponent } from './user-details.component';
import { StoreGuard } from 'src/app/core/guards/store.guard';

const routes: Routes = [
  { path: '', component: UserDetailsComponent, canActivate: [StoreGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDetailsRoute { }