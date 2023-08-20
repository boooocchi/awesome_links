// graphql/context.ts
import { PrismaClient } from "@prisma/client";
import prisma from "../lib/prisma";
import { Claims, getSession } from "@auth0/nextjs-auth0";
import { IncomingMessage, ServerResponse } from "http"; // Import the necessary types

export type Context = {
  user?: Claims;
  accessToken?: string;
  prisma: PrismaClient;
};

export async function createContext({
  req,
  res
}: {
  req: IncomingMessage;
  res: ServerResponse;
}): Promise<Context> {
  const session = await getSession(req, res);

  if (!session) return { prisma };

  const { user, accessToken } = session;
  console.log(session);
  console.log(user);

  return {
    user,
    accessToken,
    prisma
  };
}
