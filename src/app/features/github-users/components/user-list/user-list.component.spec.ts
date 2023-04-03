import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { UserListComponent } from './user-list.component';
import { SearchUsersUseCase } from 'src/app/core/use-cases/search-users.use-case';
import { GitHubUser } from 'src/app/core/entities/users.entity';
import { getGitHubUsers, searchReducer } from 'src/app/core/store/users/user.reducer';
import { AppState } from 'src/app/core/store/app.state';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let router: Router;
  let store: Store<AppState>;
  let searchUsersUseCase: SearchUsersUseCase;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListComponent ],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({ users: searchReducer })
      ],
      providers: [
        { provide: SearchUsersUseCase, useValue: { storeSelectedUser: () => {} } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
    searchUsersUseCase = TestBed.inject(SearchUsersUseCase);
    spyOn(store, 'select').and.returnValue(of({}));
    spyOn(searchUsersUseCase, 'storeSelectedUser');
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('viewUserDetails', () => {
    it('should store selected user and navigate to user details page', () => {
      const user: GitHubUser = {
        login: "",
        id: 0,
        node_id: "",
        avatar_url: "",
        gravatar_id: "",
        url: "",
        html_url: "",
        followers_url: "",
        following_url: "",
        gists_url: "",
        starred_url: "",
        subscriptions_url: "",
        organizations_url: "",
        repos_url: "",
        events_url: "",
        received_events_url: "",
        type: "",
        site_admin: false,
        score: 0
      };
      component.viewUserDetails(user);
      expect(searchUsersUseCase.storeSelectedUser).toHaveBeenCalledWith(user);
      expect(router.navigate).toHaveBeenCalledWith(['user-details']);
    });
  });
});