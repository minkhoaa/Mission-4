import mongoose, { Document, Schema } from "mongoose";
export type AccountStatus = "ACTIVATE" | "DEACTIVATE";

export interface IAccount extends Document {
  user: mongoose.Types.ObjectId;
  username: string;
  hashedPassword: string;
  accessToken: string;
  refreshToken: string;
  status: AccountStatus;
  createAt: Date;
  updateAt: Date;
}

const AccountSchema = new Schema<IAccount>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
    username: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    accessToken: { type: String, default: "" },
    refreshToken: { type: String, default: "" },
    status: {
      type: String,
      enum: ["ACTIVATE", "DEACTIVATE"],
      default: "ACTIVATE",
    },
  },
  { timestamps: true }
);
export const Account = mongoose.model<IAccount>("account", AccountSchema);
