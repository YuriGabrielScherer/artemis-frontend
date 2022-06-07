import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EnumGraduationSituation } from 'src/app/core/enums/enum-graduation-situation';

@Directive({ selector: '[appSituationGraduation]' })
export class SituationGraduationDirective implements OnChanges {

    @Input('appSituationGraduation') situation: EnumGraduationSituation;

    private spanElement: HTMLSpanElement;

    constructor(private elementRef: ElementRef) { }

    ngOnChanges(changes: SimpleChanges): void {
        this.spanElement = this.elementRef.nativeElement;
        this.resolveColorAndText();
    }

    private resolveColorAndText(): void {
        this.spanElement.classList.add('p-badge');
        this.spanElement.style.whiteSpace = 'nowrap';
        switch (this.situation) {
            case EnumGraduationSituation.CREATED:
                this.spanElement.style.backgroundColor = 'grey';
                this.spanElement.style.color = 'white';
                this.spanElement.textContent = 'Criado';
                break;
            case EnumGraduationSituation.OPEN_SUBSCRIPTION:
                this.spanElement.style.backgroundColor = 'green';
                this.spanElement.style.color = 'white';
                this.spanElement.textContent = 'Inscrições abertas';
                break;
            case EnumGraduationSituation.CLOSE_SUBSCRIPTION:
                this.spanElement.style.backgroundColor = 'yellow';
                this.spanElement.style.color = 'black';
                this.spanElement.textContent = 'Inscrições encerradas';
                break;
            case EnumGraduationSituation.FINISHED:
                this.spanElement.style.backgroundColor = 'purple';
                this.spanElement.style.color = 'white';
                this.spanElement.textContent = 'Finalizado';
                break;
            case EnumGraduationSituation.CANCELED:
                this.spanElement.style.backgroundColor = 'red';
                this.spanElement.style.color = 'white';
                this.spanElement.textContent = 'Cancelado';
                break;
            default:
                break;
        }
    }
}