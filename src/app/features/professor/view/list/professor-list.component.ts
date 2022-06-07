import { Component, OnInit } from '@angular/core';
import { GeneralTableColumnsInput } from 'src/app/components/general-table/view/general-table.component';
import { ProfessorDto } from 'src/app/core/entities/professor/professor';
import { ProfessorService } from 'src/app/core/entities/professor/professor.service';

@Component({
  selector: 'app-professor-list',
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.css']
})
export class ProfessorListComponent implements OnInit {


  public columns: GeneralTableColumnsInput[] = [
    { field: 'person.code', header: 'Código' },
    { field: 'person.name', header: 'Nome' },
    { field: 'person.association.name', header: 'Nome' },
  ];
  public selectedData: ProfessorDto[] = [];

  constructor(
    public professorService: ProfessorService,
  ) { }

  ngOnInit(): void {
  }

}
