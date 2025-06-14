import { Command } from "commander";

import * as process from "node:process";
import { makeAnalyzeCommand } from "./commands";

const program = new Command();
program.addCommand(makeAnalyzeCommand());

try {
  await program.parseAsync();
  process.exit();
} catch (error) {
  console.error(error);
  process.exit(1);
}
