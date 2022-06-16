import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { GeneralTableColumnsInput } from 'src/app/components/general-table/view/general-table.component';
import { AssociationDto, AssociationSaveInput } from 'src/app/core/entities/association/association';
import { PersonDto } from 'src/app/core/entities/person/person';
import { localDateToDate } from 'src/app/shared/utils/date-util';

import { AssociationService } from 'src/app/core/entities/association/association.service';
import { PersonService } from 'src/app/core/entities/person/person.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-association-form',
  templateUrl: './association-form.component.html',
  styleUrls: ['./association-form.component.css'],
  providers: [DatePipe]
})
export class AssociationFormComponent implements OnInit {

  public isEdit: boolean = false;
  public association?: AssociationDto;
  public isLoading: boolean = false;

  public form: FormGroup;

  public currentManager: PersonDto;
  private _selectedManager: PersonDto;
  public get selectedManager(): PersonDto {
    return this._selectedManager;
  }
  public set selectedManager(value: PersonDto) {
    this._selectedManager = value;
    if (!value) {
      return;
    }
    if (value == undefined) {
      this.form.controls['managerCode'].setValue(undefined);
      return;
    }

    this.form.controls['managerCode'].setValue(value.code);
    this.currentManager = value as PersonDto;
  }

  public managerColumns: GeneralTableColumnsInput[] = [
    { header: 'Código', field: 'code' },
    { header: 'Nome', field: 'name' },
  ];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private associationService: AssociationService,
    private toastService: ToastService,
    public personService: PersonService,

  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (!state) {
      return;
    }

    this.isEdit = true;
    this.association = state['entity'];
  }

  ngOnInit(): void {
    this.createForm();
  }

  public onSave(): void {
    if (this.form.invalid) {
      // TODO Mark All fields.
      return;
    }

    const payload: AssociationSaveInput = this.form.value;

    this.isLoading = true;
    this.associationService.save(payload)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          this.toastService.success('Associação salva com sucesso.');
          this.router.navigate(['/association']);
        },
        error: (error) => {
          // TODO Mark all fields dirty
          console.log('Error: ', error);
        }
      });
  }


  public onDelete(): void {
    this.isLoading = true;

    this.associationService.delete(this.association!.code)
      .pipe(
        finalize(() => this.isLoading = false)
      ).subscribe({
        next: () => {
          this.toastService.success('Associação excluída com sucesso.');
          this.router.navigate(['/association']);
        },
        error: (error) => {
          console.log('Error: ', error);
        }
      });
  }

  public onCancel(): void {
    this.router.navigate(['/association']);
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      code: [{ value: this.association?.code, disabled: true }, Validators.compose([Validators.min(0)])],
      name: [this.association?.name, Validators.compose([Validators.required, Validators.minLength(0)])],
      city: [this.association?.city, Validators.compose([Validators.required, Validators.minLength(0)])],
      since: [localDateToDate(this.association?.since)],
      managerCode: [this.association?.manager.code, Validators.compose([Validators.required, Validators.min(0)])],
    });

    if (this.association) {
      this.selectedManager = this.association.manager;
    }
  }

}
