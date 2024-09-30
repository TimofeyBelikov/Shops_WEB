import { Component, OnInit } from '@angular/core';
import { StoreService } from '../stores.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { loyaltyProgram, Store } from 'src/app/common/models';
import { LOYALTY_PROGRAMMS } from 'src/app/common/loyalty';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'store-wizard',
    templateUrl: 'store-wizard.component.html',
    styleUrls : ['./store-wizard.component.scss']
})

export class StoreWizardComponent implements OnInit {


    constructor(
        private _storeService : StoreService,
        private _formBuilder : FormBuilder,
        private _router : Router,
        private _route: ActivatedRoute
    ){}


    form : FormGroup = new FormGroup({
        name : new FormControl('', Validators.required),
        loyalty : new FormControl(null, Validators.required)
    })

    _loyaltyProgramms = LOYALTY_PROGRAMMS

    ngOnInit() {
    }

    createStore(){
        const data : Partial<Store> ={
            name : this.form.get('name')!!.value,
            loyaltyProgram : this.form.get('loyalty')!!.value
        }

        this._storeService.createStore(data).subscribe(r=>{
            console.warn('store created', r)
            this.redirect()
        })
    }

    redirect(){
        this._router.navigate(['../'], {relativeTo : this._route})
    }
}