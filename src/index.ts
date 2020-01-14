import { RequestHandler } from "express";

let _unknown = new Error('unknown error caught by express-catch-handler')

/**
 * Set the default value to be passed to next() in the event the caught value
 * is undefined.
 * 
 * @param err 
 */
export function setDefault(err: Error) {
    _unknown = err
}

/**
 * wraps your RequestHandler with a try-catch block. if an error is caught,
 * it's passed to next().
 * 
 * @param handler {RequestHandler} 
 */
export default function withCatch(handler: RequestHandler): RequestHandler {
    return async (req, res, next) => {
        try {
            await handler(req, res, next)
            next()
        } catch (err) {
            if (err === undefined) {
                next(_unknown)
            } else {
                next(err)
            }
        }
    }
}