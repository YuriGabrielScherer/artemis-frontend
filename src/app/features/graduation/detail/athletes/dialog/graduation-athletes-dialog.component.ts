import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { finalize, Observable } from 'rxjs';

import { GeneralTableColumnsInput } from 'src/app/components/general-table/view/general-table.component';
import { AbstractListComponent } from 'src/app/shared/abstract-list-component/abstract-list-component';
import { RequestParticipationInput } from 'src/app/core/entities/graduation/graduation';
import { GraduationService } from 'src/app/core/entities/graduation/graduation.service';
import { AthleteService } from 'src/app/core/entities/athlete/athlete.service';
import { PageableResponse } from 'src/app/core/entities/pageable/pageable';
import { AthleteDto } from 'src/app/core/entities/athlete/athlete';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
    selector: 'app-graduation-athletes-dialog',
    templateUrl: 'graduation-athletes-dialog.component.html'
})
export class GraduationAthletesDialogComponent extends AbstractListComponent<AthleteDto> implements OnInit {

    @Input()
    public graduationCode: number;

    @Output()
    public closeModal: EventEmitter<void> = new EventEmitter();

    @Output()
    public athletesAdded: EventEmitter<void> = new EventEmitter();

    public columns: GeneralTableColumnsInput[] = [
        { field: 'person.code', header: 'Código' },
        { field: 'person.name', header: 'Nome' },
        { field: 'person.association.name', header: 'Associação' },
    ];
    public athletesSelected: AthleteDto[] = [];

    public get dialogVisible(): boolean {
        return this._dialogVisible;
    }
    public set dialogVisible(value: boolean) {
        if (!value) {
            this.closeModal.emit();
        }
        this._dialogVisible = value;
    }

    private _dialogVisible: boolean = true;

    constructor(
        private athleteService: AthleteService,
        private graduationService: GraduationService,
        private toastService: ToastService,
    ) { super(); }


    public ngOnInit() {
    }

    public toggleCheckBox(event: MouseEvent): void {
        event.stopPropagation();
    }

    public onHideModal(): void {
        this.closeModal.emit();
    }

    public onAssociate(): void {
        this.isLoading = true;

        const payload: RequestParticipationInput = {
            graduationCode: this.graduationCode,
            athletes: this.athletesSelected.map(athlete => athlete.person.code),
        };

        this.graduationService.requestParticipation(payload)
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: (response) => {
                    if (response != undefined && response.length > 0) {
                        this.toastService.warning('Alguns atletas não puderam ser vinculados ao exame de graduação.');
                    } else {
                        this.toastService.success('Atletas vinculados com sucesso ao exame de graduação.');
                    }
                    this.athletesAdded.emit();
                    this.dialogVisible = false;
                }, error: (error) => {
                    // TODO Something else here.
                }
            });
    }

    protected endpoint(): Observable<PageableResponse<AthleteDto>> {
        return this.athleteService.listAvailableAthletesToGraduation(this.graduationCode, this.pageable);
    }

}