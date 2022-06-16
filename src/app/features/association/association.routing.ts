import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssociationFormComponent } from './views/form/association-form.component';
import { AssociationComponent } from './views/list/association.component';

import { Component } from '@angular/core';

@Component({
  template: '<router-outlet></router-outlet>'
})

export class BaseComponent {
}

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: '',
        component: AssociationComponent,
      },
      {
        path: 'new',
        component: AssociationFormComponent,
      }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [BaseComponent]
})
export class AssociationRoutingModule { }
