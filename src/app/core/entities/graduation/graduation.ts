import { EnumGraduationSituation } from "../../enums/enum-graduation-situation";
import { AthleteDto } from "../athlete/athlete";
import { ProfessorDto } from "../professor/professor";

export interface GraduationHistory {
    date: Date;
    situation: EnumGraduationSituation;
}

interface BaseGraduation {
    title: string;
    description?: string;
    place?: string;
    code: number;
    date: Date;
}

export interface GraduationDto extends BaseGraduation {
    professors?: ProfessorDto[];
    athletes?: AthleteDto[];
    situation: EnumGraduationSituation;
    history: GraduationHistory[];
}

export interface GraduationSaveInput extends BaseGraduation {

}

export interface RegisterProfessorsInput {
    graduationsCode: number[];
    professorsCode: number[];
}

export interface RemoveProfessorsInput extends RegisterProfessorsInput {
}

export interface RequestParticipationInput {
    graduationCode: number;
    athletes: number[];
}

export interface UpdateSituationInput {
    code: number;
    situation: EnumGraduationSituation;
}

export interface ProfessorGradeDto {
    professor: ProfessorDto;
    grade: number;
    description?: string;
}

export interface ListGraduationGradesOutput {
    athlete: AthleteDto;
    grades: ProfessorGradeDto[];
}

export interface SetGraduationGradeProfessorAthlete {
    athleteCode: number;
    professorCode: number;
    grade: number;
    description?: string;
}

export interface SetGraduationGradesInput {
    graduationCode: number;
    grades: SetGraduationGradeProfessorAthlete[];
}