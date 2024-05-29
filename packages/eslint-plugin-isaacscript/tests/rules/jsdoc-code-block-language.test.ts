import { jsdocCodeBlockLanguage } from "../../src/rules/jsdoc-code-block-language.js";
import { ruleTester } from "../utils.js";

ruleTester.run("jsdoc-code-block-language", jsdocCodeBlockLanguage, {
  valid: [
    {
      code: `
/**
 * Use \`foo\` like this:
 *
 * \`\`\`ts
 * foo();
 * \`\`\`
 */
      `,
    },
    {
      code: `
/**
 * The "socket.lua" module exists at:
 *
 * \`\`\`text
 * C:\\Program Files (x86)\\
 * \`\`\`
 *
 * It is intended to be consumed by mods via:
 *
 * \`\`\`lua
 * local socket = require("socket")
 * \`\`\`
 *
 * In order to import socket, the "--luadebug" launch flag must be enabled.
 *
 * The documentation is located at:
 * https://web.tecgraf.puc-rio.br/luasocket/old/luasocket-2.0-beta/tcp.html
 */
      `,
    },
  ],

  invalid: [
    {
      code: `
/**
 * Use \`foo\` like this:
 *
 * \`\`\`
 * foo();
 * \`\`\`
 */
      `,
      errors: [{ messageId: "noLanguage" }],
    },
  ],
});
