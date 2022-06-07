import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComponentsModule } from 'src/app/components/components.module';
import { AthleteRoutingModule } from './athlete.routing';
import { AthleteDetailComponent } from './detail/athlete-detail.component';
import { AthleteGraduationsComponent } from './detail/graduations/athlete-graduations.component';
import { AthleteFormComponent } from './form/athlete-form.component';
import { AthleteListComponent } from './list/athlete-list.component';


@NgModule({
    imports: [
        CommonModule,
        ComponentsModule,
        AthleteRoutingModule
    ],
    exports: [
    ],
    declarations: [
        AthleteListComponent,
        AthleteFormComponent,
        AthleteDetailComponent,
        AthleteGraduationsComponent,
    ],
    providers: [],
})
export class AthleteModule { }
