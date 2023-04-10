import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { StoreGuard } from './store.guard';
import { AppState } from '../features/github-users/store/app.state';
import { GitHubUsersState } from '../features/github-users/store/users/user.reducer';
import { Router } from '@angular/router';

describe('StoreGuard', () => {
    let guard: StoreGuard;
    let storeSpy: jasmine.SpyObj<Store<AppState>>;
    let routerSpy: jasmine.SpyObj<Router>;

    const testUsersState: GitHubUsersState = {
        total_count: 1,
        incomplete_results: false,
        items: [{
            login: 'testuser',
            id: 123,
            node_id: 'testnode',
            avatar_url: 'testavatar',
            gravatar_id: 'testgravatar',
            url: 'testurl',
            html_url: 'testhtml',
            followers_url: 'testfollowers',
            following_url: 'testfollowing',
            gists_url: 'testgists',
            starred_url: 'teststarred',
            subscriptions_url: 'testsubscriptions',
            organizations_url: 'testorganizations',
            repos_url: 'testrepos',
            events_url: 'testevents',
            received_events_url: 'testreceived',
            type: 'testtype',
            site_admin: false,
            score: 1
        }],
        selectedUser: {
            login: 'testuser',
            id: 123,
            node_id: 'testnode',
            avatar_url: 'testavatar',
            gravatar_id: 'testgravatar',
            url: 'testurl',
            html_url: 'testhtml',
            followers_url: 'testfollowers',
            following_url: 'testfollowing',
            gists_url: 'testgists',
            starred_url: 'teststarred',
            subscriptions_url: 'testsubscriptions',
            organizations_url: 'testorganizations',
            repos_url: 'testrepos',
            events_url: 'testevents',
            received_events_url: 'testreceived',
            type: 'testtype',
            site_admin: false,
            score: 1
        }
    };

    beforeEach(() => {
        const storeSpyObj = jasmine.createSpyObj('Store', ['select']);
        const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

        TestBed.configureTestingModule({
            providers: [
                StoreGuard,
                { provide: Store, useValue: storeSpyObj },
                { provide: Router, useValue: routerSpyObj },
            ],
            imports: [
                RouterTestingModule,
            ]
        });
        guard = TestBed.inject(StoreGuard);
        storeSpy = TestBed.inject(Store) as jasmine.SpyObj<Store<AppState>>;
        routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    describe('canActivate', () => {
        it('should return true if selected user is not null', (done) => {
            storeSpy.select.and.returnValue(of(testUsersState));
            guard.canActivate().subscribe((result) => {
                expect(result).toBeTrue();
                done();
            });
        });

        it('should navigate to user search if selected user is null', (done) => {
            const nullUserState: GitHubUsersState = {
                total_count: 1,
                incomplete_results: false,
                items: [{
                    login: 'testuser',
                    id: 123,
                    node_id: 'testnode',
                    avatar_url: 'testavatar',
                    gravatar_id: 'testgravatar',
                    url: 'testurl',
                    html_url: 'testhtml',
                    followers_url: 'testfollowers',
                    following_url: 'testfollowing',
                    gists_url: 'testgists',
                    starred_url: 'teststarred',
                    subscriptions_url: 'testsubscriptions',
                    organizations_url: 'testorganizations',
                    repos_url: 'testrepos',
                    events_url: 'testevents',
                    received_events_url: 'testreceived',
                    type: 'testtype',
                    site_admin: false,
                    score: 1
                }],
                selectedUser: null,
            };
            storeSpy.select.and.returnValue(of(nullUserState));
            guard.canActivate().subscribe(() => {
                expect(routerSpy.navigate).toHaveBeenCalledWith(['/user-search']);
                done();
            });
        });
    });
});