import { Expression } from '../expressions/expression';

export interface FractionParams {
    top: Expression
    bottom: Expression
}

export class Fraction {

    top: Expression
    bottom: Expression

    constructor(params: FractionParams) {
        this.top = params.top
        this.bottom = params.bottom
    }
}