import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload} from "jsonwebtoken";

const secret = "secret";
export const authMiddleware = (req: Request, res: Response, next: NextFunction)=> {
    const header = req.headers.authorization;
    const decoded = jwt.verify(header as string, secret);
    if(decoded) {
        if(typeof decoded === "string") {
            res.status(401).json({message: "You  are not authorized to access this route"});
            return;
        }
        req.userId = (decoded as JwtPayload).id;
        next();
    } else {
        res.status(401).json({message: "You  are not authorized to access this route"});
    }
}