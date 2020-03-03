import { GreekLetter } from '../types/GreekLetter';
import { Constant } from '../constants/constant';


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

    

}