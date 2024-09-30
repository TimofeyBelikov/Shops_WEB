import { Component, Input, OnInit } from '@angular/core';
import { Product, Store } from 'src/app/common/models';

@Component({
    selector: 'product-price',
    styleUrls : ['./product-price.component.scss'],
    templateUrl: 'product-price.component.html',
})

export class ProductPriceComponent implements OnInit {

    @Input() store : Store
    
    @Input() 
    set product(value : Product){
        this._product = value
        this.genPriceObject(value)
    }
    get product() : Product{
        return this._product
    }
    private _product : Product
    

    prices : {
        econom : {
            base_sale: {
                base_price : ProductDiscount,
                corp_price : ProductDiscount
            },
            whole_sale : {
                base_price : ProductDiscount,
                corp_price : ProductDiscount
            }
        },
        standard : {
            base_sale: {
                base_price : ProductDiscount,
                corp_price : ProductDiscount
            },
            whole_sale : {
                base_price : ProductDiscount,
                corp_price : ProductDiscount
            }
        },
        premium : {
            base_sale: {
                base_price : ProductDiscount,
                corp_price : ProductDiscount
            },
            whole_sale : {
                base_price : ProductDiscount,
                corp_price : ProductDiscount
            }
        }
    }

    constructor() { }

    ngOnInit() { 

    }

    genPriceObject(product : Product){
        
        const baseAfterTax : number = product.base_price + product.tax
        const wholeAfterTax : number = product.wholesale_price + product.tax


        let catDiscount = {
            econom : {
                base_sale : {
                    base_price : {
                        discount : 5,
                        price : this._calcDiscount(baseAfterTax, 5)
                    },
                    corp_price : {
                        discount : 2,
                        price : this._calcDiscount(baseAfterTax, 2)
                    }
                },
                whole_sale : {
                    base_price : {
                      discount : 6,
                      price : this._calcDiscount(wholeAfterTax, 6)   
                    },
                    corp_price : {
                        discount : 3,
                        price : this._calcDiscount(wholeAfterTax, 3)
                    }
                }
            },
            standard : {
                base_sale : {
                    base_price : {
                        discount : 7,
                        price : this._calcDiscount(baseAfterTax, 7)
                    },
                    corp_price : {
                        discount : 4,
                        price : this._calcDiscount(baseAfterTax, 4)
                    },
                },
                whole_sale : {
                    base_price : {
                        discount : 7,
                        price : this._calcDiscount(wholeAfterTax, 7)   
                    },
                    corp_price : {
                        discount : 5,
                        price : this._calcDiscount(wholeAfterTax, 5)   
                    },
                }
            },
            premium : {
                base_sale : {
                    base_price : {
                        discount : 10,
                        price : this._calcDiscount(baseAfterTax, 10)
                    },
                    corp_price : {
                        discount : 5,
                        price : this._calcDiscount(baseAfterTax, 5)
                    },
                },
                whole_sale : {
                    base_price :  {
                        discount : 11,
                        price : this._calcDiscount(wholeAfterTax, 11)   
                    },
                    corp_price :  {
                        discount : 6,
                        price : this._calcDiscount(wholeAfterTax, 6)   
                    },
                }
            }
            
        }

        this.prices = catDiscount

        let wholeDiscount : [
            {
                count : 10,
                value : 2
            },
            {
                count : 100,
                value : 3
            },
            {
                count : 1000,
                value : 5
            }
        ]
    }

    private _calcDiscount(originalPrice: number, discountPercent: number): number {
        const discountMultiplier = 1 - (discountPercent / 100);
        const discountedPrice = originalPrice * discountMultiplier;
        return discountedPrice;
    }
}

interface ProductDiscount{
    discount : number,
    price : number
}