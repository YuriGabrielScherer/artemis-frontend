import { LazyLoadEvent } from "primeng/api";
import { finalize, Observable } from "rxjs";

import { GeneralTableColumnsInput } from "src/app/components/general-table/view/general-table.component";
import { PageableRequest, PageableResponse } from "src/app/core/entities/pageable/pageable";

export abstract class AbstractListComponent<Dto> {

    public records: Dto[] = [];
    public isLoading: boolean = true;
    public pageable: PageableRequest = { page: 0, size: 10 };
    public totalRecords: number;
    public firstDataLoaded: boolean = false;
    public hasError: boolean = false;

    public abstract columns: GeneralTableColumnsInput[];
    protected abstract endpoint: Observable<PageableResponse<Dto>>;
    protected onSuccess?: Function;
    protected onError?: Function;

    public onRetry(): void {
        this.pageable = { page: 0, size: 10 };
        this.isLoading = true;
        this.hasError = false;
        this.firstDataLoaded = false;
    }

    public loadDataLazy(event: LazyLoadEvent): void {
        this.pageable.size = event.rows ?? 10;
        this.pageable.page = (event.first ?? 0) / (this.pageable.size ?? 10);
        this.fetchData();
    }

    protected fetchData(): void {
        this.isLoading = true;
        this.endpoint
            .pipe(finalize(() => this.isLoading = false))
            .subscribe({
                next: (response) => {
                    if (this.onSuccess != undefined) {
                        this.onSuccess();
                    }
                    this.records = response.records;
                    this.totalRecords = response.totalRecords;
                    this.hasError = false;
                    this.firstDataLoaded = true;
                },
                error: (error) => {
                    if (this.onError != undefined) {
                        this.onError();
                    }
                    console.log('Error: ', error);
                    this.hasError = true;
                    this.totalRecords = 0;
                    this.records = [];
                }
            })
    }

}