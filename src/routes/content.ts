import express from "express";
import contentModel from "../models/content";
import { authMiddleware } from "../middlewares/authMiddleware";
import linkModel from "../models/link"
import { randomhash } from "../utils";
import userModel from "../models/user";
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
router.post('/share', authMiddleware, async (req,res)=>{
   try{
    const share = req.body.share;
    const userId = req.userId;
    if(share) {
      const existingLink = await linkModel.findOne({ userId });
      if (existingLink) {
        res.status(200).send({
          message: "Link already exists",
          link: existingLink.hash
        });
        return;
      }
      const hash = randomhash(10);
      const newLink = await linkModel.create({
        userId,
        hash
      })
      res.status(200).send({
        message: "Link shared successfully",
        link: newLink.hash
      });
    }
    else{
      await linkModel.deleteOne({ userId });
      res.status(200).send({
        message: "Link deleted successfully"
      });
    }
 
    
   }
   catch(error) {
       console.log(error);
       res.status(500).send({
           message: "Error sharing content"
       });
   }
})

router.get('/getlink/:shareLink', async (req,res)=>{
 const hash = req.params.shareLink;

 try{
  const link = await linkModel.findOne({ hash});
  if(!link) {
    res.status(404).send({ message: "Link not found" });
    return
  }
  console.log(link.userId)
  const content = await contentModel.findOne({ userId:link.userId });
  console.log(content)
  const user = await userModel.findOne({ _id: link.userId });
  if(!user) {
    res.status(404).send({ message: "User not found" });
    return;
  }
  res.json({ content, user });
 }
 catch(error) {
     console.log(error);
     res.status(500).send({
         message: "Error fetching link"     });}
 }
)
export default router;