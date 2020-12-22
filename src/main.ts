import * as Parser from "./parser"

let Source = Parser.Source
let {regexp, constant, error} = Parser.Parser

let source = new Source("hello1 bye2", 0);
let result = regexp(/hello[0-9]/y).parse(source);
console.log(result);


let pair =
    regexp(/[0-9]+/y).bind((first) =>
        regexp(/,/y).and(
            regexp(/[0-9]+/y).map((second) => [first, second])));

console.log(pair.parse(new Source("12,345", 0)))
