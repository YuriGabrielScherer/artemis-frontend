import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { BeltRoutingModule } from './belt.routing';
import { BeltFormComponent } from './views/form/belt-form.component';

import { BeltListComponent } from './views/list/belt-list.component';


@NgModule({
    imports: [
        BeltRoutingModule,
        ComponentsModule,
    ],
    exports: [],
    declarations: [
        BeltListComponent,
        BeltFormComponent,
    ],
    providers: [],
})
export class BeltModule { }
