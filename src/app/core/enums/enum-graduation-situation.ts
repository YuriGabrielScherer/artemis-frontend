import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBomb, faCheck, faCircleCheck, faLock, faLockOpen, faPen, faPenSquare, faUnlockAlt, faXmark } from "@fortawesome/free-solid-svg-icons";
import { GraduationHistory } from "../entities/graduation/graduation";
import { EnumBelt } from "./enum-belt";

export enum EnumGraduationSituation {
    CREATED = 'CREATED',
    OPEN_SUBSCRIPTION = 'OPEN_SUBSCRIPTION',
    CLOSE_SUBSCRIPTION = 'CLOSE_SUBSCRIPTION',
    FINISHED = 'FINISHED',
    CANCELED = 'CANCELED',
}

interface GraduationSituationTimeline {
    label: string;
    color: string;
    icon: IconProp;
    date?: Date;
}

export class GraduationSituation {
    public static getTimeline(graduationHistory: GraduationHistory[]): GraduationSituationTimeline[] {
        const outputList: GraduationSituationTimeline[] = [];

        Object.keys(EnumGraduationSituation)
            .filter(value => value != EnumGraduationSituation.CANCELED)
            .forEach(value => {
                const output: GraduationSituationTimeline = { color: 'grey', icon: this.getIconFromSituation(value), label: this.getLabelFromSituation(value) };
                const history = graduationHistory.filter(hist => hist.situation == value)[0];
                if (history) {
                    output.color = 'green';
                    output.date = history.date;
                }
                outputList.push(output);
            });

        const canceled = graduationHistory.filter(hist => hist.situation == EnumGraduationSituation.CANCELED)[0];
        if (canceled) {
            outputList.forEach(output => output.color = 'grey');
            outputList.push({ color: 'red', icon: this.getIconFromSituation(EnumGraduationSituation.CANCELED), label: this.getLabelFromSituation(EnumGraduationSituation.CANCELED), date: canceled.date });
        }
        
        return outputList;
    }

    private static getLabelFromSituation(situation: EnumGraduationSituation | string): string {
        switch (situation) {
            case EnumGraduationSituation.CREATED:
                return 'Criado';
            case EnumGraduationSituation.OPEN_SUBSCRIPTION:
                return 'Inscrições abertas';
            case EnumGraduationSituation.CLOSE_SUBSCRIPTION:
                return 'Inscrições encerradas';
            case EnumGraduationSituation.FINISHED:
                return 'Finalizado';
            case EnumGraduationSituation.CANCELED:
                return 'Cancelado';
            default:
                return 'ERRO';
        }
    }
    private static getIconFromSituation(situation: EnumGraduationSituation | string): IconProp {
        switch (situation) {
            case EnumGraduationSituation.CREATED:
                return faPenSquare;
            case EnumGraduationSituation.OPEN_SUBSCRIPTION:
                return faLockOpen;
            case EnumGraduationSituation.CLOSE_SUBSCRIPTION:
                return faLock;
            case EnumGraduationSituation.FINISHED:
                return faCircleCheck;
            case EnumGraduationSituation.CANCELED:
                return faXmark;
            default:
                return faBomb;
        }
    }
}