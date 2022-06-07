import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { GraduationService } from 'src/app/core/entities/graduation/graduation.service';
import { ConfirmationService, MessageService } from 'primeng/api';

import { EnumGraduationSituation, GraduationSituation } from 'src/app/core/enums/enum-graduation-situation';
import { EnumToastSeverity } from 'src/app/shared/utils/enum-toast-severity';
import { GraduationDto } from 'src/app/core/entities/graduation/graduation';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
    selector: 'app-graduation-detail',
    templateUrl: 'graduation-detail.component.html',
    styleUrls: ['./graduation-detail.component.css']
})
export class GraduationDetailComponent implements OnInit {

    public graduation: GraduationDto;
    public enumSituation = EnumGraduationSituation;
    public steps: { label: string, color: string, icon: IconProp }[];
    public isLoading: boolean = false;

    constructor(
        private router: Router,
        private graduationService: GraduationService,
        private toast: MessageService,
        private confirmationService: ConfirmationService,
    ) {
        const state = this.router.getCurrentNavigation()?.extras.state;
        if (!state) {
            this.router.navigate(['/graduation']);
            return;
        }

        this.graduation = state['entity'];
    }

    ngOnInit() {
        this.createSteps();
    }

    public onGoBack(): void {
        this.router.navigate(['graduation']);
    }

    public updateSituation(newSituation: EnumGraduationSituation): void {

        if (newSituation == EnumGraduationSituation.FINISHED) {
            this.verifyCanFinish();
        } else {
            this.onUpdateStatus(newSituation);
        }
    }

    private createSteps(): void {
        this.steps = GraduationSituation.getTimeline(this.graduation.history);
    }

    private verifyCanFinish(): void {
        this.isLoading = true;
        this.graduationService.verifyAllGradesSet(this.graduation.code)
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: (response) => {
                    if (response.length == 0) {
                        this.onUpdateStatus(EnumGraduationSituation.FINISHED);
                        return;
                    }

                    this.confirmationService.confirm({
                        message: `Existem ${response.length} atletas que não possuem notas. Eles serão considerados faltantes e serão reprovados. Deseja continuar?`,
                        acceptLabel: 'Sim',
                        acceptButtonStyleClass: 'p-button-outlined p-button-prymary',
                        rejectLabel: 'Não',
                        rejectButtonStyleClass: 'p-button-outlined p-button-secondary',
                        accept: () => {
                            this.onUpdateStatus(EnumGraduationSituation.FINISHED);
                        },
                    });
                }, error: (error) => {
                    // Do something here
                }
            })
    }

    private onUpdateStatus(newSituation: EnumGraduationSituation): void {
        this.isLoading = true;
        this.graduationService.updateSituation({ code: this.graduation.code, situation: newSituation })
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: () => {
                    this.graduation = { ... this.graduation, situation: newSituation };
                    this.graduation.history.push({ situation: newSituation, date: new Date() });
                    this.createSteps();
                    this.toast.add({
                        severity: EnumToastSeverity.SUCCESS,
                        summary: 'Sucesso!',
                        detail: 'Situação atualizada com sucesso.'
                    });
                },
                error: (error) => {
                    console.log('An Error Occurs!');
                }
            });
    }

}