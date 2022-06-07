import { NgModule } from '@angular/core';

import { GeneralTableModule } from './general-table/general-table.module';
import { LibComponentsModule } from './lib-components.module';
import { CrudComponentModule } from './crud-component/crud-component.module';
import { SharedModule } from '../shared/shared.module';
import { LoadingStateModule } from './loading-state/loading-state.module';
import { EmptyStateModule } from './empty-state/empty-state.module';


@NgModule({
  exports: [
    GeneralTableModule,
    LibComponentsModule,
    CrudComponentModule,
    LoadingStateModule,
    SharedModule,
    EmptyStateModule,
  ]
})
export class ComponentsModule { }
