import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { getGitHubUsers, initialGitHubUsersState } from 'src/app/store/users/user.reducer';
import { AppState } from 'src/app/store/app.state';
import { UserDetailsComponent } from './user-details.component';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailsComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        provideMockStore({
          initialState: { gitHubUsers: initialGitHubUsersState } as AppState
        })
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject<Store<AppState>>(Store) as MockStore;
    spyOn(store, 'select').and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home when returnUsersSearch is called', () => {
    component.returnUsersSearch();
    expect(component['router'].navigate).toHaveBeenCalledWith(['']);
  });

  it('should select the GitHub users from the store', () => {
    expect(store.select).toHaveBeenCalledWith(getGitHubUsers);
  });
});