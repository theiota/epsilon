/**
 * The initialization type for the [[Constant]] class.
 */
export type ConstantInitType = number

/**
 * The parameters used in the [[Constant]] class.
 */
export interface ConstantParams {
    value: ConstantInitType
}

/**
 * The class for manipulating constants. This provides functionality for numbers and basic Greek Letters, provided the normal data set is being used.
 *
 * ### Usage
 * ```js
 * const x = new Constant({value: 3})
 * 
 * console.log(x.value) // Will log 3
 * ```
 * 
 * @export
 * @class Constant
 */
export class Constant {
    value: ConstantInitType
    constructor(params: ConstantParams) {
        this.value = params.value
    }

    
    /**
     * A property of [[Constant]] that returns a string.
     *
     * @returns {string} The string of the [[Constant]]
     * @memberof Constant
     */
    public toString(): string {
        return this.value.toString()
    }

    
    /**
     * A property of [[Constant]] that returns a string. This is just a wrapper of the [[toString]] function.
     *
     * @readonly
     * @type {string} The string of the [[Constant]]
     * @memberof Constant
     */
    public get string(): string {
        return this.toString()
    }
    
}