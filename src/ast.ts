export const emit = console.log

export interface AST {
    equals(AST): boolean;
    emit(): void;
}

export class Number implements AST {
    constructor(public value: number) {}

    equals(other: AST) {
        if (other instanceof Number && other.value === this.value) return true;
        else                                                       return false;
    }

    emit() {
        throw Error("Not implemented yet")
    }
}

export class Id implements AST {
    constructor(public value: string) {}

    equals(other: AST) {
        if (other instanceof Id && other.value === this.value) return true;
        else                                                   return false;
    }

    emit() {
        throw Error("Not implemented yet")
    }
}

export class Not implements AST {
    constructor(public term: AST) {}

    equals(other: AST) {
        if (other instanceof Not && other.term.equals(this.term)) return true;
        else                                                      return false;
    }

    emit() {
        throw Error("Not implemented yet")
    }
}

export class Equal implements AST {
    constructor(public left: AST, public right: AST) {}

    equals(other: AST) {
        if (other instanceof Equal && (other.left.equals(this.left) && other.right.equals(this.right))) return true;
        else                                                                                            return false;
    }

    emit() {
        throw Error("Not implemented yet")
    }
}

export class NotEqual implements AST {
    constructor(public left: AST, public right: AST) {}

    equals(other: AST) {
        if (other instanceof NotEqual && (other.left.equals(this.left) && other.right.equals(this.right))) return true;
        else                                                                                               return false;
    }

    emit() {
        throw Error("Not implemented yet")
    }
}

export class Add implements AST {
    constructor(public left: AST, public right: AST) {}

    equals(other: AST) {
        if (other instanceof Add && (other.left.equals(this.left) && other.right.equals(this.right))) return true;
        else                                                                                          return false;
    }

    emit() {
        throw Error("Not implemented yet")
    }
}

export class Subtract implements AST {
    constructor(public left: AST, public right: AST) {}

    equals(other: AST) {
        if (other instanceof Subtract && (other.left.equals(this.left) && other.right.equals(this.right))) return true;
        else                                                                                               return false;
    }

    emit() {
        throw Error("Not implemented yet")
    }
}

export class Multiply implements AST {
    constructor(public left: AST, public right: AST) {}

    equals(other: AST) {
        if (other instanceof Multiply && (other.left.equals(this.left) && other.right.equals(this.right))) return true;
        else                                                                                               return false;
    }

    emit() {
        throw Error("Not implemented yet")
    }
}

export class Divide implements AST {
    constructor(public left: AST, public right: AST) {}

    equals(other: AST) {
        if (other instanceof Divide && (other.left.equals(this.left) && other.right.equals(this.right))) return true;
        else                                                                                             return false;
    }

    emit() {
        throw Error("Not implemented yet")
    }
}

export class Call implements AST {
    constructor(public callee: string, public args: Array<AST>) {}

    equals(other: AST) {
        return other instanceof Call &&
               this.callee === other.callee &&
               this.args.length === other.args.length &&
               this.args.every((arg, i) => arg.equals(other.args[i]));
    }

    emit() {
        throw Error("Not implemented yet")
    }
}

export class Return implements AST {
    constructor(public term: AST) {}

    equals(other: AST) {
        if (other instanceof Return && other.term.equals(this.term)) return true;
        else                                                         return false;
    }

    emit() {
        throw Error("Not implemented yet")
    }
}

export class Block implements AST {
    constructor(public statements: Array<AST>) {}

    equals(other: AST) {
        return other instanceof Block && other.statements.every((stmt, i) => stmt.equals(this.statements[i]))
    }

    emit() {
        throw Error("Not implemented yet")
    }
}

export class If implements AST {
    constructor(public conditional: AST, public consequence: AST, public alternative: AST) {}

    equals(other: AST) {
        if (other instanceof If && other.conditional.equals(this.conditional) && other.consequence.equals(this.consequence) && other.alternative.equals(this.alternative)) return true;
        else                                                                                                                                                               return false;
    }

    emit() {
        throw Error("Not implemented yet")
    }
}

export class Function implements AST {
    constructor(public name: string, public parameters: Array<string>, public body: AST) {}

    equals(other: AST) {
        if (other instanceof Function && other.parameters.every((param, i) => param === this.parameters[i]) && other.body.equals(this.body)) return true;
        else                                                                                                                                 return false;
    }

    emit() {
        throw Error("Not implemented yet")
    }
}

export class Var implements AST {
    constructor(public name: string, public value: AST) {}

    equals(other: AST) {
        if (other instanceof Var && other.name === this.name && other.value.equals(this.value)) return true;
        else                                                                                    return false;
    }

    emit() {
        throw Error("Not implemented yet")
    }
}

export class Assign implements AST {
    constructor(public name: string, public value: AST) {}

    equals(other: AST) {
        if (other instanceof Assign && other.name === this.name && other.value.equals(this.value)) return true;
        else                                                                                       return false;
    }

    emit() {
        throw Error("Not implemented yet")
    }
}

export class While implements AST {
    constructor(public conditional: AST, public body: AST) {}

    equals(other: AST) {
        if (other instanceof While && other.conditional.equals(this.conditional) && other.body.equals(this.body)) return true;
        else                                                                                                      return false;
    }

    emit() {
        throw Error("Not implemented yet")
    }
}

export class Main implements AST {
    constructor(public statements: Array<AST>) {}

    emit() {}

    equals(other: AST) {
        return other instanceof Main && other.statements.every((stmt, i) => stmt.equals(this.statements[i]))
    }
}

export class Assert implements AST {
    constructor(public condition: AST) {}

    emit() {}

    equals(other: AST) {
        return other instanceof Assert && other.condition.equals(this.condition)
    }
}
