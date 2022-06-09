export interface PageableRequest {
    page: number;
    size: number;
    sortFields?: {
        property: string;
        direction: 'ASC' | 'DESC';
    }[];

    // constructor(page: number, size: number, sort?: { property: string, direction: 'ASC' | 'DESC' }[]) {
    //     this.page = page;
    //     this.size = size;
    //     this.sort = sort ?? [{ property: 'id', direction: 'ASC' }];
    // }

    // public convertToString(): string {
    //     let output: string = `"page":"${this.page}","size":"${this.size}",`;
    //     output = output.concat('"sort": [');

    //     this.sort!.forEach(s => {
    //         output = output.concat(`{"property": "${s.property}", "direction": "${s.direction}"},`);
    //     });

    //     output = output.substring(0, output.length - 1);
    //     output = output.concat(']');

    //     return `{${output}}`;
    // }

}

export interface PageableResponse<O> {
    records: O[];
    totalRecords: number;
}
