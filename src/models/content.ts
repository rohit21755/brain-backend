import mongoose from "mongoose";
const contentTypes = ['image', 'video', 'article', 'audio'];
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const contentSchema = new Schema({
    link: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: contentTypes
    },
    tags: [{ type: ObjectId, ref: 'Tag' }],
  userId: { type: ObjectId, ref: 'User', required: true },
  
})

export default mongoose.model('Content', contentSchema);