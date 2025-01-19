import express from "express";
import contentModel from "../models/content";
import { authMiddleware } from "../middlewares/authMiddleware";
const router = express.Router();

router.post('/create', authMiddleware, async (req,res)=> {
    try{
        const { link, title, type, tags } = req.body;
        const userId = req.userId;
        await contentModel.create({ link, title, type, tags, userId });
        res.status(200).send({
            message: "Content created successfully"
        });
    } catch(err){
        console.log(err);
        res.status(500).send({
            message: "Error creating content"
        });
    }
})