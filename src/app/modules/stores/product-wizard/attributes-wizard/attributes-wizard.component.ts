import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../stores.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'attributes-wizard',
    templateUrl: 'attributes-wizard.component.html',
    styleUrls : ['./attributes-wizard.component.scss']
})

export class AttributesWizardComponent {

    @Input() attributesFormRef ?: FormControl | null

    constructor(
        private _storeService : StoreService,
        private _formBuilder : FormBuilder,
        private _router : Router,
        private _route: ActivatedRoute
    ){}

    tmp_form = new FormGroup({
        property : new FormControl('', Validators.required),
        value : new FormControl('', Validators.required)
    })

    attributes : ProductAttributeItem[] = []
    src = new MatTableDataSource<ProductAttributeItem>()
    displayedColumns : string[] = ['property', 'value']


    addAttribute(){
        this.attributes.push({
            property : this.tmp_form.get('property')?.value,
            value : this.tmp_form.get('value')?.value
        })
        this.tmp_form.reset()
        this.src.data = this.attributes
        this.attributesFormRef!!.patchValue(this.src.data)
    }
}

export interface ProductAttributeItem{
    property : string,
    value : string
}