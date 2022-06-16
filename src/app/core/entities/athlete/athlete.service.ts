import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, take } from 'rxjs';

import { PageableRequest, PageableResponse } from '../pageable/pageable';
import { AthleteDto, AthleteSaveInput } from './athlete';
import { AbstractService } from '../abstract.service';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class AthleteService extends AbstractService<AthleteDto, AthleteSaveInput> {
    constructor(protected http: HttpClient, protected messageService: MessageService) {
        super(http, messageService, 'athlete')
    }

    public listAvailableAthletesToGraduation(graduationCode: number, pageable: PageableRequest): Observable<PageableResponse<AthleteDto>> {
        let params = new HttpParams().set('pageable', JSON.stringify(pageable));
        return this.http.get<PageableResponse<AthleteDto>>(`${super.getUrl()}/listAvailableAthletesToGraduation`, {
            params: params.set('graduationCode', graduationCode)
        }).pipe(take(1));
    }

    public listGraduations(athleteCode: number, pageable: PageableRequest): Observable<any> {
        const params = new HttpParams()
            .set('athleteCode', athleteCode)
            .set('pageable', JSON.stringify(pageable));
        return this.http.get(`${super.getUrl()}/listGraduations`, { params })
            .pipe(
                take(1),
                catchError(this.handleError.bind(this))
            );
    }

}