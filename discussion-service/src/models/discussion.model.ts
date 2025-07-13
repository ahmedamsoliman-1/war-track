import mongoose, { Schema, Document } from "mongoose";

export interface IComment {
  authorId: string;
  content: string;
  createdAt: Date;
}

export interface IDiscussion extends Document {
  warId: string;
  title: string;
  comments: IComment[];
}

const CommentSchema = new Schema<IComment>({
  authorId: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const DiscussionSchema = new Schema<IDiscussion>({
  warId: { type: String, required: true },
  title: { type: String, required: true },
  comments: [CommentSchema]
});

export default mongoose.model<IDiscussion>("Discussion", DiscussionSchema);
