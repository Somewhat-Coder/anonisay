import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Message must contain at least 10 characters" })
    .max(300, { message: "Message must contain less than 300 characters" }),
});
