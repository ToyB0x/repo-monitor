import process from "node:process";
import { prisma } from "@repo/db";
import { Welcome } from "~/welcome/welcome";
import type { Route } from "./+types/home";

// biome-ignore lint/correctness/noEmptyPattern: example code
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader() {
  // NOTE: workaround for Prisma RLS issues in development and CI environments
  // https://github.com/prisma/prisma/issues/27085
  // https://github.com/prisma/prisma/issues/27212
  // biome-ignore lint/complexity/useLiteralKeys: workaround for Prisma RLS issues
  if (!process.env?.["DATABASE_URL"]) return [];

  return prisma.result.findMany({
    distinct: ["package"],
    orderBy: {
      package: "asc",
    },
    select: {
      package: true,
    },
  });
}

export default function Page({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      {loaderData.map(({ package: pkg }) => (
        <a key={pkg} href={`/packages/${pkg}`}>
          {pkg}
        </a>
      ))}
      <Welcome />
    </div>
  );
}
