import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssociationRoutingModule } from './association.routing';
import { AssociationComponent } from './views/list/association.component';
import { AssociationFormComponent } from './views/form/association-form.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    AssociationComponent,
    AssociationFormComponent,
  ],
  imports: [
    CommonModule,
    AssociationRoutingModule,
    ComponentsModule,
  ]
})
export class AssociationModule { }
