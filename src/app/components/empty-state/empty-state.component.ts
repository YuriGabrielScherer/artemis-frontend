import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-empty-state',
    templateUrl: 'empty-state.component.html'
})
export class EmptyStateComponent {

    @Input() title: string;

    @Input() icon: string;

    @Input() showFirstAction: boolean = false;

    @Input() firstActionLabel?: string;

    @Output() firstAction: EventEmitter<void> = new EventEmitter();

    constructor() { }

    public firstButtonClicked(): void {
        this.firstAction.emit();
    }
}