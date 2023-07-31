import { generateAll } from "./generateAll";

generateAll().catch((err) => {
  throw new Error(`generateAll failed: ${err}`);
});
