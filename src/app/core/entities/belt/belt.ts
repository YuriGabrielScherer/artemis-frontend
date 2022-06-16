import { EnumBelt } from "../../enums/enum-belt";

export const BELT_OPTIONS: { label: string, value: string }[] = [
    { label: 'Branca', value: EnumBelt.WHITE },
    { label: 'Amarela', value: EnumBelt.YELLOW },
    { label: 'Vermelha', value: EnumBelt.RED },
    { label: 'Laranja', value: EnumBelt.ORANGE },
    { label: 'Verde', value: EnumBelt.GREEN },
    { label: 'Roxa', value: EnumBelt.PURPLE },
    { label: 'Marrom', value: EnumBelt.BROWN },
    { label: 'Preta', value: EnumBelt.BLACK },
];

interface BaseBelt {
    belt: EnumBelt;
    minMonths: number;
}

export interface BeltDto extends BaseBelt {
    sequence: number;
}

export interface BeltSaveInput extends BaseBelt {
}