import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user";
import contentRoutes from "./routes/content";
function connectDB() {
    try {
    mongoose.connect("mongodb+srv://rohitk09022002:P3FqqGFsjCV9L6zN@cluster0.uaa71.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {});
    console.log("Connected to MongoDB");
    } catch (err) {
        console.log(err);
    }
}
const app = express();
app.use(express.json());
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/content', contentRoutes);
app.listen(3000, () => {
    connectDB();
    console.log("Server is running on port 3000");
})

