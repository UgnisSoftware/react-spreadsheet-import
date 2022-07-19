const path = require("path")

const toPath = (_path: string) => path.join(process.cwd(), _path)

module.exports = {
  stories: ["../src/**/stories/*.stories.tsx"],
  core: {
    builder: {
      name: "webpack5",
      lazyCompilation: true,
    },
  },
  webpackFinal: async (config: any) => {
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
  staticDirs: ["../src/stories/static"],
}
