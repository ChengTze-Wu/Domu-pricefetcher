import { FetchPriceDataError } from "./error.js";

export async function fetchPriceData(url) {
  const headers = {
    Accept: "application/json, text/javascript, */*; q=0.01",
    dnt: "1",
    referer: "https://lvr.land.moi.gov.tw/",
    "sec-ch-ua": '"Chromium";v="131", "Not_A Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "Windows",
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "x-requested-with": "XMLHttpRequest",
  };
  const response = await fetch(url, { headers: headers });
  if (!response.status === 200) {
    throw new FetchPriceDataError(
      `Failed to Request: ${response.status} ${response.statusText}`
    );
  }
  const data = await response.json();
  return data;
}
