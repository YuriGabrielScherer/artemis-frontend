import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LibComponentsModule } from '../lib-components.module';

import { EmptyStateComponent } from './empty-state.component';

@NgModule({
    imports: [
        CommonModule,
        LibComponentsModule,
    ],
    exports: [EmptyStateComponent],
    declarations: [EmptyStateComponent],
    providers: [],
})
export class EmptyStateModule { }
