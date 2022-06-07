import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfessorListComponent } from './view/list/professor-list.component';
import { ProfessorFormComponent } from './view/form/professor-form.component';

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
                component: ProfessorListComponent,
            },
            {
                path: 'new',
                component: ProfessorFormComponent,
            }
        ],
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [BaseComponent]
})
export class ProfessorRoutingModule { }
