with import <nixpkgs> { };

mkShell {
    buildInputs = [
        nodejs
        nodePackages.npm
        nodePackages.typescript
    ];
}
