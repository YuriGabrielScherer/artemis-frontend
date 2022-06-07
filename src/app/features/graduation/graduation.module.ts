import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { GraduationRoutingModule } from './graduation.routing';
import { CommonModule } from '@angular/common';

import { GraduationListComponent } from './list/graduation-list.component';
import { GraduationFormComponent } from './form/graduation-form.component';
import { GraduationProfessorsComponent } from './detail/professors/graduation-professors.component';
import { GraduationAthletesComponent } from './detail/athletes/graduation-athletes.component';
import { GraduationAthletesDialogComponent } from './detail/athletes/dialog/graduation-athletes-dialog.component';
import { GraduationProfessorsDialogComponent } from './detail/professors/dialog/graduation-professors-dialog.component';
import { GraduationDetailComponent } from './detail/graduation-detail.component';
import { GraduationGradesComponent } from './detail/grades/graduation-grades.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    GraduationRoutingModule,
    FormsModule      
  ],
  exports: [],
  declarations: [
    GraduationListComponent,
    GraduationFormComponent,
    GraduationProfessorsComponent,
    GraduationAthletesComponent,
    GraduationAthletesDialogComponent,
    GraduationProfessorsDialogComponent,
    GraduationDetailComponent,
    GraduationGradesComponent,
  ],
  providers: [],
})
export class GraduationModule { }
