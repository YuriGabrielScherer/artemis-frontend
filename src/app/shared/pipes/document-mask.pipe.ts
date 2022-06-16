import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'documentMask'
})
export class DocumentMaskPipe implements PipeTransform {

    transform(document: string): string {
        return document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

}