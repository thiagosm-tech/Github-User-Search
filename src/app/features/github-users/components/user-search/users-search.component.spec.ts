import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { UserSearchComponent } from './users-search.component';
import { SearchUsersUseCase } from 'src/app/core/use-cases/search-users.use-case';
import { UserListComponent } from '../user-list/user-list.component';

describe('UserSearchComponent', () => {
  let component: UserSearchComponent;
  let fixture: ComponentFixture<UserSearchComponent>;
  let searchUsersUseCase: SearchUsersUseCase;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSearchComponent, UserListComponent  ],
      imports: [ StoreModule.forRoot({}) ],
      providers: [
        { provide: SearchUsersUseCase, useValue: { search: () => {} } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSearchComponent);
    component = fixture.componentInstance;
    searchUsersUseCase = TestBed.inject(SearchUsersUseCase);
    spyOn(searchUsersUseCase, 'search');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('searchGitHubUsers', () => {
    it('should call search method of SearchUsersUseCase with the correct search value', () => {
      const event: unknown = {
        target: {
          value: 'testuser'
        }
      };
      component.searchGitHubUsers(event as Event);
      expect(searchUsersUseCase.search).toHaveBeenCalledWith('testuser');
    });
  });
});