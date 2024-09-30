import { Injectable, NgModule } from '@angular/core';
import { ProductWizardComponent } from './product-wizard.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRouteSnapshot, Resolve, Route, RouterModule, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { Stand } from 'src/app/common/models';
import { StoreService } from '../stores.service';
import { AttributesWizardComponent } from './attributes-wizard/attributes-wizard.component';
import { MatTableModule } from '@angular/material/table';


@Injectable({ providedIn: 'root' })
export class StandResolver implements Resolve<Stand> {
    constructor(
        private _storeSerivce : StoreService 
    ){}

    resolve(route: ActivatedRouteSnapshot): Observable<Stand> | Promise<Stand> | Stand {
        return this._storeSerivce.getStand(route.params.id)
    }
}

export const routes: Routes = [
    {
        path : '',
        resolve : {
            stand : StandResolver
        },
        component : ProductWizardComponent
    }
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
        MatSelectModule,
        MatTableModule
    ],
    exports: [
        ProductWizardComponent
    ],
    declarations: [
        ProductWizardComponent,
        AttributesWizardComponent
    ],
    providers: [],
})
export class ProductWizardModule { }
