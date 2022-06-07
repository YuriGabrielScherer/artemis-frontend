import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { finalize, Observable } from 'rxjs';

import { GeneralTableColumnsInput } from 'src/app/components/general-table/view/general-table.component';
import { PageableResponse } from 'src/app/core/entities/pageable/pageable';
import { ProfessorDto } from 'src/app/core/entities/professor/professor';

import { GraduationService } from 'src/app/core/entities/graduation/graduation.service';
import { AbstractListComponent } from 'src/app/shared/abstract-list-component/abstract-list-component';
import { MessageService } from 'primeng/api';
import { EnumToastSeverity } from 'src/app/shared/utils/enum-toast-severity';
import { GraduationDto } from 'src/app/core/entities/graduation/graduation';
import { EnumGraduationSituation } from 'src/app/core/enums/enum-graduation-situation';

@Component({
    selector: 'app-graduation-professors',
    templateUrl: 'graduation-professors.component.html'
})
export class GraduationProfessorsComponent extends AbstractListComponent<ProfessorDto> implements OnInit, OnChanges {

    @Input()
    public graduation: GraduationDto;

    public canAssociate: boolean;
    public showModalSelect: boolean = false;
    public columns: GeneralTableColumnsInput[] = [
        { field: 'person.code', header: 'Código' },
        { field: 'person.name', header: 'Nome' },
        { field: 'person.association.name', header: 'Associação' },
    ];

    protected endpoint: Observable<PageableResponse<ProfessorDto>>;
    protected override onSuccess?: Function | undefined;
    protected override onError?: Function | undefined;

    public professorsSelected: ProfessorDto[] = [];

    constructor(
        private graduationService: GraduationService,
        private messageService: MessageService,
    ) { super(); }

    ngOnInit(): void {
        this.canAssociate = ![EnumGraduationSituation.CANCELED, EnumGraduationSituation.FINISHED].includes(this.graduation.situation);
        this.endpoint = this.graduationService.listProfessors(this.graduation.code, this.pageable);
    }
    
    ngOnChanges(changes: SimpleChanges): void {
        const graduationChange = changes['graduation'];
        if (graduationChange) {
            this.canAssociate = ![EnumGraduationSituation.CANCELED, EnumGraduationSituation.FINISHED].includes(this.graduation.situation);
            this.graduation = graduationChange.currentValue;
        }
    }

    public onRemoveProfessor(professor: ProfessorDto): void {
        // TODO Modal Confirmation
        this.isLoading = true;
        this.graduationService.removeProfessor({ graduationsCode: [this.graduation.code], professorsCode: [professor.person.code] })
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: () => {
                    this.messageService.add({
                        severity: EnumToastSeverity.SUCCESS,
                        summary: 'Sucesso!',
                        detail: 'Professor removido com sucesso.'
                    });
                    this.pageable.page = 0;
                    this.fetchData();
                }
            });
    }

    public onOpenModal(): void {
        this.showModalSelect = true;
    }

    public onHideDialog(): void {
        this.showModalSelect = false;
    }

    public onAssociateProfessors(): void {
        this.isLoading = true;
        this.pageable = { page: 0, size: 10 };
        this.fetchData();
    }
}