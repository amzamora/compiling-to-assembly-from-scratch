with import <nixpkgs> { };

mkShell {
    buildInputs = [
        nodejs
        nodePackages.typescript
    ];
}
