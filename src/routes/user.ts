import express from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/user";
const router = express.Router();
import bcrypt from "bcrypt";
import { z } from "zod";
router.post('/signup', async(req,res)=>{
    try{
    const { username, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    await userModel.create({ username, password: hashedPassword });
    res.status(200).send({
        message: "User created successfully"
    });
}catch(err){
    console.log(err);
    res.status(500).send({
        message: "Error creating user"
    });
}
})

router.post('/signin', async (req,res)=>{
    try{
        const { username, password } = req.body;
        const user = await userModel.findOne({ username });
        if(!user){
            res.status(404).send({
                message: "User not found"
            });
        } else {
            const isPasswordCorrect = bcrypt.compareSync(password, user.password);
            if(isPasswordCorrect){
                const token = jwt.sign({ id: user._id }, "secret");
                res.status(200).send({
                    message: "User signed in successfully",
                    token
                });
            }
            else {
                res.status(401).send({
                    message: "Invalid password"
                });
            }
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            message: "Error signing in user"
        });
    }
})


export default router;