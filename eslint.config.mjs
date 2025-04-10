/**
 * ESLint Configuration File
 *
 * This file configures ESLint for the project to ensure consistent code quality:
 * - Extends the Next.js ESLint configuration which includes best practices for Next.js apps
 * - Includes rules for React and JavaScript/TypeScript linting
 * - Helps catch common mistakes and maintain code style consistency
 */

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends("next/core-web-vitals")];

export default eslintConfig;
