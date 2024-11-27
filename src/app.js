import express from "express";
import compression from "compression";
import moment from "moment/moment.js";

import { BadRequestError } from "./error.js";
import { generateSearchUrl } from "./lib/searchUrlGenerator.js";
import { cityMapping, townAMapping, defaultDataObj } from "./data.js";
import { fetchPriceData } from "./dataFetcher.js";

const app = express();
const PORT = process.env.PORT || 3500;
const HOST = process.env.HOST || "localhost";

app.use(express.json());
app.use(compression());

function validateQueryParams(query) {
  const { city, town, start, end } = query;
  if (!city || !town || !start || !end) {
    throw new BadRequestError(
      "Missing required query parameters: city, town, start, end"
    );
  }
}

function getCityCode(city) {
  const cityCode = cityMapping[city];
  if (!cityCode) {
    throw new BadRequestError("Invalid city query parameter");
  }
  return cityCode;
}

function getTownCode(town) {
  const townCode = townAMapping[town];
  if (!townCode) {
    throw new BadRequestError("Invalid town query parameter");
  }
  return townCode;
}

function parseDate(date) {
  const [year, month] = date.split(",");
  if (!year || !month) {
    throw new BadRequestError("Invalid date format");
  }
  return { year, month };
}

function createDataObject(cityCode, townCode, start, end) {
  const { year: starty, month: startm } = parseDate(start);
  const { year: endy, month: endm } = parseDate(end);
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

app.get("/priceUrl", async (req, res) => {
  try {
    validateQueryParams(req.query);

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
    if (error instanceof BadRequestError) {
      res.status(400).json({ error: error.message });
    } else {
      const isoDatetime = moment().format();
      console.error(`[${isoDatetime} ERROR]`, error.stack);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

app.get("/priceData", async (req, res) => {
  try {
    validateQueryParams(req.query);

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
    if (error instanceof BadRequestError) {
      res.status(400).json({ error: error.message });
    } else {
      const isoDatetime = moment().format();
      console.error(`[${isoDatetime} ERROR]`, error.stack);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

app.listen(
  {
    port: PORT,
    host: HOST,
  },
  () => {
    const isoDatetime = moment().format();
    console.info(
      `[${isoDatetime} INFO] GetPrice running on http://${HOST}:${PORT} (Press CTRL+C to quit)`
    );
  }
);
