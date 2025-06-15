import {prisma} from "./client";

import type { Scan, Result } from "../generated/client";
const SEED_SCAN: Scan = {
  id: "cmbxcvkzz000m07jo1ynwfrc0", // cuid
  repository: "https://github.com/example/repo",
  commitSha: "abcdef1234567890",
  commitMessage: "Initial commit",
  commitDate: new Date(),
  createdAt: new Date()
}

const SEED_RESULTS = [
  {
    packageName: '@repo/cli',
    status: 'SUCCESS',
    numTrace: 1247,
    numType: 4778,
    numHotSpot: 0,
    durationMs: 1533.330333,
    durationMsHotSpot: 0,
    createdAt: new Date(),
    scanId: SEED_SCAN.id
  },
  {
    packageName: '@repo/db',
    status: 'SUCCESS',
    numTrace: 711,
    numType: 3898,
    numHotSpot: 0,
    durationMs: 2550.592959,
    durationMsHotSpot: 0,
    createdAt: new Date(),
    scanId: SEED_SCAN.id
  }
] satisfies Omit<Result, "id">[];

(async () => {
  try {
    await prisma.scan.upsert({
      where: {
        id: SEED_SCAN.id
      },
      create: SEED_SCAN,
      update: SEED_SCAN
    })

    await Promise.all(
      SEED_RESULTS.map((result) =>
        prisma.result.upsert({
          where: {
            scanId_packageName: {
              scanId: SEED_SCAN.id,
              packageName: result.packageName
            }
          },
          create: result,
          update: result,
        }),
      ),
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();

