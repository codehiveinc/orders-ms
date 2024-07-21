import { Request, Response, NextFunction } from "express";
import { isArray, isObject, mapKeys, mapValues, snakeCase } from "lodash";

const convertToSnakeCase = (input: any): any => {
  if (isArray(input)) {
    return input.map(convertToSnakeCase);
  } else if (isObject(input)) {
    if (input instanceof Date) {
      return input.toISOString();
    }
    const snakeCasedObject = mapKeys(input, (_value, key) => snakeCase(key));
    return mapValues(snakeCasedObject, convertToSnakeCase);
  } else {
    return input;
  }
};

const snakeCaseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const originalSend = res.json.bind(res);

  res.json = (body: any) => {
    if (body && typeof body === "object") {
      body = convertToSnakeCase(body);
    }
    return originalSend(body);
  };

  next();
};

export default snakeCaseMiddleware;