import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { finalize, Observable } from 'rxjs';

import { GeneralTableColumnsInput } from 'src/app/components/general-table/view/general-table.component';
import { GraduationService } from 'src/app/core/entities/graduation/graduation.service';
import { PageableResponse } from 'src/app/core/entities/pageable/pageable';
import { ProfessorDto } from 'src/app/core/entities/professor/professor';
import { ProfessorService } from 'src/app/core/entities/professor/professor.service';
import { AbstractListComponent } from 'src/app/shared/abstract-list-component/abstract-list-component';
import { EnumToastSeverity } from 'src/app/shared/utils/enum-toast-severity';

@Component({
    selector: 'app-graduation-professors-dialog',
    templateUrl: 'graduation-professors-dialog.component.html'
})
export class GraduationProfessorsDialogComponent extends AbstractListComponent<ProfessorDto> implements OnInit {

    @Input() graduationCode: number;
    @Output() associateProfessors: EventEmitter<void> = new EventEmitter();
    @Output() hideDialog: EventEmitter<void> = new EventEmitter();

    public professorsSelected: ProfessorDto[] = [];
    public columns: GeneralTableColumnsInput[] = [
        { field: 'person.code', header: 'Código' },
        { field: 'person.name', header: 'Nome' },
        { field: 'person.association.name', header: 'Associação' },
    ];

    protected endpoint: Observable<PageableResponse<ProfessorDto>>;

    public set showDialog(value: boolean) {
        this._showDialog = value;
        if (value == false) {
            this.hideDialog.emit();
        }
    }
    public get showDialog(): boolean {
        return this._showDialog;
    }
    private _showDialog: boolean = true;

    constructor(
        private graduationService: GraduationService,
        private professorService: ProfessorService,
        private messageService: MessageService,
    ) { super(); }

    ngOnInit() {
        this.endpoint = this.professorService.listAvailableProfessorsByGraduation(this.graduationCode, this.pageable);
    }

    public toggleCheckBox(event: MouseEvent): void {
        event.stopPropagation();
    }

    public onCancelModal(): void {
        this.showDialog = false;
    }

    public onAssociateProfessor(): void {
        const professorsCode = this.professorsSelected.map(prof => prof.person.code);
        this.graduationService.registerProfessors({ graduationsCode: [this.graduationCode!], professorsCode: professorsCode })
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: () => {
                    this.messageService.add({
                        severity: EnumToastSeverity.SUCCESS,
                        summary: 'Sucesso!',
                        detail: 'Professor vinculados com sucesso ao exame de graduação.'
                    });
                    this.professorsSelected = [];
                    this.associateProfessors.emit();
                    this.showDialog = false;
                }, error: (error) => {
                    console.log('Error:', error);
                    // TODO Something else
                }
            });
    }
}