import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoresComponent } from './stores.component';
import { Route, RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { StoreItemComponent } from './store-item/store-item.component';
import { StandItemComponent } from './stand-item/stand-item.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductPriceComponent } from './product-item/product-price/product-price.component';

const storesRoutes : Route[] = [
    {
        path : '',
        component : StoresComponent,
        children : [
            {
                path : ':id/create-store',
                loadChildren : ()=> import('./store-wizard/store-wizard.module').then(m=>m.StoreWizardModule)
            },
            {
                path : ':id/create-stand',
                loadChildren : ()=> import('./stand-wizard/stand-wizard.module').then(m=>m.StandWizardModule)
            },
            {
                path : ':id/create-product',
                loadChildren : ()=> import('./product-wizard/product-wizard.module').then(m=>m.ProductWizardModule)
            }
        ]
    },
]

@NgModule({
    declarations: [
       StoresComponent,
       StoreItemComponent,
       StandItemComponent,
       ProductItemComponent,
       ProductPriceComponent
    ],
    imports: [
        RouterModule.forChild(storesRoutes),
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        MatIconModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatDividerModule,
        MatSidenavModule,
        MatExpansionModule,
        MatTabsModule
    ],
    exports: [
        StoresComponent
    ],
    providers: [],
})
export class StoressModule {}