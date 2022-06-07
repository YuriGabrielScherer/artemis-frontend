import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { NgModule } from '@angular/core';

import { GraduationListComponent } from './list/graduation-list.component';
import { GraduationFormComponent } from './form/graduation-form.component';
import { GraduationDetailComponent } from './detail/graduation-detail.component';


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
        component: GraduationListComponent,
      },
      {
        path: 'new',
        component: GraduationFormComponent,
      },
      {
        path: 'detail',
        component: GraduationDetailComponent,
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [BaseComponent]
})
export class GraduationRoutingModule { }
