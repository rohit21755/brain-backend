import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
interface User {
    id: string;
}
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({
            message: "No token provided"
        });
    }
    try {
        const decoded = jwt.verify(token as string, "secret");
        if(decoded) {
            if(typeof decoded == 'string') {
                return res.status(401).send({
                    message: "Invalid token"
                });
            }
            // @ts-ignore
            req.userId  = (decoded as JwtPayload).id;
            next();
        }
     
       
    } catch (err) {
        res.status(401).send({
            message: "Invalid token"
        });
    }
}