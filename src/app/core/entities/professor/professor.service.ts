import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, take } from 'rxjs';
import { AbstractService } from '../abstract.service';
import { PageableRequest, PageableResponse } from '../pageable/pageable';
import { ProfessorDto, ProfessorSaveInput } from './professor';

@Injectable({ providedIn: 'root' })
export class ProfessorService extends AbstractService<ProfessorDto, ProfessorSaveInput> {
    constructor(
        protected http: HttpClient,
        protected messageService: MessageService,
    ) {
        super(http, messageService, 'professor');
    }

    public listAvailableProfessorsByGraduation(graduationCode: number, pageable: PageableRequest): Observable<PageableResponse<ProfessorDto>> {
        const params = new HttpParams().set('pageable', JSON.stringify(pageable));
        return this.http.get<PageableResponse<ProfessorDto>>(
            `${super.getUrl()}/listAvailableProfessorsToGraduation`, {
            params: params.set('graduationCode', graduationCode)

        })
            .pipe(take(1));
    }

}