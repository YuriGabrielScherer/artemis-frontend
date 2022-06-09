import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BeltDirective } from './directives/belt.directive';
import { GenderDirective } from './directives/gender.directive';
import { SituationAthleteGraduationDirective } from './directives/situation-athlete-graduation.directive';
import { SituationGraduationDirective } from './directives/situation-graduation.directive';

import { GetPropertyFromObjectPipe } from './pipes/get-property-object.pipe';


@NgModule({
    declarations: [
        GetPropertyFromObjectPipe,
        BeltDirective,
        SituationAthleteGraduationDirective,
        SituationGraduationDirective,
        GenderDirective,
    ],
    exports: [
        GetPropertyFromObjectPipe,
        BeltDirective,
        SituationAthleteGraduationDirective,
        SituationGraduationDirective,
        GenderDirective,
    ],
    providers: [
        DatePipe,
    ],
    
})
export class SharedModule { }
