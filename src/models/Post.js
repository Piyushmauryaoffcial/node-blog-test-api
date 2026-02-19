
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tags: [{ type: String }],
  views: { type: Number, default: 0 },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  image: { type: String }
}, { timestamps: true });

postSchema.index({ title: "text", content: "text" });

export default mongoose.model("Post", postSchema);
