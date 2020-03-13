import { Operators } from '../operators/operators';
import { Constant } from '../constants/constant';
import { Variable } from '../variables/variable';
// import { Fraction } from '../../equations/fractions/fraction';

export type TermValue = Constant | Variable | Variable[]

export interface TermParams {
    operator: Operators
    coefficient: Constant
    value: TermValue
}

export class Term {
    value: TermValue
    coefficient: Constant
    operator: Operators

    /**
     *Creates an instance of a {{Term}}.
     * @param {TermParams} params
     * @memberof Term
     */
    constructor(params: TermParams) {
        this.value = params.value
        this.coefficient = params.coefficient
        this.operator = params.operator
    }

    /**
     * exponentiate
     */
    public exponentiate(exponent: Constant): Term {
        if (this.value instanceof Variable) {
            // Variable exponent logic
            this.value.exponent.value = this.value.exponent.value * exponent.value
            // Changing coefficient value
            this.coefficient.value = this.coefficient.value ** exponent.value
          } else if (this.value instanceof Constant) {
            this.value.value = this.value.value ** exponent.value
      
            // Changing coefficient value
            this.coefficient.value = this.coefficient.value ** exponent.value
          } else {
            // Array of variable logic
            this.value = this.value.map(variable => {
              // Declaring a prototype variable for returning
              let prototypeVariable = variable
      
              // Same logic as Variable logic
              prototypeVariable.exponent.value = prototypeVariable.exponent.value * exponent.value
      
              return prototypeVariable
            })
      
            // Changing coefficient value
            this.coefficient.value = this.coefficient.value ** exponent.value
          }
      
          return this
    }

    /**
     * toString
     */
    public toString(): string {
        let prototypeString: string = ""

        prototypeString += this.operator

        if (this.value instanceof Variable) {
          prototypeString += `${this.coefficient}${this.value.name}^${this.value.exponent}`
        } else if (this.value instanceof Constant) {
          prototypeString += `${this.value.string}`
        } else if (this.value instanceof Array) {
          
        }

        return prototypeString
    }

    /**
     * toTex
     */
    public toTex(): string {
        return ""
    }
}