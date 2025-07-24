import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import reactCompiler from "eslint-plugin-react-compiler"
import pluginReact from "eslint-plugin-react"
import tailwind from "eslint-plugin-tailwindcss"
import { FlatCompat } from "@eslint/eslintrc"
import path from "node:path"
import fs from "node:fs"

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

/** @type {import('eslint').Linter.Config[]} */
const config = [
  { ignores: [".next/**", "public/**", "next.config.js", "postcss.config.js"] },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  reactCompiler.configs.recommended,
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...tailwind.configs["flat/recommended"],
  {
    settings: {
      tailwindcss: {
        config: findTailwindImportCss(process.cwd()),
      },
    },
  },
  ...compat.config({
    extends: ["next"],
    settings: {
      next: {
        rootDir: ".",
      },
    },
  }),
  {
    rules: {
      "no-undef": "off",
      "react/react-in-jsx-scope": "off",
      "tailwindcss/no-custom-classname": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
]

export default config

/**
 * TEMPORARY FIX FOR TAILWIND 4
 * NPM: "eslint-plugin-tailwindcss": "npm:@hyoban/eslint-plugin-tailwindcss@4.0.0-alpha.12",
 * https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/325
 *
 * Recursively walks `dir`, looking for the first .css file
 * that has a line starting with @import "tailwindcss
 * @param {string} dir  absolute path to start searching from
 * @returns {string|null}  absolute path to matching CSS, or null if none found
 *
 * @example
 * const twCssPath = findTailwindImportCss(process.cwd())
 */
function findTailwindImportCss(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      const found = findTailwindImportCss(fullPath)
      if (found) return found
    } else if (entry.isFile() && entry.name.endsWith(".css")) {
      // read & scan lines
      const lines = fs.readFileSync(fullPath, "utf8").split(/\r?\n/)
      for (let line of lines) {
        if (line.trim().startsWith('@import "tailwindcss')) {
          return fullPath
        }
      }
    }
  }

  return null
}
