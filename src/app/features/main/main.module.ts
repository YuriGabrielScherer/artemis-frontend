import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { MainComponent } from './view/main.component';
import { MenuComponent } from './view/menu/menu.component';
import { HeaderComponent } from './view/header/header.component';


@NgModule({
  declarations: [
    MainComponent,
    MenuComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    MainRoutingModule
  ]
})
export class MainModule { }
