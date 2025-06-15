import { Command } from "commander";
import { runTscBench } from "./runTscBench";

export const makeAnalyzeCommand = () => {
  const analyze = new Command("analyze");
  analyze.description("analyze related commands.");

  analyze
    .command("tsc", { isDefault: true })
    .description("check tsc performance")
    .action(runTscBench);

  return analyze;
};
