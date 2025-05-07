import { parseYearMonthToRocFormat } from "../src/utils.js";

test("parseYearMonthToRocFormat - valid date", () => {
  const result = parseYearMonthToRocFormat("202310");
  expect(result).toEqual({ year: 112, month: 10 });
});

test("parseYearMonthToRocFormat - invalid date", () => {
  expect(() => {
    parseYearMonthToRocFormat("202313");
  }).toThrow("Invalid date format");
});

test("parseYearMonthToRocFormat - invalid year", () => {
  expect(() => {
    parseYearMonthToRocFormat("191001");
  }).toThrow("Invalid year");
});
