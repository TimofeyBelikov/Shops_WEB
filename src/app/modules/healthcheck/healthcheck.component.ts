import { Component, OnInit } from '@angular/core';
import { HealthCheckService } from './healthcheck.service';
import { HealthCheck, HealthCheckStatus } from 'src/app/common/models';

@Component({
    selector: 'healthcheck',
    templateUrl: './healthcheck.component.html',
    styleUrls: ['./healthcheck.component.scss']
})
export class HealthcheckComponent implements OnInit {
    constructor(
        private _healthService : HealthCheckService
    ) { }

    proxy_status : HealthCheck = {'health' : 'unkn'}
    redis_status : HealthCheck = {'health' : 'unkn'}

    ngOnInit(): void {
        this.checkProxy()
        this.checkRedis()
    }

    checkProxy(){
        this._healthService.checkProxy().subscribe(r=>{
            this.proxy_status=r
        })
    }

    checkRedis(){
        this._healthService.checkRedis().subscribe(r=>{
            this.redis_status=r
        })
    }
}
