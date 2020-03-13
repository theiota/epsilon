import { GreekLetter } from '../types/GreekLetter';
import { Constant } from '../constants/constant';
import { Expression } from '../../equations/expressions/expression';


export type VariableNameType = GreekLetter | String

export interface VariableParams {
    name: VariableNameType
    exponent: Constant
}

/**
 * The class that manipulated mathematical variables.
 * 
 * ### Usage
 * ```js
 * const x = new Variable({name: "x", exponent: new Constant({value: 3})})
 * 
 * console.log(x.name) // Outputs "x"
 * 
 * ```
 *
 * @export
 * @class Variable
 */
export class Variable {

    name: VariableNameType
    
    /**
     * The exponent of a variable.
     * 
     * ### Example
     * In the expression `x^2`, the '2' would be represented as a [[Constant]].
     *
     * @type {Constant}
     * @memberof Variable
     */
    exponent: Constant

    constructor(params: VariableParams) {
        this.name = params.name
        this.exponent = params.exponent
    }

    /**
     * multiply
     */
    public multiply(): Expression | Variable {
        
    }

    public add() {

    }
    /**
     * toString
     */
    public toString(): string {
        return `${this.name}^${this.exponent}`
    }

}

export interface VariableInfoObjectValue {
    variable: Variable
    count: number
    coefficientSum: number
}

export interface VariableInfoObjectType {
    [variableString: string]: VariableInfoObjectValue
}