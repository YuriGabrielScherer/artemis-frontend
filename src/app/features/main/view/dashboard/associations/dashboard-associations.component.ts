import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { TopAssociation } from 'src/app/core/entities/association/association';
import { AssociationService } from 'src/app/core/entities/association/association.service';

@Component({
    selector: 'app-dashboard-associations',
    templateUrl: 'dashboard-associations.component.html'
})

export class DashboardAssociationsComponent implements OnInit {

    public data: TopAssociation[] = [];
    public isLoading: boolean = false;
    public hasError: boolean = false;

    constructor(
        public associationService: AssociationService,
    ) { }

    ngOnInit() {
        this.fetchData();
    }

    public onRetry() {
        this.fetchData();
    }

    private fetchData(): void {
        this.isLoading = true;
        this.associationService.listTopAssociationsByAthletes()
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: (response) => this.data = response,
                error: () => this.hasError = true
            })
    }
}