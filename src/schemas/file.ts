import { timeStamp } from "console";
import mongoose, { Document, Schema } from "mongoose";
import { string } from "zod";

export interface IFile extends Document {
  path: string;
  type: string;
}
const FileSchema = new Schema<IFile>(
  {
    path: { type: String, required: true },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const FileModel = mongoose.model<IFile>("files", FileSchema);
