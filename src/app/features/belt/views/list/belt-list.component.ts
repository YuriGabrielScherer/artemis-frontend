import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralTableColumnsInput } from 'src/app/components/general-table/view/general-table.component';
import { BeltDto } from 'src/app/core/entities/belt/belt';
import { BeltService } from 'src/app/core/entities/belt/belt.service';
import { PageableResponse } from 'src/app/core/entities/pageable/pageable';
import { AbstractListComponent } from 'src/app/shared/abstract-list-component/abstract-list-component';

@Component({
    selector: 'app-belt-list',
    templateUrl: 'belt-list.component.html'
})

export class BeltListComponent extends AbstractListComponent<BeltDto> implements OnInit {

    public selectedBelt: BeltDto;
    public columns: GeneralTableColumnsInput[] = [
        { field: 'belt', header: 'Faixa', },
        { field: 'minMonths', header: 'Qnt de Meses', },
    ];

    constructor(
        private beltService: BeltService,
        private router: Router,
        private route: ActivatedRoute,
    ) { super(); }

    ngOnInit() { }

    public edit(): void {
        this.router.navigate(['new'], { relativeTo: this.route, state: { 'entity': this.selectedBelt } });
    }

    public toggleCheckBox(event: MouseEvent): void {
        event.stopPropagation();
    }

    protected endpoint(): Observable<PageableResponse<BeltDto>> {
        return this.beltService.find(this.pageable);
    }
}