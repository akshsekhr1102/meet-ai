import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentInsertSchema } from "../schemas";
import { z } from "zod";
import { eq, getTableColumns, sql } from "drizzle-orm";


export const agentsRouter = createTRPCRouter({
    // TODO: Change `getOne` to `protectedProcedure`
    getOne: protectedProcedure.input(z.object({id: z.string()})).query(async ({input}) => {
        const [existingAgent] = await db
        .select({
            // TODO: Get meeting count
            ...getTableColumns(agents),
            meetingCount: sql<number>`5`
        })
        .from(agents)
        .where(eq(agents.id, input.id))

        return existingAgent
    }
),

// TODO: Change `getMany` to `protectedProcedure`
    getMany: protectedProcedure.query(async () => {
        const data = await db
            .select()
            .from(agents)
        return data
    }
    ),
    create: protectedProcedure.input(agentInsertSchema).mutation(async ({ctx, input}) => {
        
        const [createdAgent] = await db
            .insert(agents)
            .values({
                ...input,
                userId: ctx.auth.user.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .returning()
        return createdAgent
    })
})


