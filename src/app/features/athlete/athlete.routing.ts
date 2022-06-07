import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';
import { NgModule } from '@angular/core';

import { AthleteListComponent } from './list/athlete-list.component';
import { AthleteFormComponent } from './form/athlete-form.component';
import { AthleteDetailComponent } from './detail/athlete-detail.component';

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
        component: AthleteListComponent,
      },
      {
        path: 'new',
        component: AthleteFormComponent,
      },
      {
        path: 'detail',
        component: AthleteDetailComponent,
      }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [BaseComponent]
})
export class AthleteRoutingModule { }
