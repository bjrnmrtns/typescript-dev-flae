{
  inputs.nixpkgs.url = github:NixOS/nixpkgs;

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem
    (system: let
      pkgs = import nixpkgs {
        inherit system;
      };
    in {
      devShells.default = pkgs.mkShell {
        buildInputs = [
          pkgs.python3
          pkgs.nodejs
          pkgs.nodePackages.pnpm
          pkgs.nodePackages.typescript
          pkgs.nodePackages.eslint
          pkgs.nodePackages.prettier
          pkgs.nodePackages.typescript-language-server
        ];
      };
    });
}
