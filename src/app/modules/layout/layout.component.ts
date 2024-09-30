import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HealthCheckService } from '../healthcheck/healthcheck.service';

@Component({
    selector: 'layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    encapsulation : ViewEncapsulation.Emulated
})
export class LayoutComponent implements OnInit {
    
    logs : string[] = []
    constructor(
        private _healthService : HealthCheckService
    ) { }

    ngOnInit(): void {
        this._healthService.getLogs().subscribe(l=>this.logs = l)
    }
}
