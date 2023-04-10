import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { SearchUsersUseCase } from './search-users.use-case';
import * as fromGitHubUsersActions from '../../features/github-users/store/users/user.actions';
import { GitHubUser } from '../entities/users.entity';

describe('SearchUsersUseCase', () => {
    let useCase: SearchUsersUseCase;
    let store: MockStore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SearchUsersUseCase,
                provideMockStore()
            ]
        });

        useCase = TestBed.inject(SearchUsersUseCase);
        store = TestBed.inject(MockStore);
    });

    it('should dispatch searchUsers and updateSearchValue when query is valid', () => {
        const query = 'john';

        spyOn(store, 'dispatch').and.callThrough();

        useCase.search(query);

        expect(store.dispatch).toHaveBeenCalledWith(fromGitHubUsersActions.searchUsers({ query }));
        expect(store.dispatch).toHaveBeenCalledWith(fromGitHubUsersActions.updateSearchValue({ searchValue: query }));
        expect(store.dispatch).toHaveBeenCalledTimes(2);
    });

    it('should dispatch clearUsers when query is invalid', () => {
        const query = 'j';

        spyOn(store, 'dispatch').and.callThrough();

        useCase.search(query);

        expect(store.dispatch).toHaveBeenCalledWith(fromGitHubUsersActions.clearUsers({ query: null }));
        expect(store.dispatch).toHaveBeenCalledTimes(1);
    });

    it('should dispatch getUserDetails when storeSelectedUser is called', () => {
        const user: GitHubUser = {
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
        };

        spyOn(store, 'dispatch').and.callThrough();

        useCase.storeSelectedUser(user);

        expect(store.dispatch).toHaveBeenCalledWith(fromGitHubUsersActions.getUserDetails({ user }));
        expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
});