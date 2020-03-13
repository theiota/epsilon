import { GreekLetter } from '../types/GreekLetter';
import { Constant } from '../constants/constant';
import { Expression } from '../../equations/expressions/expression';
import { Term } from '../terms/term';
import { Operators } from '../operators/operators';


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

    private compareVariable(variable: Variable): boolean {
        if(this.name == variable.name && this.exponent == variable.exponent) 
    }

    public add(variable: Variable): Expression | Term;
    public add(constant: Constant): Expression;
    public add(expression: Expression): Expression;

    public add(type: Variable | Constant | Expression): Expression | Term {
        if(type instanceof Variable) {
            if(this.compareVariable(type)) {
                return new Term({
                    operator: Operators.Add,
                    value: new Variable 
                })
            }
        } else if (type instanceof Constant) {

        } else if (type instanceof Expression) {

        }
    }

    public subtract(variable: Variable): Expression | Variable;
    public subtract(constant: Constant): Expression;
    public subtract(expression: Expression): Expression;

    public subtract(): Expression | Variable {

    }

    /**
     * divide
     */
    public divide(): Expression | Variable {
        
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