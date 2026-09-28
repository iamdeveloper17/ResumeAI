import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAILog extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  type: "summary" | "enhance" | "skills" | "cover-letter";
  prompt: string;
  response: string;
  tokensUsed: number;
  createdAt: Date;
}

const AILogSchema = new Schema<IAILog>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["summary", "enhance", "skills", "cover-letter"],
      required: true,
    },
    prompt: { type: String, required: true },
    response: { type: String, required: true },
    tokensUsed: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const AILog: Model<IAILog> =
  mongoose.models.AILog || mongoose.model<IAILog>("AILog", AILogSchema);

export default AILog;