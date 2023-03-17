import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";

function validationMiddleware(schema: Joi.Schema): RequestHandler {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const validationOptions = {
            abortEarly: false, //aborts as soon as first validation fails
            allowUnknown: true, //strop crash if unknown
            stripUnknow: true, //remove unknown
        }
        try {
            const value = await schema.validateAsync(
                req.body,
                validationOptions,
            );
            req.body = value;
            next();
        } catch (e: any) {
            const errors: String[] = [];
            e.details.forEach((error: Joi.ValidationErrorItem) => {
                errors.push(error.message);
            });
            res.status(400).send({ errors });
        }
    };
}
export default validationMiddleware;