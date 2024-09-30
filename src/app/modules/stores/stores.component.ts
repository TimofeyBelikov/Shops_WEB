import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { StoreService } from './stores.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from 'src/app/common/models';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'stores',
    templateUrl: './stores.component.html',
    styleUrls: ['./stores.component.scss'],
    encapsulation : ViewEncapsulation.Emulated
})
export class StoresComponent implements OnInit, OnDestroy {

    
    constructor(
        private _cdRef : ChangeDetectorRef,
        private _formbuilder : FormBuilder,
        private _storeService : StoreService,
        private _router : Router,
        private _route : ActivatedRoute
    ){}

    form = this._formbuilder.group({
        key : (['', Validators.required]),
        value : (['', Validators.required]),
        field : (['', Validators.nullValidator]),
        type : (['string', Validators.required])
    })

    src = new MatTableDataSource<Store>()
    filteredOptions: Observable<string[]> | undefined;
    keys_options : string[] = []
    unsubscribe$ = new Subject<any>()
    
    ngOnInit(): void {
        this._storeService.getStores().subscribe(r=>{
            this.src.data = r
        })

        this.filteredOptions = this.form.valueChanges.pipe(
            takeUntil(this.unsubscribe$),
            startWith(''),
            map(value => this._filter(value.key))
          );
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }

    onStandCreate(store : any){
        console.warn('store', store)
        this._router.navigate([`${store.id}/create-stand`], {relativeTo : this._route})
    }
    onProductCreate(stand : any){
        console.warn('stand', stand)
        this._router.navigate([`${stand.id}/create-product`], {relativeTo : this._route})
    }

    
    
    private _filter(value: string): string[] {
        console.warn('v', value)
        if(value){
            const filterValue = value?.toLowerCase();
            return this.keys_options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
        }
        else{
            return this.keys_options
        }
        
    }

    getFields(value : any) : {'key' : string, 'value': string}[]{
        const keys = Object.keys(value.value)
        let result : {'key':string, 'value': string}[] = []
        keys.forEach(k=>{
            const _c = value.value[k]
            result.push({'key' : k, 'value' : value.value[k]})
        })
        return result
    }
}

