import * as Parser from "./parser"

let source = new Parser.Source("hello1 bye2", 0);
let result = Parser.Parser.regexp(/hello[0-9]/y).parse(source);
console.log(result);


let pair =
    Parser.Parser.regexp(/[0-9]+/y).bind((first) =>
        Parser.Parser.regexp(/,/y).bind((_) =>
            Parser.Parser.regexp(/[0-9]+/y).bind((second) =>
                Parser.Parser.constant([first, second]))));
console.log(pair.parse(new Parser.Source("12,34", 0)))
