import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EnumSituationAthleteGraduation } from 'src/app/core/enums/enum-situation-athlete-graduation';

@Directive({ selector: '[appSituationAthleteGraduation]' })
export class SituationAthleteGraduationDirective implements OnChanges {

    @Input('appSituationAthleteGraduation') situation: EnumSituationAthleteGraduation;

    private spanElement: HTMLSpanElement;

    constructor(private elementRef: ElementRef) { }

    ngOnChanges(changes: SimpleChanges): void {
        this.spanElement = this.elementRef.nativeElement;
        this.resolveColorAndText();
    }

    private resolveColorAndText(): void {
        this.spanElement.classList.add('p-badge');
        switch (this.situation) {
            case EnumSituationAthleteGraduation.APPROVED:
                this.spanElement.style.backgroundColor = 'green';
                this.spanElement.style.color = 'white';
                this.spanElement.textContent = 'Aprovado';
                break;
            case EnumSituationAthleteGraduation.DISAPPROVED:
                this.spanElement.style.backgroundColor = 'red';
                this.spanElement.style.color = 'white';
                this.spanElement.textContent = 'Reprovado';
                break;
            case EnumSituationAthleteGraduation.MISSING:
                this.spanElement.style.backgroundColor = 'yellow';
                this.spanElement.style.color = 'black';
                this.spanElement.textContent = 'Faltante';
                break;
            case EnumSituationAthleteGraduation.REGISTERED:
                this.spanElement.style.backgroundColor = 'grey';
                this.spanElement.style.color = 'white';
                this.spanElement.textContent = 'Registrado';
                break;
            default:
                break;
        }
    }
}