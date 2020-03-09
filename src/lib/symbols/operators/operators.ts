export enum Operators {
    Add = '+',
  Subtract = '-',
  Multiply = '*',
  Divide = '/',
  Exponentiate = '^',
  None = '',
}

export type DistributableOperator = Operators.Add | Operators.Subtract