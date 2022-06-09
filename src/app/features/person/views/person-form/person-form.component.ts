import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';

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

  public gender: { label: string, value: string }[] = [
    { value: 'MALE', label: 'Masculino' },
    { value: 'FEMALE', label: 'Feminino' },
  ];
  public form: FormGroup;
  public isLoading: boolean = false;
  public personEdit?: PersonDto;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private personService: PersonService,
    private messageService: MessageService,
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
    this.personService.save(payload)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(({
        next: (response) => {
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
    // TODO Confirmação exclusão
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
          // TODO Toast
          console.log('Error: ', error);
        }
      });
  }

  public onCancel(): void {
    this.router.navigate(['person']);
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      code: [{ value: this.personEdit?.code, disabled: this.personEdit != undefined }, Validators.compose([Validators.required, Validators.min(1)])],
      name: [this.personEdit?.name, Validators.compose([Validators.required])],
      gender: [this.personEdit?.gender, Validators.compose([Validators.required])],
      // TODO Validar o CPF
      document: [this.personEdit?.document],
      birth: [localDateToDate(this.personEdit?.birth), Validators.compose([])],
      associationCode: [this.personEdit?.association?.code, Validators.compose([Validators.min(1)])],
    });
  }
}
