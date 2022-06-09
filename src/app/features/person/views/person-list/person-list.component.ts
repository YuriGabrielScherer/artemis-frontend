import { Component, OnInit } from '@angular/core';

import { GeneralTableColumnsInput } from 'src/app/components/general-table/view/general-table.component';
import { PersonDto } from 'src/app/core/entities/person/person';
import { PersonService } from 'src/app/core/entities/person/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  public columns: GeneralTableColumnsInput[] = [
    { field: 'code', header: 'Código' },
    { field: 'name', header: 'Nome' },
    { field: 'document', header: 'Documento'},
    { field: 'gender', header: 'Sexo', enum: 'gender' },
    { field: 'birth', header: 'Data de Nascimento', date: true },
  ];
  public selectedData: PersonDto[] = [];

  constructor(
    public personService: PersonService,
  ) { }

  ngOnInit(): void {
  }

}
