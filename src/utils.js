import moment from "moment/moment.js";

import { BadRequestError } from "./error.js";

export function parseYearMonthToRocFormat(yearMonthStr) {
  const yearMonth = moment(yearMonthStr, "YYYYMM");
  if (!yearMonth.isValid()) {
    throw new BadRequestError("Invalid date format");
  }
  const year = parseInt(yearMonth.format("YYYY"), 10);
  const month = parseInt(yearMonth.format("MM"), 10);
  const rocYear = year - 1911;
  if (rocYear < 0) {
    throw new BadRequestError("Invalid year");
  }
  return { year: rocYear, month };
}
