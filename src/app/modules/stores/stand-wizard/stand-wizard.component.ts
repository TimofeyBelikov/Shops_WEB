import { Component, OnInit } from '@angular/core';
import { StoreService } from '../stores.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Stand, Store } from 'src/app/common/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'stand-wizard',
    templateUrl: 'stand-wizard.component.html',
    styleUrls : ['./stand-wizard.component.scss']
})

export class StandWizardComponent implements OnInit {
    
    constructor(
        private _storeService : StoreService,
        private _formBuilder : FormBuilder,
        private _router : Router,
        private _route : ActivatedRoute
    ){}

    form : FormGroup = new FormGroup({
        name : new FormControl('', Validators.required)
    })
    store : Store
    
    ngOnInit(){
        this.store = this._route.snapshot.data.store
    }

    createStand(){
        const data : Partial<Stand> ={
            name : this.form.get('name')!!.value
        }
        this._storeService.createStand(this.store.id, data).subscribe(r=>{
            this.redirect()
        })
    }
    

    redirect(){
        this._router.navigate(['../../'], {relativeTo : this._route})
    }
}