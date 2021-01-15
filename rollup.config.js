import esbuild from "rollup-plugin-esbuild"
import commonjs from "@rollup/plugin-commonjs"
import { nodeResolve } from "@rollup/plugin-node-resolve"

const common = {
  plugins: [commonjs(), nodeResolve(), esbuild({ minify: true })],
}

export default [
  {
    input: "client/out/extension.js",
    output: {
      file: "dist/extension.js",
      format: "cjs",
    },
    ...common,
  },
  {
    input: "server/out/server.js",
    output: {
      file: "dist/server.js",
      format: "cjs",
    },
    ...common,
  },
]
