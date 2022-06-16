export interface PageableRequest {
    page: number;
    size: number;
    sortFields?: {
        property: string;
        direction: 'ASC' | 'DESC';
    }[];
}

export interface PageableResponse<O> {
    records: O[];
    totalRecords: number;
}
