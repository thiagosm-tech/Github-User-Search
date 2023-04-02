// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { UserService } from './user.service';
// import { GitHubUsers } from '../models/user.model';

// describe('UserService', () => {
//   let userService: UserService;
//   let httpMock: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [UserService]
//     });

//     userService = TestBed.inject(UserService);
//     httpMock = TestBed.inject(HttpTestingController);
//   });

//   afterEach(() => {
//     httpMock.verify();
//   });

//   it('should be created', () => {
//     expect(userService).toBeTruthy();
//   });

//   it('should retrieve users from the API via GET', () => {
//     const query = { userName: 'octocat', perPage: 10, page: 1 };
//     const mockResponse: GitHubUsers = {
//       total_count: 1,
//       incomplete_results: false,
//       items: [
//         {
//           login: 'octocat',
//           id: 1,
//           node_id: 'MDQ6VXNlcjE=',
//           avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
//           gravatar_id: '',
//           url: 'https://api.github.com/users/octocat',
//           html_url: 'https://github.com/octocat',
//           followers_url: 'https://api.github.com/users/octocat/followers',
//           following_url: 'https://api.github.com/users/octocat/following{/other_user}',
//           gists_url: 'https://api.github.com/users/octocat/gists{/gist_id}',
//           starred_url: 'https://api.github.com/users/octocat/starred{/owner}{/repo}',
//           subscriptions_url: 'https://api.github.com/users/octocat/subscriptions',
//           organizations_url: 'https://api.github.com/users/octocat/orgs',
//           repos_url: 'https://api.github.com/users/octocat/repos',
//           events_url: 'https://api.github.com/users/octocat/events{/privacy}',
//           received_events_url: 'https://api.github.com/users/octocat/received_events',
//           type: 'User',
//           site_admin: false,
//           score: 1
//         }
//       ]
//     };

//     userService.searchUsers(query).subscribe((data: GitHubUsers) => {
//       expect(data).toEqual(mockResponse);
//     });

//     const req = httpMock.expectOne(`https://api.github.com/search/users?q=${query.userName}&per_page=${query.perPage}&page=${query.page}`);
//     expect(req.request.method).toBe('GET');
//     req.flush(mockResponse);
//   });
// });