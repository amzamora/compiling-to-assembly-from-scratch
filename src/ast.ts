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
        emit(`  ldr r0, =${this.value}`)
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
        this.term.emit()
        emit(`  cmp r0, #0`)
        emit(`  moveq, r0, #1`)
        emit(`  movne, r0, #0`)
    }
}

export class Equal implements AST {
    constructor(public left: AST, public right: AST) {}

    equals(other: AST) {
        if (other instanceof Equal && (other.left.equals(this.left) && other.right.equals(this.right))) return true;
        else                                                                                            return false;
    }

    emit() {
        this.left.emit()
        emit(`  push {r0, ip}`)
        this.right.emit()
        emit(`  pop {r1, ip}`)
        emit(`  cmp r0, r1`)
        emit(`  moveq r0, #1`)
        emit(`  movne r0, #0`)
    }
}

export class NotEqual implements AST {
    constructor(public left: AST, public right: AST) {}

    equals(other: AST) {
        if (other instanceof NotEqual && (other.left.equals(this.left) && other.right.equals(this.right))) return true;
        else                                                                                               return false;
    }

    emit() {
        this.left.emit()
        emit(`  push {r0, ip}`)
        this.right.emit()
        emit(`  pop {r1, ip}`)
        emit(`  cmp r0, r1`)
        emit(`  moveq r0, #0`)
        emit(`  movne r0, #1`)
    }
}

export class Add implements AST {
    constructor(public left: AST, public right: AST) {}

    equals(other: AST) {
        if (other instanceof Add && (other.left.equals(this.left) && other.right.equals(this.right))) return true;
        else                                                                                          return false;
    }

    emit() {
        this.left.emit()
        emit(`  push {r0, ip}`)
        this.right.emit()
        emit(`  pop {r1, ip}`)
        emit(`  add r0, r0, r1`)
    }
}

export class Subtract implements AST {
    constructor(public left: AST, public right: AST) {}

    equals(other: AST) {
        if (other instanceof Subtract && (other.left.equals(this.left) && other.right.equals(this.right))) return true;
        else                                                                                               return false;
    }

    emit() {
        this.left.emit()
        emit(`  push {r0, ip}`)
        this.right.emit()
        emit(`  pop {r1, ip}`)
        emit(`  sub r0, r0, r1`)
    }
}

export class Multiply implements AST {
    constructor(public left: AST, public right: AST) {}

    equals(other: AST) {
        if (other instanceof Multiply && (other.left.equals(this.left) && other.right.equals(this.right))) return true;
        else                                                                                               return false;
    }

    emit() {
        this.left.emit()
        emit(`  push {r0, ip}`)
        this.right.emit()
        emit(`  pop {r1, ip}`)
        emit(`  mul r0, r0, r1`)
    }
}

export class Divide implements AST {
    constructor(public left: AST, public right: AST) {}

    equals(other: AST) {
        if (other instanceof Divide && (other.left.equals(this.left) && other.right.equals(this.right))) return true;
        else                                                                                             return false;
    }

    emit() {
        this.left.emit()
        emit(`  push {r0, ip}`)
        this.right.emit()
        emit(`  pop {r1, ip}`)
        emit(`  udiv r0, r0, r1`)
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

    emit() {
        emit(`.global main`)
        emit(`main:`)
        emit(`  push {fp, lr}`)
        this.statements.forEach((statement) => statement.emit())
        emit(`  mov r0, #0`)
        emit(`  pop {fp, pc}`)
    }

    equals(other: AST) {
        return other instanceof Main && other.statements.every((stmt, i) => stmt.equals(this.statements[i]))
    }
}

export class Assert implements AST {
    constructor(public condition: AST) {}

    emit() {
        this.condition.emit()
        emit(`  cmp r0, #1`)
        emit(`  moveq r0, #'.'`)
        emit(`  movne r0, #'F'`)
        emit(`  bl putchar`)
    }

    equals(other: AST) {
        return other instanceof Assert && other.condition.equals(this.condition)
    }
}
