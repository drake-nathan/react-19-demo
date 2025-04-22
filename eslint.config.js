// @ts-check
import { eslintConfig } from "js-style-kit";

export default eslintConfig({
  react: {
    framework: "next",
  },
  rules: {
    "perfectionist/sort-imports": [
      "warn",
      {
        internalPattern: ["^@/.+"],
      },
    ],
  },
  typescript: "tsconfig.eslint.json",
});
