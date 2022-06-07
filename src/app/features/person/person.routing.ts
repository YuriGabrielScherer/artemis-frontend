import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { Component } from '@angular/core';
import { PersonListComponent } from './views/person-list/person-list.component';
import { PersonFormComponent } from './views/person-form/person-form.component';

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
        component: PersonListComponent,
      },
      {
        path: 'new',
        component: PersonFormComponent,
      }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [BaseComponent]
})
export class PersonRoutingModule { }
