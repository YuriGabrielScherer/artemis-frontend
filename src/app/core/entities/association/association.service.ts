import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AssociationDto, AssociationSaveInput, TopAssociation } from './association';
import { AbstractService } from '../abstract.service';
import { MessageService } from 'primeng/api';
import { catchError, Observable, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AssociationService extends AbstractService<AssociationDto, AssociationSaveInput>{

    constructor(protected http: HttpClient, protected messageService: MessageService) {
        super(http, messageService, 'association');
    }

    public listTopAssociationsByAthletes(): Observable<TopAssociation[]> {
        return this.http.get<TopAssociation[]>(`${super.getUrl()}/listTopAssociationsByAthletes`)
            .pipe(
                take(1),
                catchError(this.handleError.bind(this))
            );
    }

}