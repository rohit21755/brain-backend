import mongoose from "mongoose"
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const linkSchema = new Schema({
    hash: {
        type: String,
        required: true,
    },
    userId: { type: ObjectId, ref: 'User', required: true, unique: true },
})

export default mongoose.model('Link', linkSchema);