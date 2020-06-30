import { Repository } from './models/repository.interface';
import { Component, OnInit } from '@angular/core';
import { RepositoryService } from './core/repository.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    repositoryList: Repository[];
    pagedRepositoryList: Repository[];

    page: number;
    totalPages: number;
    perPage: number = 20;

    isLoading: boolean = false;

    constructor(private repo: RepositoryService) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.fetchRepositories();
    }

    async fetchRepositories() {
        const result = await this.repo.getRepositories();
        if (result && result.items) {
            this.repositoryList = result.items;
        }
        this.totalPages = Math.round(this.repositoryList.length / this.perPage);
        this.getPage(0);
        this.isLoading = false;
    }

    getPage(page: number) {
        this.page = page;
        let start = this.page * this.perPage;
        if (isNaN(start)) {
            start = 0;
        }
        this.pagedRepositoryList = this.repositoryList.slice(start, start + this.perPage);
    }

    nextPage() {
        const page = this.page + 1;
        if (page > this.totalPages - 1) {
            return;
        }
        this.getPage(page);
    }

    previousPage() {
        const page = this.page - 1;
        if (page < 0) {
            return;
        }
        this.getPage(page);
    }

    changePerPage(amount: string) {
        this.perPage = parseInt(amount, 10);
        this.totalPages = Math.round(this.repositoryList.length / this.perPage);
        this.getPage(this.page);
    }
}
