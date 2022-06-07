import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { finalize } from 'rxjs';

import { GraduationDto, SetGraduationGradeProfessorAthlete, SetGraduationGradesInput } from 'src/app/core/entities/graduation/graduation';
import { GraduationService } from 'src/app/core/entities/graduation/graduation.service';
import { PageableRequest } from 'src/app/core/entities/pageable/pageable';
import { ProfessorDto } from 'src/app/core/entities/professor/professor';
import { EnumGraduationSituation } from 'src/app/core/enums/enum-graduation-situation';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
    selector: 'app-graduation-grades',
    templateUrl: 'graduation-grades.component.html',
    styleUrls: ['./graduation-grades.component.css']
})

export class GraduationGradesComponent implements OnInit, OnChanges {

    @Input() graduation: GraduationDto;

    public records: any[] = [];
    public isLoading: boolean = true;
    public pageable: PageableRequest = { page: 0, size: 10 };
    public totalRecords: number;
    public firstDataLoaded: boolean = false;
    public hasError: boolean = false;

    public canEdit: boolean = false;

    public professorsLoaded: boolean = false;
    public errorLoadingProfessors: boolean = false;
    public columns: { header: string, field: string }[] = [];
    private professors: ProfessorDto[] = [];

    constructor(
        private graduationService: GraduationService,
        private toast: ToastService,
    ) { }

    ngOnInit() {
        this.canEdit = this.graduation.situation == EnumGraduationSituation.CLOSE_SUBSCRIPTION;
        this.searchProfessors();
    }

    ngOnChanges(changes: SimpleChanges): void {
        const graduationChange = changes['graduation'];
        if (graduationChange) {
            this.graduation = graduationChange.currentValue;
            this.canEdit = this.graduation.situation == EnumGraduationSituation.CLOSE_SUBSCRIPTION;
        }
    }

    public onSave(): void {

        if (!this.canEdit) {
            return;
        }

        const payload = this.createPayloadWithGrade();

        this.isLoading = true;
        this.graduationService.setGraduationGrades(payload)
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: () => {
                    this.toast.success('Notas atribuídas com sucesso!');
                }, error: (error) => {
                    console.log('Error', error);
                }
            });
    }

    public onRetry(): void {
        this.pageable = { page: 0, size: 10 };
        this.isLoading = true;
        this.firstDataLoaded = false;
    }

    public loadDataLazy(event: LazyLoadEvent): void {
        this.pageable.size = event.rows ?? 10;
        this.pageable.page = (event.first ?? 0) / (this.pageable.size ?? 10);
        this.fetchData();
    }

    private fetchData(): void {
        this.isLoading = true;
        this.graduationService.listGraduationGrades(this.graduation.code, this.pageable)
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: (response) => {
                    response.records.forEach(athlete => {
                        const grade: any = { athlete: athlete.athlete };
                        athlete.grades.forEach(athleteGrade => {
                            grade[athleteGrade.professor.person.code] = athleteGrade.grade;
                        });
                        this.records.push(grade);
                    });
                    this.totalRecords = response.totalRecords;
                    this.hasError = false;
                    this.firstDataLoaded = true;
                },
                error: (error) => {
                    console.log('Error: ', error);
                    this.hasError = true;
                    this.totalRecords = 0;
                    this.records = [];
                }
            })
    }

    public searchProfessors(): void {
        this.isLoading = true;
        this.graduationService.listProfessors(this.graduation.code, { page: 0, size: 99 })
            .subscribe({
                next: (data) => {
                    this.professors = data.records;
                    this.createColumns();
                    this.errorLoadingProfessors = false;
                },
                error: (error) => {
                    this.errorLoadingProfessors = true;
                }
            })
    }

    private createColumns(): void {
        const professorColumns = this.professors.map(prof => ({ field: prof.person.code.toString(), header: prof.person.name }));
        this.columns = [
            { header: 'Atleta', field: 'athlete' },
            ...professorColumns,
        ];
        this.professorsLoaded = true;
    }

    private createPayloadWithGrade(): SetGraduationGradesInput {
        const payload: SetGraduationGradesInput = {
            graduationCode: this.graduation.code,
            grades: [],
        };

        this.records.forEach(rec => {
            Object.keys(rec).forEach(key => {
                if (key != 'athlete') {
                    const grade: SetGraduationGradeProfessorAthlete = {
                        athleteCode: rec.athlete.person.code,
                        professorCode: Number(key),
                        grade: rec[key],
                    };
                    payload.grades.push(grade);
                }
            });
        });

        return payload;
    }
}