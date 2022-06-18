import { Component, Input, OnInit } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';
import { PageableResponse } from 'src/app/core/entities/pageable/pageable';

@Component({
    selector: 'app-dashboard-count-card',
    templateUrl: 'dashboard-count-card.component.html',
    styleUrls: ['./dashboard-count-card.component.css']
})

export class DashboardCountCardComponent implements OnInit {

    @Input() title: string;
    @Input() iconClass: string;
    @Input() endpoint: Observable<PageableResponse<any>>;

    public value?: number;
    public isLoading: boolean;

    constructor() { }

    ngOnInit() {       
        this.isLoading = true;
        this.endpoint
            .pipe(
                finalize(() => this.isLoading = false),
                map(response => response.totalRecords),
            )
            .subscribe({
                next: (totalRecords) => {
                    this.value = totalRecords;
                }
            })
    }
}