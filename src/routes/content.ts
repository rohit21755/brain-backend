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

router.get('/mycontent', authMiddleware, async (req,res)=>{
  try{
    const userId = req.userId;
    const content = await contentModel.find({ userId}).populate('userId', "username");
    res.status(200).send({
      message: "Content fetched successfully",
      content
    });
  }
  catch(err){
    console.log(err);
    res.status(500).send({
      message: "Error fetching content"
    });
  }
})

router.delete('/delete/:id', authMiddleware, async (req,res)=>{
    try {
        const { id } = req.params;
        const userId = req.userId;
        await contentModel.deleteOne({ _id: id, userId });
        res.status(200).send({
            message: "Content deleted successfully"
        });
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            message: "Error deleting content"
        });
    }
})
export default router;