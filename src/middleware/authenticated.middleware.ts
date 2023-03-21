import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/utils/token";
import UserModel from "@/resources/user/user.model";
import Token from "@/utils/interfaces/token.interface";
import HttpException from "@/utils/exceptions/http.exception";
import jwt from "jsonwebtoken";

async function authenticateMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith('Bearer ')) {
        return next(new HttpException(401, 'Unauthorized'));
    }

    const accessToken = bearer.split('Bearer ')[1]?.trim();
    console.log("TOKEN___", bearer);
    try {
        const payload: Token | jwt.JsonWebTokenError = await verifyToken(accessToken);
        if (payload instanceof jwt.JsonWebTokenError) {
            return next(new HttpException(401, 'Unauthorized'));
        }
        const user = await UserModel.findById(payload.id).exec();
        if (!user) {
            return next(new HttpException(401, 'Unauthorized'));
        }
        req.user = user;
        return next();
    } catch (e) {
        return next(new HttpException(401, 'Unauthorized'));
    }
}

export default authenticateMiddleware;