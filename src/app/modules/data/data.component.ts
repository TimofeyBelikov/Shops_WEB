import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from './data.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Redis_Record, Redis_Record_Hash } from 'src/app/common/models';
import { map, startWith, take, takeUntil } from 'rxjs/operators';
import { Observable, Subject, timer } from 'rxjs';

@Component({
    selector: 'data',
    templateUrl: './data.component.html',
    styleUrls: ['./data.component.scss'],
    encapsulation : ViewEncapsulation.Emulated
})
export class DataComponent implements OnInit, OnDestroy {
    constructor(
        private _changeDetectorRef : ChangeDetectorRef,
        private _formbuilder : FormBuilder,
        private _dataService : DataService
    ){}
    form = this._formbuilder.group({
        key : (['', Validators.required]),
        value : (['', Validators.required]),
        field : (['', Validators.nullValidator]),
        type : (['string', Validators.required])
    })

    types_options : {'value' : Redis_dtypes, 'str' : string}[] = [
        {value : 'string', 'str' : 'Строка'},
        {value : 'hash', 'str' : 'Хэш'},
        {value : 'list', 'str' : 'Список'},
        {value : 'set', 'str' : 'Множество'},
        {value : 'zset', 'str' : 'Упор. Множество'}
    ]
    UUID_KEY : string = "_uuid"

    keys : string[] = []
    src = new MatTableDataSource<Redis_Record>()
    filteredOptions: Observable<string[]> | undefined;
    keys_options : string[] = []
    unsubscribe$ = new Subject<any>()
    
    ngOnInit(): void {       
        this._fetchKeys()
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

    private _fetchKeys(){
        // this._dataService.getKeys().subscribe(r=>{
        //     this.keys = r
        //     this.src.data = r
        // })
        this._dataService.getRecords().subscribe(r=>{
            this.src.data = r
            this.keys_options = r.map(rec=>rec.key)
            
        })
    }

    rmRecord(key : Redis_Record){
        this._dataService.deleteKey(key.key).subscribe(response=>{
            console.warn(response)
            this._fetchKeys()
        })
    }

    editHash(key : string, field : string, value : string){
        this.form.get('type')?.patchValue('hash')
        this.form.get('key')?.patchValue(key)
        this.form.get('field')?.patchValue(field)
        this.form.get('value')?.patchValue(value)
        timer(20).pipe(take(1)).subscribe(r=> this._changeDetectorRef.detectChanges())
        // this._changeDetectorRef.detectChanges()
    }

    editStr(key : string, value : string){
        this.form.reset()
        this.form.get('type')?.patchValue('string')
        this.form.get('key')?.patchValue(key)
        this.form.get('value')?.patchValue(value)
        timer(20).pipe(take(1)).subscribe(r=> this._changeDetectorRef.detectChanges())
    }

    delField(key : string, field : string){
        console.log('delfield')

        this._dataService.deleteField({
            'field': field, 'type': 'hash', 'key': key
        }).subscribe(r=>{
            console.log(r)
            this._fetchKeys()
        })
        console.log('asdfasd')
    }

    addRecord(){
        const key : string = this.form.get('key')!.value
        const value : string = this.form.get('value')!.value
        const type : Redis_dtypes = this.form.get('type')!.value
        const field : string = this.form.get('field')!.value

        let obj : Redis_Record | null = null

        console.warn('key,value', key, value )
        switch(type){
            case 'string':{
                obj = {
                    key: key,
                    type : 'string',
                    value: value
                } as Redis_Record
                break;
            }
            case 'hash':{
                obj = {
                    key: key,
                    field: field,
                    type : 'hash',
                    value: value
                } as Redis_Record_Hash
                break;
            }
            case 'list': break;
            case 'set': break;
            case 'zset': break;
        }
        console.warn('object to post', obj)
        this._dataService.mkRecord(obj!).subscribe(r=>{
            console.warn(r)
            this._fetchKeys()
            this.form.reset()
        })
        // this._dataService.mkRecord(key, value, type).subscribe(response=>{
        //     console.warn(response)
        //     this.fetchKeys()
        //     this.form.reset()
        // })

    }

    getFields(value : any) : {'key' : string, 'value': string}[]{
        // console.log('getFields')
        const keys = Object.keys(value.value)
        // console.warn(keys)
        
        let result : {'key':string, 'value': string}[] = []

        keys.forEach(k=>{
            const _c = value.value[k]
            result.push({'key' : k, 'value' : value.value[k]})
            // console.log('key', _c)
        })
        return result

    }

    valueToStr(value : string) : string{
        return this.types_options.find(o=>o.value == value)?.str ?? ''
    }
}

type Redis_dtypes = "string" | 'hash' | 'list' | 'set' | 'zset'
