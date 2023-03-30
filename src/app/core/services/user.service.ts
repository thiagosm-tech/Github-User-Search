import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GitHubUsers } from '../../shared/models/user.model'

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    searchUsers(query: any): Observable<GitHubUsers> {
        return this.http.get<GitHubUsers>
            (`https://api.github.com/search/users?q=${query.userName}&per_page=${query.perPage}&page=${query.page}`);
    }
}