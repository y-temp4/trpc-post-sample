import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
  addPost: publicProcedure
    .input(z.object({ title: z.string(), content: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.post.create({
        data: { title: input.title, content: input.content },
      });
    }),
});
