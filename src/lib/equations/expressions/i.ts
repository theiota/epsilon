import { Expression } from './expression';
import { Term } from '../../symbols/terms/term';
import { Operators } from '../../symbols/operators/operators';
import { Constant } from '../../symbols/constants/constant';
import { Variable } from '../../symbols/variables/variable';
import { GreekLetter } from '../../symbols/types/GreekLetter';
let x = new Expression({
    terms: [
        new Term({
            operator: Operators.Add,
            coefficient: new Constant({
                value: 5
            }),
            value: [
                new Variable({
                    name: GreekLetter.Alpha,
                    exponent: new Constant({value: 5})
                })
            ]
        }),
        new Term({
            operator: Operators.Add,
            coefficient: new Constant({
                value: 3
            }),
            value: [
                new Variable({
                    name: GreekLetter.Alpha,
                    exponent: new Constant({value: 5})
                })
            ]
        }),
        new Term({
            operator: Operators.Add,
            coefficient: new Constant({
                value: 4
            }),
            value: [
                new Variable({
                    name: GreekLetter.Alpha,
                    exponent: new Constant({value: 5})
                })
            ]
        })
    ],
    operator: Operators.Add
})

console.log(x.degree)