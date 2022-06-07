import { Component } from '@angular/core';

import { AssociationService } from 'src/app/core/entities/association/association.service';
import { AssociationDto } from 'src/app/core/entities/association/association';

@Component({
  selector: 'app-association',
  templateUrl: './association.component.html',
  styleUrls: ['./association.component.css']
})
export class AssociationComponent {

  public selectedData: AssociationDto[] = [];
  public columns: { field: string, header: string, nested?: boolean }[] = [
    { field: 'code', header: 'Código' },
    { field: 'name', header: 'Nome' },
    { field: 'city', header: 'Cidade' },
    { field: 'manager.name', header: 'Responsável'},
  ];

  constructor(
    public associationService: AssociationService
  ) { }
}
