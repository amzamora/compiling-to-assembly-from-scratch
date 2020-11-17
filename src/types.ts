export interface AST {
    equals(AST): boolean;
}

export class Number implements AST {
    constructor(public value: number) {}
    equals(other: AST) {
        if (other instanceof Number && other.value === this.value) return true;
        else                                                       return false;
    }
}
