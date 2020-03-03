import { Term } from './../../symbols/terms/term';
import { Expression } from '../../equations/expressions/expression';

/**
 * An interface for a normal expression.
 */
export interface NormalExpression {
    terms: Term[]
    multiply(expression: Expression): Expression
    divide(expression: Expression): Expression
    add(expression: Expression): Expression
    subtract(expression: Expression): Expression
}