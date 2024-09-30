import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { LogsComponent } from './logs.component';
import { MatTableModule } from '@angular/material/table';


const LogsRoutes : Route[] = [
    {
        path : '',
        component : LogsComponent 
    }
]
@NgModule({
    declarations: [
        LogsComponent
    ],
    imports: [
        RouterModule.forChild(LogsRoutes),
        CommonModule,
        MatTableModule
    ],
    exports: [
        LogsComponent
    ],
    providers: [],
})
export class LogsModule {}