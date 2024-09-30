import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config.component';
import { Route, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';

const ConfigRoutes : Route[] = [
    {
        path : '',
        component : ConfigComponent
    }
]

@NgModule({
    declarations: [
        ConfigComponent
    ],
    imports: [
        RouterModule.forChild(ConfigRoutes),
        CommonModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatDividerModule
    ],
    exports: [
        ConfigComponent
    ],
    providers: [],
})
export class ConfigModule {}