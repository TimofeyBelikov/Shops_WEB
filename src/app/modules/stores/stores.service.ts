import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, Redis_Record, Redis_Record_Hash, Stand, Store } from 'src/app/common/models';

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    
    constructor(private _http : HttpClient){
    }


    // Магазины
    createStore(item : Partial<Store>) : Observable<Store>{
        return this._http.post<Store>('/api/stores/', item)
    }
    getStores() : Observable<Store[]>{
        return this._http.get<Store[]>('/api/stores/')
    }
    getStore(store_id : string) : Observable<Store>{
        return this._http.get<Store>(`/api/stores/${store_id}/`)
    }

    // Стенды
    createStand(store_id : string, item : Partial<Stand>) : Observable<Stand>{
        return this._http.post<Stand>(`/api/stands/${store_id}/`, item)
    }

    getStand(stand_id : string) : Observable<Stand>{
        return this._http.get<Stand>(`/api/stand/${stand_id}/`)
    } 

    // Продукция
    createProduct(stand_id : string, item : Partial<Product>) : Observable<Product>{
        return this._http.post<Product>(`/api/stands/${stand_id}/products/`, item)
    }









    
    // Из старого проекта
    getKeys() : Observable<string[]>{
        return this._http.get<string[]>('/api/redis/keys')
    }

    getRecords() : Observable<Redis_Record[]>{
        return this._http.get<Redis_Record[]>('/api/redis/kvalues')
    }

    setKey(key : string, value : string){
        return this._http.post('/api/redis/addkey', {'key' : key, 'value' : value})
    }

    mkRecord(obj : Redis_Record){
        return this._http.post('api/redis/post', obj)
    }
    
    deleteKey(key : string){
        return this._http.post(`/api/redis/deletekey`, {'key' : key})
    }

    deleteField(obj: Partial<Redis_Record_Hash>){
        return this._http.post('/api/redis/delfield', obj)
    }
}