const path = require("path")

const toPath = (_path) => path.join(process.cwd(), _path)

module.exports = {
  stories: ["../src/**/stories/*.stories.tsx"],
  babel: async (options) => ({
    ...options,
    presets: [
      ...options.presets,
      [
        "@babel/preset-react",
        {
          importSource: "lape",
          runtime: "automatic",
        },
        "preset-react-jsx-transform", // Can name this anything, just an arbitrary alias to avoid duplicate presets'
      ],
    ],
  }),
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    })
    return {
      ...config,
      devtool: "inline-source-map",
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          "@emotion/core": toPath("node_modules/@emotion/react"),
          "emotion-theming": toPath("node_modules/@emotion/react"),
        },
      },
    }
  },
}
