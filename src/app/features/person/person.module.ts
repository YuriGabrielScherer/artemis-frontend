import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComponentsModule } from 'src/app/components/components.module';
import { PersonRoutingModule } from './person.routing';

import { PersonFormComponent } from './views/person-form/person-form.component';
import { PersonListComponent } from './views/person-list/person-list.component';

@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        PersonRoutingModule,
    ],
    exports: [
    ],
    declarations: [
        PersonListComponent, 
        PersonFormComponent,
    ],
    providers: [],
})
export class PersonModule { }
