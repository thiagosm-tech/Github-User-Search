import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';

import { UserSearchComponent } from './users-search.component';
import { GitHubUsersState, initialGitHubUsersState } from '../../store/users/user.reducer';
import * as fromGitHubUsersActions from '../../store/users/user.actions';


describe('UserSearchComponent', () => {
  let component: UserSearchComponent;
  let fixture: ComponentFixture<UserSearchComponent>;
  let store: jasmine.SpyObj<Store<GitHubUsersState>>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}),
      ],
      declarations: [ UserSearchComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search for users when input is at least 3 characters', () => {
    spyOn(component, 'searchUsers');
    component.searchUserName.setValue('abc');
    expect(component.searchUsers).toHaveBeenCalled();
  });

  it('should clear users when input is less than 3 characters', () => {
    spyOn(store, 'dispatch');
    component.searchUserName.setValue('a');
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should dispatch actions to get user details and store user search', () => {
    const user = {} as any;
    spyOn(store, 'dispatch');
    component.viewUserDetails(user);
    expect(store.dispatch).toHaveBeenCalledWith(fromGitHubUsersActions.getUserDetails({ user }));
    expect(store.dispatch).toHaveBeenCalledWith(fromGitHubUsersActions.storeUserSearch({ userSearch: component.searchUserName.value || '' }));
  });
});