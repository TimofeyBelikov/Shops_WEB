import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ConfigService } from './config.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit, AfterViewInit, OnDestroy {
    
    form = this._formBuilder.group({
        auto : ([true, Validators.nullValidator]),
        username : (['default',  Validators.required]),
        redis_ip : (['127.0.0.1']),
        redis_port : (['49153', Validators.required]) 
    })    

    constructor(
        private _formBuilder : FormBuilder,
        private _configService : ConfigService
    ) { }
    

    ngOnInit(): void{
        
    }
    
    ngAfterViewInit(): void {

    }
    
    ngOnDestroy(): void {
        
    }
}
