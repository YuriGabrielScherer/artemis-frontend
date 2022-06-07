import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibComponentsModule } from '../lib-components.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { GeneralTableComponent } from './view/general-table.component';
import { LoadingStateModule } from '../loading-state/loading-state.module';


@NgModule({
  declarations: [
    GeneralTableComponent
  ],
  imports: [
    CommonModule,
    LibComponentsModule,
    LoadingStateModule,
    SharedModule,
  ],
  exports: [
    GeneralTableComponent
  ]
})
export class GeneralTableModule { }
