// @ts-check

import tseslint from "typescript-eslint";
import { base } from "./base.js";
import { monorepo } from "./monorepo.js";

export default tseslint.config(...base, ...monorepo);
