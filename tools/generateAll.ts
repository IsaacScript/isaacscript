import { execSync } from "child_process";
import packageJSON from "../package.json";

export function generateAll(): void {
  const scripts = Object.keys(packageJSON.scripts);
  const generateScripts = scripts.filter((script) =>
    script.startsWith("generate:"),
  );
  generateScripts.forEach((script) => {
    const command = `npm run ${script}`;
    console.log(`Running: ${command}`);
    execSync(command);
  });
}
