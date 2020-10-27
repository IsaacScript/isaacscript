import pkg from "../package.json";

export default function parseArgs(argv: Record<string, unknown>): void {
  Object.keys(argv).forEach((key) => {
    switch (key) {
      case "_":
      case "$0": {
        break;
      }

      case "version": {
        console.log(pkg.version);
        process.exit(0);
        break;
      }

      default: {
        console.error(`Error: The flag of "${key}" is invalid.`);
        process.exit(1);
      }
    }
  });
}
