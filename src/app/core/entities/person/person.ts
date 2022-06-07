import { EnumGender } from "../../enums/enum-gender";
import { AssociationDto } from "../association/association";

interface BasePerson {
    code: number;
    name: string;
    birth: Date;
    gender: EnumGender;
    document: string;
}

export interface PersonDto extends BasePerson {
    association?: AssociationDto;
}

export interface PersonSaveInput {
    associationCode: number;
}