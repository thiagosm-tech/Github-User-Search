import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GitHubUsers } from '../entities/users.entity'

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    searchUsers(userName: string): Observable<GitHubUsers> {
        return this.http.get<GitHubUsers>
            (`https://api.github.com/search/users?q=${userName}&per_page=${10}&page=${1}`);
    }
}