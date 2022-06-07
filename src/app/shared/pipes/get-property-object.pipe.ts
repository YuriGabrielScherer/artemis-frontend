import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'getProperty',
})
export class GetPropertyFromObjectPipe implements PipeTransform {

    constructor(
        private datePipe: DatePipe,
    ) { }

    transform(value: any, args: { field: string, date?: boolean }): any {
        let result = value[args.field];
        if (args.field.includes('.')) {
            result = value;
            args.field.split('.').forEach((object: any) => {
                if (result != null && result != undefined) {
                    result = result[object];
                } else {
                    result = 'Não informado';
                }
            });
        }
        if (args.date == true && result != 'Não informado') {
            return this.datePipe.transform(result, 'dd/MM/yyyy');
        }
        return result;
    }
}