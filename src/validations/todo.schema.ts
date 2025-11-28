import z from "zod";
import todolistRouter from "../routes/todolist.router";
export const todoItemStatusSchema = z
  .enum(["TODO", "IN_PROCESS", "FINISH"])
  .optional();
export const todoListStatusSchema = z.enum(["UNFINISHED", "FINISH"]).optional();

export const createTodoListSchema = z.object({
  body: z.object({
    name: z.string().min(1, "name is required"),
    status: todoListStatusSchema.optional(),
  }),
});

export const updateTodoListSchema = z.object({
  params: z.object({
    id: z.string().min(1, "id is required"),
  }),
  body: z.object({
    name: z.string().min(1, "name is required").optional(),
    status: todoListStatusSchema.optional(),
  }),
});

export const createToDoItemSchema = z.object({
  body: z.object({
    todoList: z.string().min(1, "To do list is required"),
    name: z.string().min(1, "Name is required"),
    des: z.string().optional(),
    dueAt: z.coerce.date(),
    status: todoItemStatusSchema,
  }),
});
export const updateTodoItemSchema = z.object({
  params: z.object({
    id: z.string().min(1, "id is required"),
  }),
  body: z.object({
    todoList: z.string().min(1).optional(),
    name: z.string().min(1).optional(),
    des: z.string().optional(),
    dueAt: z.coerce.date().optional(),
    status: todoItemStatusSchema.optional(),
  }),
});

export type createToDoItemBody = z.infer<typeof createToDoItemSchema>["body"];
export type updateToDoItemBody = z.infer<typeof updateTodoItemSchema>["body"];

export type CreateTodoListBody = z.infer<typeof createTodoListSchema>["body"];
export type UpdateTodoListBody = z.infer<typeof updateTodoListSchema>["body"];
