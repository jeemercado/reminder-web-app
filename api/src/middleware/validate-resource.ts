import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { HTTP_CODE } from '../utils/http-codes';

const validateResource =
  (schema: AnyZodObject) => (request: Request, response: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: request.body,
        query: request.query,
        params: request.params,
      });
      return next();
    } catch (error: any) {
      return response.status(HTTP_CODE.BAD_REQUEST).send(error.errors);
    }
  };

export default validateResource;
