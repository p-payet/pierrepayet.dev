import { defineConfig } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import tseslint from "typescript-eslint";

export default defineConfig([
    {
        extends: [...nextCoreWebVitals],
        settings: {
            react: {
                // Workaround: eslint-plugin-react@7.37.5 calls the removed
                // context.getFilename() API when version is "detect" (ESLint v10).
                version: "19.2.3",
            },
        },
    },
    {
        // Workaround: Next.js bundles @babel/eslint-parser v7.x whose scope
        // manager lacks addGlobals(), required by ESLint v10.
        files: ["**/*.{js,mjs,cjs,jsx}"],
        languageOptions: {
            parser: tseslint.parser,
        },
    },
]);