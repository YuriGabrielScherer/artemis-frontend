import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { finalize, Observable } from 'rxjs';

import { GraduationService } from 'src/app/core/entities/graduation/graduation.service';
import { GeneralTableColumnsInput } from 'src/app/components/general-table/view/general-table.component';
import { AthleteGraduationDto } from 'src/app/core/entities/graduation/athlete_graduation/athlete-graduation';
import { PageableResponse } from 'src/app/core/entities/pageable/pageable';
import { AbstractListComponent } from 'src/app/shared/abstract-list-component/abstract-list-component';
import { GraduationDto } from 'src/app/core/entities/graduation/graduation';
import { EnumGraduationSituation } from 'src/app/core/enums/enum-graduation-situation';

@Component({
    selector: 'app-graduation-athletes',
    templateUrl: 'graduation-athletes.component.html'
})
export class GraduationAthletesComponent extends AbstractListComponent<AthleteGraduationDto> implements OnInit, OnChanges {

    @Input()
    public graduation: GraduationDto;

    public canAssociate: boolean;
    public showModalSelect: boolean = false;
    public columns: GeneralTableColumnsInput[] = [
        { field: 'athlete.person.code', header: 'Código' },
        { field: 'athlete.person.name', header: 'Nome' },
        { field: 'athlete.person.association.name', header: 'Associação' },
        { field: 'belt', header: 'Faixa' },
        { field: 'situation', header: 'Situação' },
    ];

    constructor(
        private graduationService: GraduationService,
    ) { super(); }

    public ngOnInit(): void {
        this.canAssociate = this.graduation.situation == EnumGraduationSituation.OPEN_SUBSCRIPTION;
    }

    ngOnChanges(changes: SimpleChanges): void {
        const graduationChange = changes['graduation'];
        if (graduationChange) {
            this.canAssociate = this.graduation.situation == EnumGraduationSituation.OPEN_SUBSCRIPTION;
            this.graduation = graduationChange.currentValue;
        }
    }

    public onOpenModal(): void {
        this.showModalSelect = true;
    }

    public onCloseModal(): void {
        this.showModalSelect = false;
    }

    public onAthletesAdded(): void {
        this.isLoading = true;
        this.pageable.page = 0;
        this.fetchData();
    }

    public onRemoveAthlete(graduation: AthleteGraduationDto): void {
        // TODO Modal de confirmação
        this.isLoading = true;
        this.graduationService.removeAthletes({ graduationCode: this.graduation.code, athletes: [graduation.athlete.person.code] })
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: () => {
                    this.pageable.page = 0;
                    this.fetchData();
                }
            });

    }

    protected endpoint(): Observable<PageableResponse<AthleteGraduationDto>> {
        return this.graduationService.listAthletes(this.graduation.code, this.pageable);
    }

}