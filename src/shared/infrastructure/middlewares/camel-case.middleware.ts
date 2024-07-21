import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';

const convertToCamelCase = (obj: any): any => {
    if (_.isArray(obj)) {
        return obj.map(value => convertToCamelCase(value));
    } else if (_.isPlainObject(obj)) {
        const camelCasedObject = _.mapKeys(obj, (value, key) => _.camelCase(key));
        return _.mapValues(camelCasedObject, value => convertToCamelCase(value));
    }
    return obj;
};

const camelCaseMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.body && typeof req.body === 'object') {
        req.body = convertToCamelCase(req.body);
    }
    next();
};

export default camelCaseMiddleware;
