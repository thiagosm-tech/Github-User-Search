import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { GitHubUsers } from '../entities/users.entity';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return GitHubUsers with items less than or equal to 10', () => {
    const searchName = 'test';
    const mockUsers: GitHubUsers = {
      total_count: 1,
      incomplete_results: false,
      items: [
        {
          login: 'test-user',
          id: 1,
          node_id: 'test-node-id',
          avatar_url: 'test-avatar-url',
          gravatar_id: '',
          url: 'test-url',
          html_url: 'test-html-url',
          followers_url: 'test-followers-url',
          following_url: 'test-following-url',
          gists_url: 'test-gists-url',
          starred_url: 'test-starred-url',
          subscriptions_url: 'test-subscriptions-url',
          organizations_url: 'test-organizations-url',
          repos_url: 'test-repos-url',
          events_url: 'test-events-url',
          received_events_url: 'test-received-events-url',
          type: 'User',
          site_admin: false,
          score: 1,
        },
      ],
    };

    service.searchUsers(searchName).subscribe((users) => {
      expect(users.items.length).toBeLessThanOrEqual(10);
    });

    const req = httpMock.expectOne(
      `https://api.github.com/search/users?q=${searchName}&per_page=${10}&page=${1}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});
