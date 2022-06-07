import { EnumBelt } from "src/app/core/enums/enum-belt";
import { EnumSituationAthleteGraduation } from "src/app/core/enums/enum-situation-athlete-graduation";
import { AthleteDto } from "../../athlete/athlete";
import { GraduationDto, ProfessorGradeDto } from "../graduation";

export interface AthleteGraduationDto {
    belt: string;
    athlete: AthleteDto;
    situation: EnumSituationAthleteGraduation;
    grade: number;
}

export interface AthleteGraduationsDto {
    graduation?: GraduationDto;
    belt: EnumBelt;
    situation: EnumSituationAthleteGraduation;
    grade: number;
    gradeDetail?: ProfessorGradeDto[];
}