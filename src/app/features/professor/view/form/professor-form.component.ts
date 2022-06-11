import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { GeneralTableColumnsInput } from 'src/app/components/general-table/view/general-table.component';
import { PersonDto } from 'src/app/core/entities/person/person';
import { PersonService } from 'src/app/core/entities/person/person.service';
import { ProfessorDto } from 'src/app/core/entities/professor/professor';
import { ProfessorService } from 'src/app/core/entities/professor/professor.service';
import { EnumToastSeverity } from 'src/app/shared/utils/enum-toast-severity';

@Component({
  selector: 'app-professor-form',
  templateUrl: './professor-form.component.html',
  styleUrls: ['./professor-form.component.css']
})
export class ProfessorFormComponent implements OnInit {

  public isLoading: boolean = false;
  public form: FormGroup;
  public professorToEdit?: ProfessorDto;
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
    private professorService: ProfessorService,
    private messageService: MessageService,
    public personService: PersonService,
  ) {
    const state = router.getCurrentNavigation()?.extras.state;
    if (!state || !state['entity']) {
      return;
    }
    const entity = state['entity'];
    this.professorToEdit = entity;
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
    this.professorService.save(payload)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(({
        next: () => {
          this.messageService.add({
            severity: EnumToastSeverity.SUCCESS,
            summary: 'Sucesso!',
            detail: 'Professor salvo com sucesso.',
          });
          this.router.navigate(['professor']);
        }, error: (error) => {
          // TODO Mark Fields as Dirty
          console.log('Error Saving Professor: ', error);
        }
      }))
  }

  public onCancel(): void {
    this.router.navigate(['professor']);
  }


  private createForm(): void {
    this.form = this.formBuilder.group({
      code: [this.professorToEdit?.person.code, Validators.compose([Validators.required])],
    });
  }

}
