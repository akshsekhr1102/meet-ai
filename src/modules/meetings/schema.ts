import { z } from "zod";

export const meetingInsertSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    agentId: z.string().min(1, { message: "Agent is required" }),
})

export const meetingUpdateSchema = meetingInsertSchema.extend({
    id: z.string().min(1, { message: "Id is required" }),
})

// 8.19.26