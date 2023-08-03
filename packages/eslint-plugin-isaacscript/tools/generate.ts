import { generateAll } from "./generateAll";

generateAll().catch((error) => {
  throw new Error(`generateAll failed: ${error}`);
});
