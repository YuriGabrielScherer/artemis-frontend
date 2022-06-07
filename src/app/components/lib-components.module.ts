import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar'
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';
import { BadgeModule } from 'primeng/badge';
import { DialogModule } from 'primeng/dialog';
import { StepsModule } from 'primeng/steps';
import { SidebarModule } from 'primeng/sidebar';
import { RippleModule } from 'primeng/ripple';
import { TimelineModule } from 'primeng/timeline';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@NgModule({
    exports: [
        TableModule,
        ButtonModule,
        MenuModule,
        CardModule,
        PanelModule,
        ToolbarModule,
        InputTextModule,
        InputNumberModule,
        CalendarModule,
        OverlayPanelModule,
        ReactiveFormsModule,
        InputMaskModule,
        DropdownModule,
        TabViewModule,
        BadgeModule,
        DialogModule,
        StepsModule,
        SidebarModule,
        RippleModule,
        TimelineModule,
        FontAwesomeModule,
        ConfirmDialogModule,
    ],
    providers: [ConfirmationService]
})
export class LibComponentsModule { }
