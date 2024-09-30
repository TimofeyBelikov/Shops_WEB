import { loyaltyProgram } from "./models";

export const LOYALTY_PROGRAMMS : Partial<loyaltyProgram>[] = [
    {
        level : 'base',
        discount : 5
    },
    {
        level : 'silver',
        discount : 10
    },
    {
        level : 'gold',
        discount : 15
    }
]

export const PRODUCT_TYPES : string[] = [
    'econom', 'standard', 'premium'
]