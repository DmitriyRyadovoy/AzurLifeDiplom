import mongoose from "mongoose";

const catalogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.ObjectId,
    ref: 'Category',
    required: true
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  viewsCount: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.ObjectId,
    ref: 'Users',
    required: true
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }
}, { timestamps: true }
)

export default mongoose.model("Catalog", catalogSchema);