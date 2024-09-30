import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Stand, Store } from 'src/app/common/models';

@Component({
    selector: 'store-item',
    templateUrl: 'store-item.component.html',
    styleUrls : ['./store-item.component.scss']
})

export class StoreItemComponent implements OnInit {
    
    @Input() store : Store
    @Output() emitCreateStand = new EventEmitter<Partial<Store>>()
    @Output() emitCreateProduct = new EventEmitter<Partial<Stand>>()
    
    constructor(
    ) { }

    ngOnInit() { }

    createStand(){
        this.emitCreateStand.emit(this.store)
    }

    createProduct(event : any){
        this.emitCreateProduct.emit(event)
    }

    get productsCount() : number{
        return this.store.stands.reduce((acc, stand)=>acc+stand.products.length, 0) 
    }

    get loyalty() : number{
        return this.store.loyaltyProgram.discount
    }
}