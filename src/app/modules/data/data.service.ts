import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Redis_Record, Redis_Record_Hash } from 'src/app/common/models';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    
    constructor(private _http : HttpClient){

    }

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