import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { GraduationDto, GraduationSaveInput } from 'src/app/core/entities/graduation/graduation';
import { GraduationService } from 'src/app/core/entities/graduation/graduation.service';

import { localDateToDate } from 'src/app/shared/utils/date-util';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-graduation-form',
  templateUrl: './graduation-form.component.html',
  styleUrls: ['./graduation-form.component.css']
})
export class GraduationFormComponent implements OnInit {

  public form: FormGroup;
  public isLoading: boolean = false;
  public graduation?: GraduationDto;
  public today = new Date();

  constructor(
    private graduationService: GraduationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (!state) {
      return;
    }

    this.graduation = state['entity'];
  }

  ngOnInit(): void {
    this.createForm();
  }

  public onSave(): void {
    if (this.form.invalid) {
      // TODO Mark All fields.
      return;
    }
    this.isLoading = true;

    const payload: GraduationSaveInput = this.form.value;

    if (this.graduation) {
      payload.code = this.graduation.code;
    }

    this.graduationService.save(payload)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          this.toastService.success('Exame de Graduação salvo com sucesso.');
          this.router.navigate(['/graduation']);
        },
        error: (error) => {
          // TODO Mark all fields dirty
          console.log('Error: ', error);
        }
      });
  }

  public onCancel(): void {
    this.router.navigate(['/graduation']);
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      code: [{ value: this.graduation?.code, disabled: true }, Validators.compose([Validators.min(1)])],
      title: [this.graduation?.title, Validators.compose([Validators.required])],
      description: [this.graduation?.description],
      place: [this.graduation?.place],
      date: [localDateToDate(this.graduation?.date), Validators.compose([Validators.required])],
    });
  }

}
