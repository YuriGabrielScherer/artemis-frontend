import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AbstractService } from '../abstract.service';
import { BeltDto, BeltSaveInput } from './belt';

@Injectable({ providedIn: 'root' })
export class BeltService extends AbstractService<BeltDto, BeltSaveInput> {
    constructor(protected http: HttpClient, protected messageService: MessageService) {
        super(http, messageService, 'belt');
    }

}