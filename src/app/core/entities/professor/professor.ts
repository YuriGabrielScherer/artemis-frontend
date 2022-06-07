import { PersonDto } from "../person/person";

interface BaseProfessor {

}

export interface ProfessorSaveInput extends BaseProfessor{

}

export interface ProfessorDto extends BaseProfessor {
    person: PersonDto;
}