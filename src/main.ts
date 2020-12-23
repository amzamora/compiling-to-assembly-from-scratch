import * as Parser from "./parser"
import * as ast from "./ast"

let Source = Parser.Source
let parser = Parser.parser
let {regexp, constant, error} = Parser.Parser
let {comparison} = Parser


let result = parser.parseStringToCompletion(`function main() {
    assert(4 == 2 + 2);
}`) as ast.Block
result.statements[0].emit()
