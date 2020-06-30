import { ApiResult } from './../models/api-result.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RepositoryService {
    private apiUri = `https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100`;

    constructor(private httpClient: HttpClient) {}

    getRepositories() {
        return this.httpClient.get<ApiResult>(this.apiUri).toPromise();
    }
}
