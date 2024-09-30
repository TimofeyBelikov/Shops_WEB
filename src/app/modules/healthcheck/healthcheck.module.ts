import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthcheckComponent } from './healthcheck.component';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

const HealthcheckRoutes : Route[] = [
    {
        path : "",
        component : HealthcheckComponent
    }
]
@NgModule({
    declarations: [HealthcheckComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(HealthcheckRoutes),
        MatButtonModule,
        MatIconModule
    ],
    exports: [ HealthcheckComponent ],
    providers: [],
})
export class HealthcheckModule {}