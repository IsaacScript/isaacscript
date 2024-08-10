// @ts-check

import tseslint from "typescript-eslint";
import { base } from "../eslint-config-isaacscript/base.js";
import { mod } from "../eslint-config-isaacscript/mod.js";
import { monorepo } from "../eslint-config-isaacscript/monorepo.js";

export default tseslint.config(...base, ...mod, ...monorepo);
