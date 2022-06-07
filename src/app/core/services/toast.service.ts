import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EnumToastSeverity } from 'src/app/shared/utils/enum-toast-severity';

@Injectable({ providedIn: 'root' })
export class ToastService {

    constructor(
        private messageService: MessageService,
    ) { }

    public success(description: string): void {
        this.messageService.add({
            severity: EnumToastSeverity.SUCCESS,
            summary: 'Sucesso',
            detail: description,
        });
    }

}