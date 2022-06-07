import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, ObservableLike, take } from 'rxjs';

import { AbstractService } from '../abstract.service';

import {
    GraduationDto,
    GraduationSaveInput,
    ListGraduationGradesOutput,
    RegisterProfessorsInput,
    RemoveProfessorsInput,
    RequestParticipationInput,
    SetGraduationGradesInput,
    UpdateSituationInput
} from './graduation';
import { PageableRequest, PageableResponse } from '../pageable/pageable';
import { AthleteGraduationDto } from './athlete_graduation/athlete-graduation';
import { ProfessorDto } from '../professor/professor';
import { MessageService } from 'primeng/api';
import { AthleteDto } from '../athlete/athlete';

@Injectable({ providedIn: 'root' })
export class GraduationService extends AbstractService<GraduationDto, GraduationSaveInput> {
    constructor(protected http: HttpClient, protected messageService: MessageService) {
        super(http, messageService, 'graduation')
    }

    public listGraduationGrades(graduationCode: number, pageable: PageableRequest): Observable<PageableResponse<ListGraduationGradesOutput>> {
        return this.http.get<PageableResponse<ListGraduationGradesOutput>>(`${super.getUrl()}/listGraduationGrades`,
            {
                params: new HttpParams() //
                    .set('graduationCode', graduationCode)
                    .set('page', pageable.page)
                    .set('size', pageable.size),
            }).pipe(
                take(1),
                catchError(this.handleError.bind(this)),
            );
    }

    public setGraduationGrades(payload: SetGraduationGradesInput): Observable<void> {
        return this.http.post<void>(`${super.getUrl()}/setGraduationGrades`, payload)
            .pipe(take(1), catchError(this.handleError.bind(this)));
    }

    public listProfessors(graduationCode: number, input: PageableRequest): Observable<PageableResponse<ProfessorDto>> {
        return this.http.get<PageableResponse<ProfessorDto>>(`${super.getUrl()}/listProfessors`,
            {
                params: new HttpParams() //
                    .set('graduationCode', graduationCode)
                    .set('page', input.page)
                    .set('size', input.size),
            }
        ).pipe(
            take(1),
            catchError(this.handleError.bind(this))
        );
    }

    public listAthletes(graduationCode: number, input: PageableRequest): Observable<PageableResponse<AthleteGraduationDto>> {
        return this.http.get<PageableResponse<AthleteGraduationDto>>(`${super.getUrl()}/listAthletes`,
            {
                params: new HttpParams() //
                    .set('graduationCode', graduationCode)
                    .set('page', input.page)
                    .set('size', input.size),
            }
        ).pipe(
            take(1),
            catchError(this.handleError.bind(this))
        );
    }

    public registerProfessors(payload: RegisterProfessorsInput): Observable<void> {
        return this.http.post<void>(`${super.getUrl()}/registerProfessors`, payload)
            .pipe(
                take(1),
                catchError(this.handleError.bind(this))
            );
    }

    public removeProfessor(payload: RemoveProfessorsInput): Observable<void> {
        return this.http.post<void>(`${super.getUrl()}/removeProfessors`, payload)
            .pipe(
                take(1),
                catchError(this.handleError.bind(this))
            );
    }

    public requestParticipation(payload: RequestParticipationInput): Observable<void> {
        return this.http.post<void>(`${super.getUrl()}/requestParticipation`, payload)
            .pipe(
                take(1),
                catchError(this.handleError.bind(this))
            );
    }

    public updateSituation(payload: UpdateSituationInput): Observable<void> {
        return this.http.post<void>(`${super.getUrl()}/updateStatus`, { code: payload.code, situation: payload.situation })
            .pipe(
                take(1),
                catchError(this.handleError.bind(this)),
            );
    }

    public removeAthletes(payload: RequestParticipationInput): Observable<void> {
        return this.http.post<void>(`${super.getUrl()}/removeAthletes`, {
            graduationCode: payload.graduationCode,
            athletes: payload.athletes,
        })
            .pipe(
                take(1),
                catchError(this.handleError.bind(this))
            );
    }

    public verifyAllGradesSet(graduationCode: number): Observable<AthleteDto[]> {
        return this.http.get<AthleteDto[]>(`${super.getUrl()}/verifyAllGradesSet`, {
            params: new HttpParams() //
                .set('graduationCode', graduationCode)
        }).pipe(
            take(1),
            catchError(this.handleError.bind(this))
        );
    }

}