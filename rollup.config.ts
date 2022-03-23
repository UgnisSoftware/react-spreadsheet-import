import typescript from "rollup-plugin-typescript2"

export default {
  input: `src/index.ts`,
  preserveModules: true,
  output: [
    {
      format: "commonjs",
      dir: "./dist-commonjs",
    },
    {
      format: "esm",
      dir: "./dist",
    },
  ],
  external: [],
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
      typescript: require("ttypescript"),
      tsconfigDefaults: {
        exclude: ["**/*.test.ts", "**/*.test.tsx", "**/tests", "**/stories", "./dist", "./dist-commonjs"],
        compilerOptions: {
          declarationDir: "./types",
          declaration: true,
          plugins: [{ transform: "typescript-transform-paths", afterDeclarations: true }],
        },
      },
    }),
  ],
}
