import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();
import bcrypt from "bcrypt";
import { z } from "zod";
router.post('/signup', (req,res)=>{
    res.send("signup");
})

router.post('/sigin', (req,res)=>{
    res.send("signin");
})

export default router;