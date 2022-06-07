import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AssociationDto, AssociationSaveInput } from './association';
import { AbstractService } from '../abstract.service';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class AssociationService extends AbstractService<AssociationDto, AssociationSaveInput>{

    constructor(protected http: HttpClient, protected messageService: MessageService) {
        super(http, messageService, 'association');
    }

}