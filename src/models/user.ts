import { Document, Schema } from "mongoose";
import mongoose from "mongoose";

export type Gender = "M" | "F";

export interface IUser extends Document {
  name: string;
  gender: Gender;
  dob: Date;
  createdAt: Date;
  updatedAt: Date;
}
const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    gender: { type: String, enum: ["M", "F"], required: true },
    dob: { type: Date, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.virtual("todoLists", {
  ref: "todolist",
  localField: "_id",
  foreignField: "user",
});
export const User = mongoose.model<IUser>("user", UserSchema);
