import moment from "moment";
import { BadRequestError } from "./error.js";

export function validateQueryParams(req, res, next) {
  const { city, town, start, end } = req.query;
  if (!city || !town || !start || !end) {
    return next(
      new BadRequestError(
        "Missing required query parameters: city, town, start, end"
      )
    );
  }
  next();
}

export function errorHandler(err, req, res, next) {
  if (err instanceof BadRequestError) {
    res.status(400).json({ error: err.message });
  } else {
    const isoDatetime = moment().format();
    console.error(`[${isoDatetime} ERROR]`, err.stack);
    res.status(500).json({ error: "Internal server error" });
  }
}
