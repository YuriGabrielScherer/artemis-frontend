import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { EnumBelt } from 'src/app/core/enums/enum-belt';

@Directive({ selector: '[appBelt]' })
export class BeltDirective implements OnInit {

    @Input('appBelt') belt: EnumBelt;

    private spanElement: HTMLSpanElement;

    constructor(private elementRef: ElementRef) { }

    ngOnInit(): void {
        this.spanElement = this.elementRef.nativeElement;
        this.resolveColor();
        this.resolveText();
    }

    private resolveColor(): void {
        this.spanElement.classList.add('p-badge');
        switch (this.belt) {
            case EnumBelt.WHITE:
                this.spanElement.style.backgroundColor = 'whitesmoke';
                this.spanElement.style.color = 'black';
                break;
            case EnumBelt.YELLOW:
                this.spanElement.style.backgroundColor = 'yellow';
                this.spanElement.style.color = 'black';
                break;
            case EnumBelt.RED:
                this.spanElement.style.backgroundColor = 'red';
                this.spanElement.style.color = 'white';
                break;
            case EnumBelt.ORANGE:
                this.spanElement.style.backgroundColor = 'orange';
                this.spanElement.style.color = 'black';
                break;
            case EnumBelt.GREEN:
                this.spanElement.style.backgroundColor = 'green';
                this.spanElement.style.color = 'white';
                break;
            case EnumBelt.PURPLE:
                this.spanElement.style.backgroundColor = 'purple';
                this.spanElement.style.color = 'white';
                break;
            case EnumBelt.BROWN:
                this.spanElement.style.backgroundColor = 'brown';
                this.spanElement.style.color = 'white';
                break;
            case EnumBelt.BLACK:
                this.spanElement.style.backgroundColor = 'black';
                this.spanElement.style.color = 'white';
                break;
            default:
                break;
        }
    }

    private resolveText(): void {
        switch (this.belt) {
            case EnumBelt.WHITE:
                this.spanElement.textContent = 'Branca';
                break;
            case EnumBelt.YELLOW:
                this.spanElement.textContent = 'Amarela';
                break;
            case EnumBelt.RED:
                this.spanElement.textContent = 'Vermelha';
                break;
            case EnumBelt.ORANGE:
                this.spanElement.textContent = 'Laranja';
                break;
            case EnumBelt.GREEN:
                this.spanElement.textContent = 'Verde';
                break;
            case EnumBelt.PURPLE:
                this.spanElement.textContent = 'Roxa';
                break;
            case EnumBelt.BROWN:
                this.spanElement.textContent = 'Marrom';
                break;
            case EnumBelt.BLACK:
                this.spanElement.textContent = 'Preta';
                break;
            default:
                break;
        }
    }
}