import z from "zod";

export const createTestInputSchema = z.object({
  body: z.object({
    title: z.string()
  })
})

export type CreateTestInputType = z.infer<typeof createTestInputSchema>['body'];
