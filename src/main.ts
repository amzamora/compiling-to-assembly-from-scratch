import * as Parser from "./parser"

let source = new Parser.Source("hello1 bye2", 0);
let result = Parser.Parser.regexp(/hello[0-9]/y).parse(source);
console.log(result);
