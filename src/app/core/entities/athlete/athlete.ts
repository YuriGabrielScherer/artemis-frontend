import { EnumBelt } from "../../enums/enum-belt";
import { PersonDto } from "../person/person";

interface BaseAthlete {
    since: Date;
    currentBelt: EnumBelt;
}
export interface AthleteSaveInput extends BaseAthlete {
    code: number;
}
export interface AthleteDto extends BaseAthlete {
    person: PersonDto;
}