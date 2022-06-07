import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GeneralTableModule } from '../general-table/general-table.module';
import { LibComponentsModule } from '../lib-components.module';

import { CrudComponent } from './view/crud.component';

@NgModule({
    imports: [
        CommonModule,
        LibComponentsModule,
        GeneralTableModule,
    ],
    declarations: [
        CrudComponent
    ],
    exports: [
        CrudComponent,
    ],
})
export class CrudComponentModule { }
