import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserSearchComponent } from './users-search.component';
import { UserSearchRoute } from './user-search.route';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserSearchRoute,
  ]
})
export class UserSearchModule { }
