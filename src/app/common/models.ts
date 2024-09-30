export interface HealthCheck{
    health : HealthCheckStatus,
    err ?: string
}

export type HealthCheckStatus= "ok" | "err" | 'unkn'


export interface Config{
    proxy_url : string
}

export interface Log{
    time : string,
    method : string,
    msg : string,
    uuid ?: string
}

export interface Redis_Record{
    key : string,
    type?: any,
    value : string
}

export interface Redis_Record_Hash extends Redis_Record{
    field : string 
}


// 
export interface Product extends MongoRecord{
    name : string,
    type : 'econom' | 'standard' | 'premium',
    attributes : any,
    base_price : number,
    wholesale_price : number,
    tax : number
}

export interface Stand extends MongoRecord{
    name : string,
    products : Product[]
}

export interface loyaltyProgram extends MongoRecord{
    id : string
    level : 'base' | 'silver' | 'gold',
    discount : number
}

export interface Store extends MongoRecord{
    name : string,
    stands : Stand[]
    loyaltyProgram : loyaltyProgram
}

export interface MongoRecord{
    id : string
}