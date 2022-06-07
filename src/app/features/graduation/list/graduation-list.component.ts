import { Component, OnInit } from '@angular/core';

import { GeneralTableColumnsInput } from 'src/app/components/general-table/view/general-table.component';
import { GraduationDto } from 'src/app/core/entities/graduation/graduation';
import { GraduationService } from 'src/app/core/entities/graduation/graduation.service';

@Component({
  selector: 'app-graduation-list',
  templateUrl: './graduation-list.component.html',
  styleUrls: ['./graduation-list.component.css']
})
export class GraduationListComponent implements OnInit {

  public columns: GeneralTableColumnsInput[] = [
    { field: 'code', header: 'Código' },
    { field: 'title', header: 'Título' },
    { field: 'description', header: 'Descrição' },
    { field: 'situation', header: 'Situação', enum: 'graduationSituation' },
    { field: 'date', header: 'Data', date: true },
  ];
  public selectedData?: GraduationDto;

  constructor(
    public graduationService: GraduationService
  ) { }

  ngOnInit(): void {
  }

}
