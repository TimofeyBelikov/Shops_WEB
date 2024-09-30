import { inject, NgModule } from '@angular/core';
import { StandWizardComponent } from './stand-wizard.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from 'src/app/common/models';
import { StoreService } from '../stores.service';


@Injectable({ providedIn: 'root' })
export class StoreResolver implements Resolve<Store> {
    constructor(
        private _storeSerivce : StoreService 
    ){}

    resolve(route: ActivatedRouteSnapshot): Observable<Store> | Promise<Store> | Store {
        return  this._storeSerivce.getStore(route.params.id) ;
    }
}

export const routes: Routes = [
    {
        path : '',
        resolve : {
            store : StoreResolver
        },
        component : StandWizardComponent
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
        MatDividerModule
    ],
    exports: [
        StandWizardComponent
    ],
    declarations: [
        StandWizardComponent
    ],
    providers: [],
})
export class StandWizardModule { }
