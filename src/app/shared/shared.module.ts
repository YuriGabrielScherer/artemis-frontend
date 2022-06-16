import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BeltDirective } from './directives/belt.directive';
import { GenderDirective } from './directives/gender.directive';
import { SituationAthleteGraduationDirective } from './directives/situation-athlete-graduation.directive';
import { SituationGraduationDirective } from './directives/situation-graduation.directive';
import { BeltNamePipe } from './pipes/belt-name.pipe';
import { DocumentMaskPipe } from './pipes/document-mask.pipe';

import { GetPropertyFromObjectPipe } from './pipes/get-property-object.pipe';


@NgModule({
    declarations: [
        GetPropertyFromObjectPipe,
        BeltDirective,
        SituationAthleteGraduationDirective,
        SituationGraduationDirective,
        GenderDirective,
        DocumentMaskPipe,
        BeltNamePipe,
    ],
    exports: [
        GetPropertyFromObjectPipe,
        BeltDirective,
        SituationAthleteGraduationDirective,
        SituationGraduationDirective,
        GenderDirective,
        DocumentMaskPipe,
        BeltNamePipe,
    ],
    providers: [
        DatePipe,
    ],
    
})
export class SharedModule { }
