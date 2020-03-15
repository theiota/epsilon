import test from 'ava';
import { Variable } from './variable';
import { Constant } from '../constants/constant';
import { GreekLetter } from '../types/GreekLetter';
import { Term } from '../terms/term';
import { Operators } from '../operators/operators';
import { Expression } from '../../equations/expressions/expression';

/*

Construction tests

*/

test("Initializes with an alphabetic name", t => {
    t.truthy(new Variable({ name: "h", exponent: new Constant({ value: 1 }) }))
})

test("Initializes with a Greek Letter name", t => {
    t.truthy(new Variable({ name: GreekLetter.Alpha, exponent: new Constant({ value: 1 }) }))
})

// test("")

/*

Utility tests

*/

/* Functions used in  */

/* Operators */


/* Addition */
test("Can add two variables of the same name", t => {
    let x = new Variable({
        name: "x",
        exponent: new Constant({
            value: 2
        })
    })

    let x2 = new Variable({
        name: "x",
        exponent: new Constant({
            value: 2
        })
    })

    let addition = x.add(x2)

    let expected = new Term({
        coefficient: new Constant({value: 2}),
        value: x,
        operator: Operators.Add
    })

    t.deepEqual(addition, expected)
})

test("Can add two different variables", t => {
    let x = new Variable({
        name: "x",
        exponent: new Constant({
            value: 2
        })
    })

    let y = new Variable({
        name: "y",
        exponent: new Constant({
            value: 2
        })
    })

    let addition = x.add(y)

    let expected = new Expression({
        terms: [
            x.toTerm(),
            y.toTerm()
        ],
        operator: Operators.Add
    })

    t.deepEqual(addition, expected)
})

test("Can add a variable and a constant", t => {
    let x = new Variable({
        name: "x",
        exponent: new Constant({
            value: 2
        })
    })

    let constant = new Constant({
        value: 3
    })

    let addition = x.add(constant)

    let expected = new Expression({
        terms: [
            x.toTerm(),
            constant.toTerm()
        ],
        operator: Operators.Add
    })

    t.deepEqual(addition, expected)
})

test.todo("Tests for function chaining in addition")
// TODO: Finish off tests for variables