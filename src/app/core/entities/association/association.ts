import { PersonDto } from "../person/person";

interface BaseAssociation {
    code: number;
    name: string;
    city: string;
    since?: Date;
}

export interface AssociationSaveInput extends BaseAssociation {
    managerCode: number;
}

export interface AssociationDto extends BaseAssociation {
    manager: PersonDto;
}

export interface TopAssociation {
    name: string;
    count: number;
}