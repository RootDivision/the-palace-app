import { createTRPCRouter } from "./trpc";
import { itemRouter } from "./routers/item";
import { collectionRouter } from "./routers/collection";

export const appRouter = createTRPCRouter({
  item: itemRouter,
  collection: collectionRouter,
});

export type AppRouter = typeof appRouter;
