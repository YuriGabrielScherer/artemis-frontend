import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { EnumGender } from 'src/app/core/enums/enum-gender';

@Directive({ selector: '[appGender]' })
export class GenderDirective implements OnInit {

    @Input('appGender') gender: EnumGender;

    private spanElement: HTMLSpanElement;

    constructor(private elementRef: ElementRef) { }

    ngOnInit(): void {
        this.spanElement = this.elementRef.nativeElement;
        this.spanElement.classList.add('p-badge');
        switch (this.gender) {
            case EnumGender.MALE:
                this.spanElement.style.backgroundColor = 'lightskyblue';
                this.spanElement.style.color = 'black';
                this.spanElement.textContent = 'Masculino';

                break;
            case EnumGender.FEMALE:
                this.spanElement.style.backgroundColor = 'pink';
                this.spanElement.style.color = 'black';
                this.spanElement.textContent = 'Feminino';
                break;
            default:
                break;
        }
    }
}