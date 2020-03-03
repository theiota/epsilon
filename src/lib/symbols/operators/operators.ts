export enum BasicOperators {
    Add = '+',
  Subtract = '-',
  Multiply = '*',
  Divide = '/',
  Exponentiate = '^',
  None = ''
}

export type DistributableOperator = BasicOperators.Add | BasicOperators.Subtract