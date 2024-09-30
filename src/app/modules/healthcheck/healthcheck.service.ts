import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HealthCheck } from 'src/app/common/models';

@Injectable({
    providedIn: 'root'
})
export class HealthCheckService {

    constructor(
        private _http : HttpClient
    ){}

    checkProxy() : Observable<HealthCheck>{
        return this._http.get<HealthCheck>('/api/healthcheck') 
    }
    checkRedis() : Observable<HealthCheck>{
        return this._http.get<HealthCheck>('/api/redis/healthcheck')
    }
    getLogs() : Observable<string[]>{
        return this._http.get<string[]>('/api/logs')
    }
}