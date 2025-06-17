import { db } from "@/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentInsertSchema } from "../schemas";
import { z } from "zod";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constants";
import { agents } from "@/db/schema";


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
    getMany: protectedProcedure.
    input(z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish().default("")
    }))
    .query(async ({ctx, input}) => {
        const {search, page, pageSize} = input;
        const data = await db
            .select({
                 ...getTableColumns(agents),
            meetingCount: sql<number>`5`
            })
            .from(agents)
            .where(
                and(
                    eq(agents.userId, ctx.auth.user.id),
                    search ? ilike(agents.name, `%${search}%`) : undefined
                )
            )
            .orderBy(desc(agents.createdAt), desc(agents.id))
            .limit(pageSize)
            .offset((page - 1) * pageSize)


            const [total] = await db
            .select({count: count()})
            .from(agents)
            .where(
                and(
                    eq(agents.userId, ctx.auth.user.id),
                    search ? ilike(agents.name, `%${search}%`) : undefined
                )
            )
            const totalPage = Math.ceil(total.count / pageSize)

        return {
            items: data,
            total: total.count,
            totalPages: totalPage
        }
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


