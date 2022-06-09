import { Component } from '@angular/core';
import { GeneralTableColumnsInput } from 'src/app/components/general-table/view/general-table.component';
import { AthleteDto } from 'src/app/core/entities/athlete/athlete';
import { AthleteService } from 'src/app/core/entities/athlete/athlete.service';

@Component({
  selector: 'app-athlete-list',
  templateUrl: './athlete-list.component.html',
  styleUrls: ['./athlete-list.component.css']
})
export class AthleteListComponent {

  public columns: GeneralTableColumnsInput[] = [
    { field: 'person.code', header: 'Código' },
    { field: 'person.name', header: 'Nome' },
    { field: 'person.association.name', header: 'Associação' },
    { field: 'person.association.city', header: 'Cidade' },
    { field: 'currentBelt', header: 'Graduação', enum: 'belt' },
    { field: 'since', header: 'Início', date: true },
  ];
  public selectedData: AthleteDto;

  constructor(
    public athleteService: AthleteService,
  ) { }

}
