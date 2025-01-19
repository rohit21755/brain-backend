import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
})

export default mongoose.model('Tag', tagSchema);