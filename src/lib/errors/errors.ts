
export class UndefinedError extends Error {
    constructor (message: string, module: string) {
        super(message)
        this.name = `E/${module}/UNDEFINED`
    }
}

export class ParseError extends Error {
    constructor (message: string, module: string) {
        super(message)
        this.name = `E/${module}/PARSINGERROR`
    }
}