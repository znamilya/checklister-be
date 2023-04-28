import z from "zod";

export const checklistIdSchema = z.string().uuid();

export const checklistCreateDTOSchema = z.object({
  title: z.string().min(3).max(30),
  itemsTitles: z.array(z.string().min(3).max(30)).nonempty(),
});

export const checklistUpdateDTOSchema = z.object({
  title: z.string().min(3).max(30),
  itemsTitles: z.array(z.string().min(3).max(30)).nonempty(),
});
