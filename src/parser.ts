export * from "./ast"

export class ParseResult<T> {
    constructor(public value: T, public source: Source) {}
}

export class Source {
    constructor(public string: string, public index: number) {}

    match(regexp: RegExp): (ParseResult<string> | null) {
        console.assert((regexp as any).sticky);
        regexp.lastIndex = this.index;
        let match = this.string.match(regexp);
        if (match) {
            let value = match[0];
            let newIndex = this.index + value.length;
            let source = new Source(this.string, newIndex);
            return new ParseResult(value, source);
        }
        return null;
    }
}

// export interface Parser<T> {
//     parse(Source): ParseResult<T> | null;
// }

export class Parser<T> {
    constructor(public parse: (Source) => (ParseResult<T> | null)) {}

    static regexp(regexp: RegExp): Parser<string> {
        return new Parser(source => source.match(regexp));
    }
}
