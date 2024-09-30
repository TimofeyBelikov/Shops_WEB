import { Component, OnDestroy, OnInit } from '@angular/core';
import { HealthCheckService } from '../healthcheck/healthcheck.service';
import { takeUntil, take, switchMap} from 'rxjs/operators';
import { Subject, timer } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Log } from 'src/app/common/models';

@Component({
    selector: 'logs',
    templateUrl: './logs.component.html',
    styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit, OnDestroy {
   
    logs : string[] = []
    unsubscribe$ = new Subject<any>()
    src = new MatTableDataSource<Log>()

    constructor(
        private _health : HealthCheckService
    ){}

    ngOnInit(){
        timer(0, 5000).pipe(
            switchMap(()=>this._health.getLogs().pipe(
                l=>l
            )),
            takeUntil(this.unsubscribe$)
        ).subscribe(l=>this.src.data = this.parseLogs(l))
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }

    parseLogs(values : string[]) : Log[]{
        // values.forEach(v=> console.warn(JSON.parse(v)))

        // console.log('try parse', values[0])
        // const _p = JSON.parse(values[0])
        // console.log(_p)
        // let logs : Log[] = []
        // const p = JSON.parse(values[0]) as Log
        // console.log(p)
        
        return values.map(v=>{return JSON.parse(v) as Log})
        // return this.sortLogsByTime(values.map(v=> JSON.parse(v) as Log))
        // return p
    }

    sortLogsByTime(logs: Log[]): Log[] {
        return logs.sort((a, b) => {
            return new Date(b.time).getTime() - new Date(a.time).getTime();
        });
    }

}
