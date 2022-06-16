import { Pipe, PipeTransform } from '@angular/core';
import { EnumBelt } from 'src/app/core/enums/enum-belt';

@Pipe({
    name: 'beltName'
})

export class BeltNamePipe implements PipeTransform {
    transform(value: EnumBelt): string {
        switch (value) {
            case EnumBelt.WHITE:
                return 'Branca';
            case EnumBelt.YELLOW:
                return 'Amarela';
            case EnumBelt.RED:
                return 'Vermelha';
            case EnumBelt.ORANGE:
                return 'Laranja';
            case EnumBelt.GREEN:
                return 'Verde';
            case EnumBelt.PURPLE:
                return 'Roxa';
            case EnumBelt.BROWN:
                return 'Marrom';
            case EnumBelt.BLACK:
                return 'Preta';
            case EnumBelt.BLACK_2:
                return 'Segundo Dan';
            case EnumBelt.BLACK_3:
                return 'Terceiro Dan';
            case EnumBelt.BLACK_4:
                return 'Quarto Dan';
            case EnumBelt.BLACK_5:
                return 'Quinto Dan';
            case EnumBelt.BLACK_6:
                return 'Sexto Dan';
            case EnumBelt.BLACK_7:
                return 'Sétimo Dan';
            case EnumBelt.BLACK_8:
                return 'Oitavo Dan';
            case EnumBelt.BLACK_9:
                return 'Nono Dan';
            case EnumBelt.BLACK_10:
                return 'Décimo Dan';
            default:
                return 'Branca';
        }


    }
}