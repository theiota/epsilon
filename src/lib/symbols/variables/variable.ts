import { GreekLetter } from '../types/GreekLetter';
import { Constant } from '../constants/constant';
import { Expression } from '../../equations/expressions/expression';
import { Term } from '../terms/term';
import { Operators } from '../operators/operators';


export type VariableNameType = GreekLetter | String

/**
 * The parameters used for initialization of a [[Variable]] instance.
 *
 * @export
 * @interface VariableParams
 */
export interface VariableParams {
    name: VariableNameType
    exponent: Constant
    /**
     *This is the name assigned to the variable. For instance, to declare a variable ith name "x", you would pass the string value "x" into the [[Variable]] constructor.
     *
     * @type {VariableNameType}
     * @memberof VariableParams
     */
    readonly name: VariableNameType
    /**
     * This is the exponent of the [[Variable]].
     *
     * @type {Constant}
     * @memberof VariableParams
     */
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
        params.exponent ? this.exponent = params.exponent : this.exponent = new Constant({ value: 1 })
    }

    public isVariableSame(variable: Variable): boolean {
        return this.name == variable.name && this.exponent.value == variable.exponent.value
    }

    public add(variable: Variable): Expression | Term;
    public add(constant: Constant): Expression;
    public add(expression: Expression): Expression;
    public add(term: Term): Expression | Term;

    public add(value: Variable | Constant | Expression | Term): Expression | Term {
        const combineTerms = (t1: Term, t2: Term) => new Expression({
            terms: [
                t1,
                t2
            ],
            operator: Operators.Add
        })

        const parseSingleTerm = (value : Term) : Expression | Term => {
            var returnValue: Expression | Term = new Term({
                coefficient: new Constant({value: value.coefficient.extractNumber() + 1}),
                operator: Operators.Add,
                value: this
            });

            // This is where addition of coefficients may happen. A Variable doesn't have a coefficient intrinsic to itself, but a Term does. This is why it makes sense to bje able to combine Variables and Terms, and the other way around.
            if(value.value instanceof Variable) {
                if(this.isVariableSame(value.value)) {
                    // If the variables are the same, then return a new Term with coefficient 1 + n
                    returnValue = new Term({
                        coefficient: new Constant({value: value.coefficient.extractNumber() + 1}),
                        operator: Operators.Add,
                        value: this
                    })
                } else if (!this.isVariableSame(value.value)) {
                    returnValue = combineTerms(this.toTerm(), value)
                }
            }

            else if (value.value instanceof Constant) {
                returnValue = combineTerms(this.toTerm(), value)
            }

            else if (value.value instanceof Array) {
                returnValue = combineTerms(this.toTerm(), value)
            }
        
            return returnValue
        }

        // Type checking input value
        if (value instanceof Variable) {
            // If the two variables are the same, then combine them into a single term (seeing as variables cannot have coefficients without having a Term instance, the coefficient of them must be 2).
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
            }
            // If the variables aren't the same, then return an Expression with the two.
            else if (!this.isVariableSame(value)) {
                return combineTerms(this.toTerm(), value.toTerm())
            }
        }

        // If the variable is being combined with a Constant, then an Expression needs to be returned (a variable will never combine with a Constant).
        else if (value instanceof Constant) {
            return combineTerms(this.toTerm(), value.toTerm())
        }

        // else if (value instanceof Expression) {
        //     if(value.terms.length === 1) {

        //     }
        // }

        else if (value instanceof Term) {
            return parseSingleTerm(value)
        }

        throw new EvalError("Addition failed.")

        
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