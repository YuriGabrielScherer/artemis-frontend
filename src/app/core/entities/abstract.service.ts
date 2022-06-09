import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, take, throwError } from 'rxjs';

import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { PageableRequest, PageableResponse } from './pageable/pageable';
import { EnumToastSeverity } from 'src/app/shared/utils/enum-toast-severity';

export abstract class AbstractService<Dto, SaveInput> {
    constructor(
        protected httpClient: HttpClient,
        protected toastService: MessageService,
        protected urlFragment: string,
    ) { }

    public getUrl(): string {
        return `${environment.urlBackend}${this.urlFragment}`;
    }

    public save(input: SaveInput): Observable<Dto> {
        return this.httpClient.post<Dto>(
            `${this.getUrl()}/save`,
            input
        ).pipe(
            take(1),
            catchError(this.handleError.bind(this))
        );
    }

    public findByCode(code: number) {
        return this.httpClient.get<Dto>(
            `${this.getUrl()}/${code}`,
        ).pipe(
            take(1),
            catchError(this.handleError.bind(this))
        );
    }

    public find(input: PageableRequest, filter?: any): Observable<PageableResponse<Dto>> {
        
        let params = new HttpParams().set('pageable', JSON.stringify(input));
        if (filter != undefined) {
            params = params.set('filter', JSON.stringify(filter));
        }

        return this.httpClient.get<PageableResponse<Dto>>(`${this.getUrl()}/list`, {
            params,
        }).pipe(
            take(1),
            catchError(this.handleError.bind(this))            
        );
    }

    public findAll(): Observable<Dto[]> {
        return this.httpClient.get<Dto[]>(`${this.getUrl()}/findAll`)
            .pipe(
                take(1),
                catchError(this.handleError.bind(this))
            );
    }

    public delete(code: number): Observable<boolean> {
        return this.httpClient.delete<boolean>(`${this.getUrl()}/${code}`)
            .pipe(
                take(1),
                catchError(this.handleError.bind(this))
            );
    }

    protected handleError(error: HttpErrorResponse) {

        const { message } = error.error;

        const title = this.getTitleFromStatus(error.status);
        this.toastService.add({
            severity: EnumToastSeverity.ERROR,
            summary: title,
            detail: message ?? 'Erro ao processar sua requisição.',
        });

        return throwError(() => error);
    }

    private getTitleFromStatus(status: number): string {
        if (status == 400) {
            return 'Requisição inválida.';
        }

        return 'Erro interno no servidor.';
    }
}