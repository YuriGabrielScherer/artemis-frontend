import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComponentsModule } from 'src/app/components/components.module';
import { ProfessorRoutingModule } from './professor.routing';
import { ProfessorFormComponent } from './view/form/professor-form.component';
import { ProfessorListComponent } from './view/list/professor-list.component';


@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        ProfessorRoutingModule
    ],
    exports: [],
    declarations: [
        ProfessorListComponent,
        ProfessorFormComponent,
    ],
    providers: [],
})
export class ProfessorModule { }
