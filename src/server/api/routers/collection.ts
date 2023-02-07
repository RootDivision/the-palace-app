import { createTRPCRouter, publicProcedure } from "../trpc";

interface Collection {
  releases: Release[];
}

// this type is to be adjusted
interface Release {
  id: number;
  rating: number;
}

export const collectionRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    try {
      const response = await fetch("http://localhost:8080/releases");
      return (await response.json()) as Collection;
    } catch (err) {
      console.log(err);
    }
  }),
});
