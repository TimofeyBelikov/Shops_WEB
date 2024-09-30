import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Stand, Store } from 'src/app/common/models';

@Component({
    selector: 'stand-item',
    templateUrl: 'stand-item.component.html',
    styleUrls : ['./stand-item.component.scss']
})

export class StandItemComponent implements OnInit {
    
    @Input() stand : Stand
    @Input() store : Store
    
    @Output() emitCreateProduct = new EventEmitter<Partial<Stand>>()

    constructor(
    ) { }

    ngOnInit() { }

    createProduct(){
        this.emitCreateProduct.emit(this.stand)
    }

    get productsCount() : number{
        return this.stand.products.length
    }
}