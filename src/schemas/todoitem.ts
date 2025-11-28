import mongoose, { Document, Schema } from "mongoose";

export type TodoItemStatus = "TODO" | "IN_PROCESS" | "FINISH";

export interface IToDoItem extends Document {
  todoList: mongoose.Types.ObjectId;
  name: string;
  des?: string;
  dueAt: Date;
  status: TodoItemStatus;
  createdAt: Date;
  updatedAt: Date;
}
const ToDoItemSchema = new Schema<IToDoItem>(
  {
    todoList: {
      type: Schema.Types.ObjectId,
      ref: "todolist",
      required: true,
    },
    name: { type: String, required: true },
    des: { type: String },
    dueAt: { type: Date },
    status: {
      type: String,
      enum: ["TODO", "IN_PROCESS", "FINISH"],
      default: "TODO",
    },
  },
  { timestamps: true }
);

export const ToDoItem = mongoose.model<IToDoItem>("todoitem", ToDoItemSchema);
