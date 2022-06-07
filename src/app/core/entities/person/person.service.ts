import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

import { AbstractService } from '../abstract.service';
import { PersonDto, PersonSaveInput } from './person';

@Injectable({ providedIn: 'root' })
export class PersonService extends AbstractService<PersonDto, PersonSaveInput> {
    constructor(protected http: HttpClient, protected messageService: MessageService,) {
        super(http, messageService, 'person');
    }
}