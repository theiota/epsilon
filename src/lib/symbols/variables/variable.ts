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

    private isVariableSame(variable: Variable): boolean {
        return (this.name == variable.name && this.exponent == variable.exponent) ? true : false
    }

    private isTermSame(term: Term): boolean {
        if (term.value instanceof Array || term.value instanceof Constant) {
            return false
        } else if (term.value instanceof Variable) {
            return this.isVariableSame(term.value)
        }
    }

    public add(variable: Variable): Expression | Term;
    public add(constant: Constant): Expression;
    public add(expression: Expression): Expression;
    public add(term: Term): Expression | Term;

    public add(value: Variable | Constant | Expression): Expression | Term {
        if (value instanceof Variable) {
            if (this.isVariableSame(value)) {
                return new Term({
                    operator: Operators.Add,
                    value: new Variable({
                        name: this.name,
                        exponent: this.exponent
                    }),
                    coefficient: new Constant({
                        value: 2
                    })
                })
            } else if (!this.isVariableSame(value)) {
                return new Expression({
                    terms: [
                        this,

                    ],
                    operator: Operators.Add
                })
            }
        } else if (value instanceof Constant) {

        } else if (value instanceof Expression) {

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

    public toString(): string {
        return `${this.name}^${this.exponent}`
    }

    /**
     * A function to change a [[Variable]] to a [[Term]]. This takes the original variable and combines it with an operator and a coefficient to make a [[Term]].
     *
     * @param {Constant} [coefficient]
     * @returns {Term}
     * @memberof Variable
     */
    public toTerm(coefficient?: Constant): Term {
        return new Term({
            operator: Operators.Add,
            coefficient: !!coefficient ? coefficient : new Constant({ value: 1 }),
            value: this
        })
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