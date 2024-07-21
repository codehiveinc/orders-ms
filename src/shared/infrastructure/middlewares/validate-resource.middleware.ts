import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import createBaseResponse from "../utils/createBaseResponse";

const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.reduce((acc, issue) => {
          acc[issue.path.slice(1).join(".")] = issue.message;
          return acc;
        }, {} as Record<string, string>);

        const response = createBaseResponse(
          errors,
          "Validation error",
          false,
          400
        );
        return res.status(400).json(response);
      }
      const response = createBaseResponse(
        null,
        "Internal server error",
        false,
        500
      );
      return res.status(500).json(response);
    }
  };

export default validateResource;
