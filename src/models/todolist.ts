import mongoose, { Document, Schema } from "mongoose";
import { string } from "zod";

export type TodoListStatus = "UNFINISHED" | "FINISH";

export interface IToDoList extends Document {
  name: string;
  user: mongoose.Types.ObjectId;
  status: TodoListStatus;
  createAt: Date;
  updateAt: Date;
}

const ToDoListSchema = new Schema<IToDoList>(
  {
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    status: {
      type: String,
      enum: ["UNFINISHED", "FINISH"],
      default: "UNFINISHED",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ToDoListSchema.virtual("items", {
  ref: "todoitem",
  localField: "_id",
  foreignField: "todoList",
});

export const ToDoList = mongoose.model<IToDoList>("todolist", ToDoListSchema);
