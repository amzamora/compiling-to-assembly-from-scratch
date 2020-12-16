import * as ast from "./ast"

// Parser primitives
// -----------------
export class ParseResult<T> {
    constructor(public value: T, public source: Source) {}
}

export class Source {
    constructor(public string: string, public index: number) {}

    match(regexp: RegExp): (ParseResult<string> | null) {
        console.assert((regexp as any).sticky)
        regexp.lastIndex = this.index
        let match = this.string.match(regexp)
        if (match) {
            let value = match[0]
            let newIndex = this.index + value.length
            let source = new Source(this.string, newIndex)
            return new ParseResult(value, source)
        }
        return null;
    }
}

export class Parser<T> {
    constructor(public parse: (Source) => (ParseResult<T> | null)) {}

    static regexp(regexp: RegExp): Parser<string> {
        return new Parser(source => source.match(regexp))
    }

    static constant<U>(value: U): Parser<U> {
        return new Parser(source => new ParseResult(value, source))
    }

    static error<U>(message: string): Parser<U> {
        return new Parser(source => {
            throw Error(message)
        })
    }

    static maybe<U>(parser: Parser<U>): Parser<U | null> {
        return parser.or(Parser.constant(null))
    }

    static zeroOrMore<U>(parser: Parser<U>): Parser<Array<U>> {
        return new Parser(source => {
            let results = []
            let item
            while (item = parser.parse(source)) {
                source = item.source
                results.push(item.value)
            }
            return new ParseResult(results, source)
        })
    }

    or(parser: Parser<T>): Parser<T> {
        return new Parser((source) => {
            let result = this.parse(source)
            if (result) {
                return result;
            }
            else {
                return parser.parse(source);
            }
        })
    }

    bind<U>(callback: (value: T) => Parser<U>): Parser<U> {
        return new Parser((source) => {
            let result = this.parse(source)
            if (result) {
                let value = result.value
                let source = result.source
                return callback(value).parse(source)
            }
            else {
                return null
            }
        })
    }

    and<U>(parser: Parser<U>): Parser<U> {
        return this.bind((_) => parser)
    }

    map<U>(callback: (t: T) => U): Parser<U> {
        return this.bind((value) => Parser.constant(callback(value)))
    }

    parseStringToCompletion(string: string): T {
        let source = new Source(string, 0)
        let result = this.parse(source)
        if (!result) {
            throw Error("Parse error at index 0")
        }
        else {
            return result.value
        }
    }
}

// Actual parser
// -------------

let {regexp, constant, error, maybe, zeroOrMore} = Parser

// Basics
export const whitespace = regexp(/[ \n\r\t]+/y)
export const commments  = regexp(/[/][/].*/y).or(regexp(/[/][*].*[*][/]/sy))
export const ignored = Parser.zeroOrMore(whitespace.or(commments))
export const token = (pattern) =>
    regexp(pattern).bind((value) =>
        ignored.and(constant(value)))

// Tokens
export const FUNCTION = token(/function\b/y)
export const IF = token(/if\b/y)
export const ELSE = token(/else\b/y)
export const RETURN = token(/return\b/y)
export const VAR = token(/var\b/y)
export const WHILE = token(/while\b/y)
export const COMMA = token(/[,]/y)
export const SEMICOLON = token(/;/y)
export const LEFT_PAREN = token(/[(]/y)
export const RIGHT_PAREN = token(/[)]/y)
export const LEFT_BRACE = token(/[{]/y)
export const RIGHT_BRACE = token(/[}]/y)
export const NUMBER = token(/[0-9]+/y).map((digits) =>
                         new ast.Number(parseInt(digits)))
export const ID = token(/[a-zA-Z_][a-zA-Z0-9_]*/y)
export const id = ID.map((x) => new ast.Id(x))
export const NOT = token(/!/y).map((_) => ast.Not)
export const EQUAL = token(/==/y).map((_) => ast.Equal)
export const NOT_EQUAL = token(/!=/y).map((_) => ast.NotEqual)
export const PLUS = token(/[+]/y).map((_) => ast.Add)
export const MINUS = token(/[-]/y).map((_) => ast.Subtract)
export const STAR = token(/[*]/y).map((_) => ast.Multiply)
export const SLASH = token(/[/]/y).map((_) => ast.Divide)

// Expressions
export const expression: Parser<ast.AST> =
    Parser.error("expression parser used before definition")

// args <- (expression (COMMA expression)*)?
export const args: Parser<Array<ast.AST>> =
    expression.bind((arg) =>
        zeroOrMore(COMMA.and(expression)).bind((args) =>
            constant([arg, ...args]))).or(constant([]))

// call <- ID LEFT_PAREN args RIGHT_PAREN
export const call: Parser<ast.AST> =
    ID.bind((callee) =>
        LEFT_PAREN.and(args.bind((args) =>
            RIGHT_PAREN.and(
                constant(new ast.Call(callee, args))))));

// atom <- call / ID / NUMBER / LEFT_PAREN expression RIGHT_PAREN
export const atom: Parser<ast.AST> =
    call.or(id).or(NUMBER).or(
        LEFT_PAREN.and(expression).bind((e) =>
            RIGHT_PAREN.and(constant(e))))
