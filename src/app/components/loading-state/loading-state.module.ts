import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingStateDirective } from './directive/loading-state.directive';

import { LoadingStateComponent } from './view/loading-state.component';

@NgModule({
    imports: [CommonModule],
    declarations: [LoadingStateComponent, LoadingStateDirective],
    exports: [LoadingStateComponent, LoadingStateDirective],
    entryComponents: [LoadingStateComponent],
})
export class LoadingStateModule { }
