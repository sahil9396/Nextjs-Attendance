import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prismaClientSingleton = () => {
  const prisma = new PrismaClient({
    datasourceUrl: process.env.ACCELERATE_DATABASE_URL,
  }).$extends(withAccelerate());
  return prisma;
  // return new PrismaClient()
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const db = globalThis.prismaGlobal ?? prismaClientSingleton();

export default db;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = db;
