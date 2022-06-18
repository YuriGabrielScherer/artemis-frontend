import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { AssociationDto } from 'src/app/core/entities/association/association';
import { AssociationService } from 'src/app/core/entities/association/association.service';

import { PersonDto } from 'src/app/core/entities/person/person';
import { PersonService } from 'src/app/core/entities/person/person.service';
import { localDateToDate } from 'src/app/shared/utils/date-util';
import { EnumToastSeverity } from 'src/app/shared/utils/enum-toast-severity';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css'],
})
export class PersonFormComponent implements OnInit {

  public associationColumns: { field: string, header: string }[] = [
    { field: 'code', header: 'Código' },
    { field: 'name', header: 'Nome' },
  ];

  public gender: { label: string, value: string }[] = [
    { value: 'MALE', label: 'Masculino' },
    { value: 'FEMALE', label: 'Feminino' },
  ];
  public form: FormGroup;
  public isLoading: boolean = false;
  public personEdit?: PersonDto;
  public associationLabel: string = 'Selecione uma associação';

  private _associationSelected?: AssociationDto | undefined;
  public get associationSelected(): AssociationDto | undefined {
    return this._associationSelected;
  }
  public set associationSelected(value: AssociationDto | undefined) {
    if (!value) {
      this.associationLabel = 'Selecione uma associação';
    } else {
      this.associationLabel = `${value.code} - ${value.name}`;
    }
    this._associationSelected = value;
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private personService: PersonService,
    private messageService: MessageService,
    public associationService: AssociationService
  ) {
    const state = router.getCurrentNavigation()?.extras.state;
    if (!state || !state['entity']) {
      return;
    }
    const entity = state['entity'];
    this.personEdit = entity;
  }

  ngOnInit(): void {
    this.createForm();
  }

  public onSave(): void {
    if (this.form.invalid) {
      // TODO Mark all fields as dirty
      return;
    }

    this.isLoading = true;
    const payload = this.form.value;
    if (this.personEdit) {
      payload.code = this.personEdit!.code;
    }
    if (this.associationSelected) {
      payload.associationCode = this.associationSelected.code;
    }
    this.personService.save(payload)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(({
        next: () => {
          this.messageService.add({
            severity: EnumToastSeverity.SUCCESS,
            summary: 'Sucesso!',
            detail: 'Usuário salvo com sucesso.'
          });
          this.router.navigate(['person']);
        }, error: (error) => {
          // TODO Mark Fields as Dirty
          console.log('Error: ', error);
        }
      }))
  }

  public onDelete(): void {
    if (!this.personEdit) {
      return;
    }
    this.isLoading = true;
    this.personService.delete(this.personEdit.code)
      .pipe(
        finalize(() => this.isLoading = false)
      ).subscribe({
        next: () => {
          this.messageService.add({
            severity: EnumToastSeverity.SUCCESS,
            summary: 'Sucesso',
            detail: 'Usuário excluído com sucesso.',
          });
          this.router.navigate(['person']);
        },
        error: (error) => {
          console.log('Error: ', error);
        }
      });
  }

  public onCancel(): void {
    this.router.navigate(['person']);
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      code: [{ value: this.personEdit?.code, disabled: true }, Validators.compose([Validators.min(1)])],
      name: [this.personEdit?.name, Validators.compose([Validators.required])],
      gender: [this.personEdit?.gender ?? this.gender[0].value, Validators.compose([Validators.required])],
      // TODO Validar o CPF
      document: [this.personEdit?.document],
      birth: [localDateToDate(this.personEdit?.birth), Validators.compose([])],
      associationCode: [this.personEdit?.association?.code, Validators.compose([Validators.min(1)])],
    });

    if (this.personEdit && this.personEdit.association) {
      this.associationSelected = this.personEdit!.association;
    }
  }
}
