import { Component, OnInit } from '@angular/core';
import { StoreService } from '../stores.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { loyaltyProgram, Product, Stand, Store } from 'src/app/common/models';
import { LOYALTY_PROGRAMMS, PRODUCT_TYPES } from 'src/app/common/loyalty';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductAttributeItem } from './attributes-wizard/attributes-wizard.component';

@Component({
    selector: 'product-wizard',
    templateUrl: 'product-wizard.component.html',
    styleUrls : ['./product-wizard.component.scss']
})

export class ProductWizardComponent implements OnInit {


    constructor(
        private _storeService : StoreService,
        private _formBuilder : FormBuilder,
        private _router : Router,
        private _route: ActivatedRoute
    ){}

    stand : Stand
    form : FormGroup = new FormGroup({
        name : new FormControl('', Validators.required),
        type : new FormControl('', Validators.required),
        base_price : new FormControl(null,  Validators.required),
        wholesale_price : new FormControl(null, Validators.required),
        tax : new FormControl(null, Validators.required),
        attributes : new FormControl([], Validators.nullValidator)
    })

    _loyaltyProgramms = LOYALTY_PROGRAMMS
    _productTypes = PRODUCT_TYPES

    ngOnInit() {
        this.stand = this._route.snapshot.data.stand
    }

    createProduct(){
        const attributes : ProductAttributeItem[] 
            = this.form.get('attributes')!!.value ?? []

        const data : Partial<Product> ={
            name : this.form.get('name')!!.value,
            type : this.form.get('type')!!.value,
            base_price : this.form.get('base_price')!!.value,
            wholesale_price : this.form.get('wholesale_price')!!.value,
            tax : this.form.get('tax')!!.value,
            // Список типа ProductAttributeItem
            attributes : this.transformAttributes(attributes)
        }

        this._storeService.createProduct(this.stand.id, data).subscribe(r=>{
            console.warn('product created', r)
            this.redirect()
        })
    }

    transformAttributes(attributes : ProductAttributeItem[]) : any{
        const attributesDict = attributes.reduce((acc: { [key: string]: string }, item) => {
            acc[item.property] = item.value;
            return acc;
          }, {});
        return attributesDict
    }

    redirect(){
        this._router.navigate(['../../'], {relativeTo : this._route})
    }

    get attributeControlRef() : FormControl{
        return this.form!!.get('attributes') as FormControl
    }
}