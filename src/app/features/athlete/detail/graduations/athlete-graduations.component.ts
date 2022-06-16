import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralTableColumnsInput } from 'src/app/components/general-table/view/general-table.component';

import { AthleteDto } from 'src/app/core/entities/athlete/athlete';
import { AthleteService } from 'src/app/core/entities/athlete/athlete.service';
import { AthleteGraduationsDto } from 'src/app/core/entities/graduation/athlete_graduation/athlete-graduation';
import { PageableResponse } from 'src/app/core/entities/pageable/pageable';
import { AbstractListComponent } from 'src/app/shared/abstract-list-component/abstract-list-component';

@Component({
    selector: 'app-athlete-graduations',
    templateUrl: 'athlete-graduations.component.html',
    styleUrls: ['./athlete-graduations.component.css']
})

export class AthleteGraduationsComponent extends AbstractListComponent<AthleteGraduationsDto>  {

    @Input() athlete: AthleteDto;

    public columns: GeneralTableColumnsInput[] = [
        { field: 'graduation.title', header: 'Exame de Graduação' },
        { field: 'graduation.date', header: 'Data do Exame', date: true, },
        { field: 'belt', header: 'Faixa' },
        { field: 'situation', header: 'Situação' },
        { field: 'grade', header: 'Nota' },
    ];

    constructor(
        private athleteService: AthleteService,
    ) { super(); }


    protected endpoint(): Observable<PageableResponse<AthleteGraduationsDto>> {
        return this.athleteService.listGraduations(this.athlete.person.code, this.pageable);
    }

}