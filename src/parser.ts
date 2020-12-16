export * from "./ast"

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

    zeroOrMore<U>(parser: Parser<U>): Parser<Array<U>> {
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
}
