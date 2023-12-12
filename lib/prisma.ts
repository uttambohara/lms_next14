import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: null | PrismaClient;
}

export const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
