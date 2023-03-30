import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';

import { UserSearchComponent } from './users-search.component';
import { GitHubUsersState, initialGitHubUsersState } from '../../store/users/user.reducer';
import * as fromGitHubUsersActions from '../../store/users/user.actions';
import { GitHubUser } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';


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
    component.searchUserName.valueChanges.subscribe(value => {
      expect(component.searchUsers).toHaveBeenCalled();
      expect(component.searchUsers).toHaveBeenCalledWith(1, 10);
      expect(value).toEqual('abc');
      expect(component.searchUsers).toHaveBeenCalledTimes(1);
    })
  });

  it('should clear users when input is less than 3 characters', () => {
    component.searchUserName.setValue('a');
    component.searchUserName.valueChanges.subscribe(value => {
      expect(store.dispatch).toHaveBeenCalledWith(fromGitHubUsersActions.clearUsers({ query: undefined }));
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(value).toEqual('a');
      expect(component.searchUserName.value).toEqual('a');
      expect(fromGitHubUsersActions.clearUsers({ query: undefined }).query).toBeUndefined();
    })
  });

  it('should navigate to user details', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');
    component.navigateToUserDetails();
    expect(navigateSpy).toHaveBeenCalledWith(['user-details']);
    expect(navigateSpy).toHaveBeenCalledTimes(1);
  });

  it('should dispatch actions and navigate to user details', () => {
    const user: GitHubUser = {
        login: "exemplo",
        id: 123,
        node_id: "exemplo",
        avatar_url: "https://exemplo.com",
        gravatar_id: "exemplo",
        url: "https://exemplo.com",
        html_url: "https://exemplo.com",
        followers_url: "https://exemplo.com",
        following_url: "https://exemplo.com",
        gists_url: "https://exemplo.com",
        starred_url: "https://exemplo.com",
        subscriptions_url: "https://exemplo.com",
        organizations_url: "https://exemplo.com",
        repos_url: "https://exemplo.com",
        events_url: "https://exemplo.com",
        received_events_url: "https://exemplo.com",
        type: "exemplo",
        site_admin: false,
        score: 1.0
    };
    const router = TestBed.inject(Router);
    const routerSpy = spyOn(router, 'navigate');
    spyOn(component, 'dispatchGetUserDetails');
    spyOn(component, 'dispatchStoreUserSearch');

    component.viewUserDetails(user);

    expect(component.dispatchGetUserDetails).toHaveBeenCalledWith(user);
    expect(component.dispatchGetUserDetails).toHaveBeenCalledTimes(1);
    expect(component.dispatchStoreUserSearch).toHaveBeenCalled();
    expect(component.dispatchStoreUserSearch).toHaveBeenCalledTimes(1);
    expect(routerSpy).toHaveBeenCalledWith(['user-details']);
    expect(routerSpy).toHaveBeenCalledTimes(1);
  });
});