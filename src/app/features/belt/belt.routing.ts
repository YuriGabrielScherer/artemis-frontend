import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Component } from '@angular/core';
import { BeltListComponent } from './views/list/belt-list.component';
import { BeltFormComponent } from './views/form/belt-form.component';

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
                component: BeltListComponent,
            },
            {
                path: 'new',
                component: BeltFormComponent,
            }
        ],
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [BaseComponent]
})
export class BeltRoutingModule { }
