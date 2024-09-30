import { NgModule } from '@angular/core';
import { StoreWizardComponent } from './store-wizard.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Route, RouterModule } from '@angular/router';

const routes : Route[] = [
    {
        path : '',
        component : StoreWizardComponent
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        MatIconModule,
        MatSelectModule,
        MatDividerModule,
        MatSelectModule
    ],
    exports: [
        StoreWizardComponent
    ],
    declarations: [
        StoreWizardComponent
    ],
    providers: [],
})
export class StoreWizardModule { }
