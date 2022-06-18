import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';

import { GraduationDto } from 'src/app/core/entities/graduation/graduation';
import { GraduationService } from 'src/app/core/entities/graduation/graduation.service';

@Component({
    selector: 'app-dashboard-graduation',
    templateUrl: 'dashboard-graduation.component.html',
    styleUrls: ['./dashboard-graduation.component.css'],
})

export class DashboardGraduationComponent implements OnInit {

    public graduation?: GraduationDto;
    public dataLoaded: boolean = false;
    public isLoading: boolean = false;
    public hasError: boolean = false;

    constructor(
        private graduationService: GraduationService,
    ) { }

    ngOnInit() {
        this.fetchData();
    }

    public onRetry(): void {
        this.fetchData();
    }

    private fetchData(): void {
        this.isLoading = true;
        this.graduationService.findNextGraduation()
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: (response) => {
                    this.dataLoaded = true;
                    this.graduation = response;
                },
                error: () => this.hasError = true,
            })
    }
}