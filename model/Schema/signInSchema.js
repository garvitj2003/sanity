import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Enter valid Email"),
  password: z.string().min(6),
});
