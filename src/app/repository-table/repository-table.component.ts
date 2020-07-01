import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Repository } from '../models/repository.interface';

@Component({
    selector: 'app-repository-table',
    template: `
        <section class="table-container">
            <table>
                <thead>
                    <tr>
                        <th class="id">Id</th>
                        <th class="name">Name</th>
                        <th class="created">Created</th>
                        <th class="stars">Stars</th>
                        <th class="forks">Forks</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let repo of pagedRepositoryList">
                        <td class="id">{{ repo.id }}</td>
                        <td class="name">
                            <a [href]="repo.html_url" target="_blank">{{ repo.full_name }}</a>
                        </td>
                        <td class="created">{{ repo.created_at | date: 'dd.MM.yyyy' }}</td>
                        <td class="stars">
                            <div>
                                <div></div>
                                {{ repo.stargazers_count | number }}
                            </div>
                        </td>
                        <td class="forks">
                            <div>
                                <div></div>
                                {{ repo.forks_count | number }}
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <td colspan="5">
                        <div>
                            <div>
                                <span id="per-page-label" for="per-page">Rows per page</span>
                                <select id="per-page" [ngModel]="perPage" (ngModelChange)="changePerPage.emit($event)">
                                    <option>10</option>
                                    <option default>20</option>
                                    <option>50</option>
                                </select>
                            </div>
                            <div>
                                <span>Page {{ page + 1 }} of {{ totalPages }}</span>
                                <button
                                    class="icon-button"
                                    id="first"
                                    [disabled]="page === 0"
                                    (click)="getPage.emit(0)"
                                    title="First page"
                                    aria-label="first page"
                                ></button>
                                <button
                                    class="icon-button"
                                    id="previous"
                                    [disabled]="page === 0"
                                    (click)="previousPage.emit()"
                                    title="Previous page"
                                    aria-label="previous page"
                                ></button>
                                <button
                                    class="icon-button"
                                    id="next"
                                    [disabled]="page === totalPages - 1"
                                    (click)="nextPage.emit()"
                                    title="Next page"
                                    aria-label="next page"
                                ></button>
                                <button
                                    class="icon-button"
                                    id="last"
                                    [disabled]="page === totalPages - 1"
                                    (click)="getPage.emit(this.totalPages - 1)"
                                    title="Last page"
                                    aria-label="last page"
                                ></button>
                            </div>
                        </div>
                    </td>
                </tfoot>
            </table>
        </section>
    `,
    styleUrls: ['./repository-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoryTableComponent implements OnInit {
    @Input() pagedRepositoryList: Repository[];
    @Input() page: number;
    @Input() totalPages: number;
    @Input() perPage: number;
    @Output() changePerPage = new EventEmitter<number>();
    @Output() getPage = new EventEmitter<number>();
    @Output() nextPage = new EventEmitter();
    @Output() previousPage = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}
}
