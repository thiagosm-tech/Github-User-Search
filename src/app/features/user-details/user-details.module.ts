import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { UserDetailsComponent } from './user-details.component';
import { UserDetailsRoute } from './user-details.route';
import { StateObservable, Store } from '@ngrx/store';

@NgModule({
  declarations: [
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    UserDetailsRoute
  ],
  providers: [
    Store
  ]
})
export class UserDetailsModule { }
