import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { MainComponent } from './view/main.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'association',
        loadChildren: () => import('../association/association.module').then(m => m.AssociationModule),
      },
      {
        path: 'person',
        loadChildren: () => import('../person/person.module').then(m => m.PersonModule),
      },
      {
        path: 'athlete',
        loadChildren: () => import('../athlete/athlete.module').then(m => m.AthleteModule),
      },
      {
        path: 'professor',
        loadChildren: () => import('../professor/professor.module').then(m => m.ProfessorModule),
      },
      {
        path: 'graduation',
        loadChildren: () => import('../graduation/graduation.module').then(m => m.GraduationModule),
      },
      {
        path: 'belt',
        loadChildren: () => import('../belt/belt.module').then(m => m.BeltModule),
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
