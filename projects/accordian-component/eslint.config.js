import { defineConfig } from "eslint/config"
import { fileURLToPath } from "node:url"

import workspaceConfig from "../../eslint.config.mjs"

export default defineConfig([
  ...workspaceConfig,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: fileURLToPath(new URL(".", import.meta.url)),
      },
    },
  },
])
