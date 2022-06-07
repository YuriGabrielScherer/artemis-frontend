import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { AthleteService } from 'src/app/core/entities/athlete/athlete.service';
import { PersonService } from 'src/app/core/entities/person/person.service';
import { MessageService } from 'primeng/api';

import { GeneralTableColumnsInput } from 'src/app/components/general-table/view/general-table.component';
import { AthleteDto } from 'src/app/core/entities/athlete/athlete';
import { PersonDto } from 'src/app/core/entities/person/person';
import { localDateToDate } from 'src/app/shared/utils/date-util';
import { EnumToastSeverity } from 'src/app/shared/utils/enum-toast-severity';

@Component({
  selector: 'app-athlete-form',
  templateUrl: './athlete-form.component.html',
  styleUrls: ['./athlete-form.component.css']
})
export class AthleteFormComponent implements OnInit {

  // TODO: Validar para listar apenas usuários que não seja atletas

  public isLoading = false;
  public form: FormGroup;
  public athleteToEdit?: AthleteDto;
  public personColumns: GeneralTableColumnsInput[] = [
    { field: 'code', header: 'Código' },
    { field: 'name', header: 'Nome' },
    { field: 'document', header: 'Documento' },
    { field: 'association.name', header: 'Associação' },
  ];
  private _selectedPerson?: PersonDto | undefined;
  public get selectedPerson(): PersonDto | undefined {
    return this._selectedPerson;
  }
  public set selectedPerson(value: PersonDto | undefined) {
    this._selectedPerson = value;
    this.form.get('code')?.setValue(value?.code);
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private athleteService: AthleteService,
    private messageService: MessageService,
    public personService: PersonService
  ) {
    const state = router.getCurrentNavigation()?.extras.state;
    if (!state || !state['entity']) {
      return;
    }
    const entity = state['entity'];
    this.athleteToEdit = entity;
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
    this.athleteService.save(payload)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(({
        next: (response) => {
          this.messageService.add({
            severity: EnumToastSeverity.SUCCESS,
            summary: 'Sucesso!',
            detail: 'Atleta salvo com sucesso.',
          });
          this.router.navigate(['athlete']);
        }, error: (error) => {
          // TODO Mark Fields as Dirty
          console.log('Error: ', error);
        }
      }))
  }

  public onCancel(): void {
    this.router.navigate(['athlete']);
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      code: [this.athleteToEdit?.person.code, Validators.compose([Validators.required])],
      since: [localDateToDate(this.athleteToEdit?.since), Validators.compose([Validators.required])],
    });
  }

}
