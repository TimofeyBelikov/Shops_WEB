import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product, Stand, Store } from 'src/app/common/models';
import { ProductAttributeItem } from '../product-wizard/attributes-wizard/attributes-wizard.component';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
    selector: 'product-item',
    templateUrl: 'product-item.component.html',
    styleUrls : ['./product-item.component.scss']
})

export class ProductItemComponent implements OnInit, AfterContentInit {

    @Input() stand : Stand
    @Input() store : Store
    
    @Input()
    set product(value : Product){
        this._product = value
        this.attributes.data = this.dictToAttributes(value.attributes)
    }

    get product() : Product{
        return this._product
    }
    private _product : Product

    attributes = new MatTableDataSource<ProductAttributeItem>()
    displayedColumns: string[] = ['property', 'value'];

    constructor(
    ) { }

    ngOnInit() { }
    
    ngAfterContentInit(): void {
        timer(150, 0).pipe(take(1)).subscribe(r=>{
            this.getData()
        })
            
    }

    getData(){
        console.warn(this.stand, this.store)
    }

    dictToAttributes(attributesDict: { [key: string]: string }) {
        return Object.entries(attributesDict).map(([property, value]) => ({
            property,
            value
        }));
    }

}