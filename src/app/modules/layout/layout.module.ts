import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule} from '@angular/material/button';
import { ConfigModule } from '../config/config.module';
import { LogsModule } from '../logs/logs.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

const LayoutRoutes : Route[] = [
    {
        path : '',
        component : LayoutComponent
    }
]

@NgModule({
    declarations: [ LayoutComponent ],
    imports: [
        CommonModule,
        RouterModule.forChild(LayoutRoutes),
        MatButtonModule,
        ConfigModule,
        LogsModule,
        MatSidenavModule,
        MatIconModule
    ],
    exports: [ LayoutComponent ],
    providers: [],
})
export class LayoutModule {}