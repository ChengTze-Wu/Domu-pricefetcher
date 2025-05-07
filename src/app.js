import express from "express";
import compression from "compression";
import moment from "moment/moment.js";

import { BadRequestError } from "./error.js";
import { validateQueryParams, errorHandler } from "./middleware.js";
import { generateSearchUrl } from "./lib/searchUrlGenerator.js";
import { cityMapping, townAMapping, defaultDataObj } from "./data.js";
import { fetchPriceData } from "./dataFetcher.js";
import { parseYearMonthToRocFormat } from "./utils.js";

const app = express();
const PORT = process.env.PORT || 3500;
const HOST = process.env.HOST || "localhost";

app.use(express.json());
app.use(compression());

function getCityCode(city) {
  const cityCode = cityMapping[city];
  if (!cityCode) {
    throw new BadRequestError(`Invalid city query parameter: ${city}`);
  }
  return cityCode;
}

function getTownCode(town) {
  const townCode = townAMapping[town];
  if (!townCode) {
    throw new BadRequestError(`Invalid town query parameter: ${town}`);
  }
  return townCode;
}

function createDataObject(cityCode, townCode, start, end) {
  const { year: starty, month: startm } = parseYearMonthToRocFormat(start);
  const { year: endy, month: endm } = parseYearMonthToRocFormat(end);
  return {
    ...defaultDataObj,
    city: cityCode,
    town: townCode,
    starty,
    startm,
    endy,
    endm,
  };
}

app.get("/priceUrl", validateQueryParams, async (req, res, next) => {
  try {
    const cityCode = getCityCode(req.query.city);
    const townCode = getTownCode(req.query.town);
    const dataObj = createDataObject(
      cityCode,
      townCode,
      req.query.start,
      req.query.end
    );
    const url = generateSearchUrl(dataObj);
    res.json({ url: url });
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
});

app.get("/priceData", validateQueryParams, async (req, res, next) => {
  try {
    const cityCode = getCityCode(req.query.city);
    const townCode = getTownCode(req.query.town);
    const dataObj = createDataObject(
      cityCode,
      townCode,
      req.query.start,
      req.query.end
    );
    const url = generateSearchUrl(dataObj);
    const data = await fetchPriceData(url);
    res.json(data);
  } catch (error) {
    next(error); // Pass error to the errorHandler middleware
  }
});

app.use(errorHandler);

app.listen(
  {
    port: PORT,
    host: HOST,
  },
  () => {
    const isoDatetime = moment().format();
    console.info(
      `[${isoDatetime} INFO] PriceFetcher running on http://${HOST}:${PORT} (Press CTRL+C to quit)`
    );
  }
);
