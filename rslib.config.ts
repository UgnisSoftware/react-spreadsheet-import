import { pluginReact } from "@rsbuild/plugin-react"
import { defineConfig } from "@rslib/core"

export default defineConfig({
  source: {
    entry: {
      index: ["src/**/*.{ts,tsx}", "!src/**/stories/**", "!src/**/tests/**"],
    },
    tsconfigPath: "./tsconfig.build.json",
  },
  lib: [
    {
      bundle: false,
      dts: true,
      format: "esm",
    },
    {
      bundle: false,
      format: "cjs",
      output: {
        distPath: {
          root: "dist-commonjs",
        },
      },
    },
  ],
  output: {
    target: "web",
  },
  plugins: [pluginReact()],
})
