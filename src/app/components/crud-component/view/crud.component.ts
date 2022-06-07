import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractService } from 'src/app/core/entities/abstract.service';

@Component({
  selector: 'app-crud-component',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent<Dto> implements OnInit {

  @Input() showDetailButton: boolean = false;
  @Input() defaultSortField: string;
  @Input() dataKey: string;
  @Input() showSelectionComponent: boolean = true;
  @Input() columns: { field: string, header: string, nested?: boolean }[];
  @Input() totalRecordsMessage: string;
  @Input() noRecordsMessage: string;
  @Input() errorMessage: string;
  @Input() service: AbstractService<Dto, any>;
  private _selectedData: any;
  public get selectedData(): any {
    return this._selectedData;
  }
  @Input()
  public set selectedData(value: any) {
    this._selectedData = value;
    this.selectedDataChange.next(value);
  }
  @Output() selectedDataChange = new EventEmitter<any>();
  @Output() deleteSelected = new EventEmitter();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
  }

  public openNew(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  public edit(): void {
    this.router.navigate(['new'], { relativeTo: this.route, state: { 'entity': this.selectedData[0] } });
  }
  
  public detail(): void {
    this.router.navigate(['detail'], { relativeTo: this.route, state: { 'entity': this.selectedData[0] } });
  }

  public onDeleteSelected(): void {
    this.deleteSelected.emit();
    this.selectedData.forEach((data: any) => {
      this.service.delete(this.getDatakeyProperty(data)).subscribe({
        next: () => {
          // TODO Quando back estiver pronto ajustar isso aqui.
          // Excluir mais de um por vez
          console.log('Deleted!');
        },
        error: (error) => {
          console.log('Erro!', error);
        }
      });
    });
  }

  private getDatakeyProperty(data: any) {
    let result: any;
    if (this.dataKey.includes('.')) {
      result = data;
      this.dataKey.split('.').forEach((object: any) => {
        if (result != null && result != undefined) {
          result = result[object];
        }
      });
      return result;
    }
    return data[this.dataKey];
  }

}
