import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { finalize } from 'rxjs';

import { LazyLoadEvent } from 'primeng/api';
import { AbstractService } from 'src/app/core/entities/abstract.service';
import { PageableRequest } from 'src/app/core/entities/pageable/pageable';

export interface GeneralTableColumnsInput {
  field: string,
  header: string,
  date?: boolean,
  enum?: 'belt' | 'graduationSituation' | undefined,
}

@Component({
  selector: 'app-general-table',
  templateUrl: './general-table.component.html',
  styleUrls: ['./general-table.component.css']
})
export class GeneralTableComponent<Dto> implements OnInit {

  @Input() singleSelection: boolean = false;
  @Input() rows: number = 10;
  @Input() rowsPerPage: number[] = [10, 25, 50];
  @Input() defaultSortField: string = 'code';
  @Input() dataKey: string = 'code';
  @Input() showSelectionComponent: boolean = true;
  @Input() columns: GeneralTableColumnsInput[];
  @Input() totalRecordsMessage: string = ' Registros cadastrados.';
  @Input() noRecordsMessage: string = 'Nenhum registro encontrado.';
  @Input() errorMessage: string = 'Erro ao realizar sua consulta';
  @Input() service: AbstractService<Dto, any>;
  @Input() apiFilter?: any;
  @Input() set selectedData(value: any) {
    this._selectedData = value;
    this.selectedDataChange.next(value);
  }
  @Output() selectedDataChange = new EventEmitter<any>();

  public data: Dto[] = [];
  public hasError: boolean = false;
  public isLoading: boolean = true;
  public totalRecords: number = 0;
  public pageable: PageableRequest = { page: 0, size: 10 };
  public firstDataLoaded: boolean = false;
  public get selectedData(): any {
    return this._selectedData;
  }
  private _selectedData: any;

  ngOnInit(): void {
    this.pageable.size = this.rows;
  }

  public loadDataLazy(event: LazyLoadEvent): void {
    this.pageable.size = event.rows ?? 10;
    this.pageable.page = (event.first ?? 0) / (this.pageable.size ?? 10);
    this.fetchData();
  }

  public onRetry(): void {
    this.pageable = { size: 10, page: 0 };
    this.isLoading = true;
    this.firstDataLoaded = false;
    // this.fetchData();
  }

  public toggleCheckBox(event: MouseEvent): void {
    event.stopPropagation();
  }

  private fetchData(): void {
    this.isLoading = true;

    this.service.find(this.pageable, this.apiFilter)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.firstDataLoaded;
          this.data = data.records;
          this.totalRecords = data.totalRecords;
          this.hasError = false;
        },
        error: (error) => {
          this.hasError = true;
          this.totalRecords = 0;
          this.data = [];
        }
      });

  }

}
