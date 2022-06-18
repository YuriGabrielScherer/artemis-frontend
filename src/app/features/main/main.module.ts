import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { MainComponent } from './view/main.component';
import { MenuComponent } from './view/menu/menu.component';
import { HeaderComponent } from './view/header/header.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { DashboardCountCardComponent } from './view/dashboard/count-card/dashboard-count-card.component';
import { DashboardAssociationsComponent } from './view/dashboard/associations/dashboard-associations.component';
import { DashboardGraduationComponent } from './view/dashboard/graduation/dashboard-graduation.component';


@NgModule({
  declarations: [
    MainComponent,
    MenuComponent,
    HeaderComponent,
    DashboardComponent,
    DashboardCountCardComponent,
    DashboardAssociationsComponent,
    DashboardGraduationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    MainRoutingModule
  ]
})
export class MainModule { }
