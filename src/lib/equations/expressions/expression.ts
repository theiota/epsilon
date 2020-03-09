import { Term } from '../../symbols/terms/term';
import { Operators, DistributableOperator } from '../../symbols/operators/operators';
import { NormalExpression } from '../../UTypes/expressions/normalExpression';
import { Variable } from '../../symbols/variables/variable';
import { Constant } from '../../symbols/constants/constant';
export interface ExpressionParams {
    terms: Term[]
    operator: Operators
}

/**
 *A class that can manipulate mathematical expressions. These make up [[Equations]].
 *
 * @export
 * @class Expression
 * @implements {NormalExpression}
 */
export class Expression implements NormalExpression {

    terms: Term[]
    operator: Operators


    /**
     * Gets the degree of a mathematical [[Expression]].
     *
     * @readonly
     * @type {number}
     * @memberof Expression
     */
    public get degree(): number {
        let exprSum: number = 0

        const degrees = this.terms.map((term: Term) => {
            let sum: number = 0
            // Dealing with the two cases in which exponents are present
            if (term.value instanceof Variable) {
                // A variable only has one exponent
                sum += term.value.exponent.value
            } else if (term.value instanceof Array) {
                // A term with multiple variables will have a degree that is the sum of the degrees of each variable.
                let degreesOfTerm: Constant[] = term.value.map((variable: Variable) => {
                    return variable.exponent
                })

                // Summing up all the degrees.
                degreesOfTerm.forEach((constant: Constant) => sum += constant.value)

            }

            return sum
        })

        degrees.forEach(degree => exprSum += degree)
        
        return exprSum
    }


    constructor(params: ExpressionParams) {
        this.terms = params.terms
        this.operator = params.operator
    }

    /**
   * A command to add two expressions together. Supports function chaining.
   * @param expression The expression you wish to use the `add` command with.
   */
  add(expression: Expression): Expression {
    return expression
  }

  /**
   * A command to multiply two expressions together. Supports function chaining.
   * @param expression The expression you wish to use the `multiply` command with.
   */
  multiply(expression: Expression): Expression {
    return expression
  }

  /**
   * A command to add two expressions together. Supports function chaining.
   * @param expression The expression you wish to use the `divide` command with.
   */
  divide(expression: Expression): Expression {
    return expression
  }

  /**
   * A command to subtract one expression from another. Supports function chaining.
   * @param expression The expression you wish to use the `subtract` command with.
   */
  subtract(expression: Expression): Expression {
    let _expression = expression
    _expression = Expression.distributeOperators(expression, BasicOperators.Subtract)

    console.log(Expression.appendExpressions(_expression, this))

    return this
  }

  /**
   * A helper function for [[distributeOperators]], in order to negate a certain type of operator.
   * @param operator The operator to be negated.
   */
  public static negateDistributableOperator(
    operator: DistributableOperator
  ): DistributableOperator {
    // VSCode will throw an error, stating that it's being used without being defined.
    let returnOperator: DistributableOperator = BasicOperators.Subtract
    switch (operator) {
      case BasicOperators.Add:
        returnOperator = BasicOperators.Subtract
        break

      case BasicOperators.Subtract:
        returnOperator = BasicOperators.Add
        break

      default:
        break
    }

    return returnOperator
  }

  /**
   * A function that distributes an operator over a certain expression.
   * @param expression The expression to be distributed against
   * @param operator The operator to distribute
   */
  static distributeOperators(expression: Expression, operator: DistributableOperator): Expression {
    let prototypeExpression = expression
    expression.terms.forEach((_, index) => {
      switch (expression.operator) {
        case BasicOperators.Add:
          if (operator === BasicOperators.Add) {
            expression.terms[index].operator = BasicOperators.Add
          } else if (operator === BasicOperators.Subtract) {
            expression.terms[index].operator = BasicOperators.Subtract
          }
          break

        case BasicOperators.Subtract:
          if (operator === BasicOperators.Add) {
            expression.terms[index].operator = BasicOperators.Subtract
          } else if (operator === BasicOperators.Subtract) {
            expression.terms[index].operator = BasicOperators.Add
          }
          break

        case BasicOperators.Multiply:
          break

        case BasicOperators.Divide:
          break

        default:
          break
      }
    })
    return prototypeExpression
  }

  /**
   * A function used for concatenating two expressions. This is normally used a sa helper function for [collectLikeTerms].
   * @param lhs The left hand side expression.
   * @param rhs The right hand side expression.
   */
  public static appendExpressions(lhs: Expression, rhs: Expression): Expression {
    let prototypeExpression: Expression = lhs

    prototypeExpression.terms = [...lhs.terms, ...rhs.terms]
    return prototypeExpression
  }

  public static collectLikeTerms(expression: Expression): Expression {
    let prototypeExpression: Expression = expression
    let termsWithoutCoefficients: any[] = []

    expression.terms.forEach(term => {
      termsWithoutCoefficients.push({
        operator: term.operator,
        value: term.value
      })
    })

    let indicesOfLikeTerms: number[][] = []

    termsWithoutCoefficients.forEach(element => {
      let indices: number[] = []
      termsWithoutCoefficients.forEach((termProt, index) => {
        if (!([] as number[]).concat(...indicesOfLikeTerms).includes(index)) {
          if (
            termProt === element &&
            element.operator !== BasicOperators.Multiply &&
            element.operator !== BasicOperators.Divide
          ) {
            indices.push(index)
          }
        }
      })
      indicesOfLikeTerms.push(indices)
    })

    indicesOfLikeTerms.forEach(term => {
      // TODO: loop through terms to sum up coefficients
      console.log(term)
    })

    return prototypeExpression
  }

  /**
   * The method to stringify an expression using its `this` property.
   */
  public toString(): String {
    return Expression.toString(this)
  }

  /**
   * The general method for stringifying an Expression.
   * @param expression The expression to be stringified
   */
  public static toString(expression: Expression): String {
    let prototypeString: string = ''

    expression.terms.forEach(term => {
      prototypeString += term.toString()
    })

    prototypeString = `${expression.operator}(${prototypeString})`

    return prototypeString
  }
    
}