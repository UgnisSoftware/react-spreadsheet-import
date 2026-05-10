import { dirname, join } from "node:path"
import type { StorybookConfig } from "storybook-react-rsbuild"

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")))
}

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    {
      name: getAbsolutePath("storybook-addon-rslib"),
    },
    getAbsolutePath("@storybook/addon-docs"),
  ],

  framework: {
    name: getAbsolutePath("storybook-react-rsbuild"),
    options: {},
  },

  typescript: {
    reactDocgen: "react-docgen-typescript",
    check: true,
  },
}

export default config
