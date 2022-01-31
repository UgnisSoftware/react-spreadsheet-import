import typescript from "rollup-plugin-typescript2"

export default {
  input: `src/index.ts`,
  preserveModules: true,
  output: {
    format: "esm",
    dir: "./dist",
  },
  external: [],
  watch: {
    include: "src/**",
  },
  plugins: [
    typescript({
      typescript: require("ttypescript"),
      tsconfigDefaults: {
        exclude: ["**/*.test.ts", "**/*.test.tsx", "**/tests", "**/stories"],
        compilerOptions: {
          declaration: true,
          plugins: [
            { transform: "typescript-transform-paths" },
            { transform: "typescript-transform-paths", afterDeclarations: true },
          ],
        },
      },
    }),
  ],
}
