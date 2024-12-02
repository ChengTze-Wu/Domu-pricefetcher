# PriceFetcher

查詢內政部房價實價登錄資料的 API APP。由於內政部的查詢 URL 被加密，本專案提供了橋接後的 API 供查詢。提供了兩個主要的 API Endpoint，用於生成查詢 URL 和取得實價登錄資料。

## Local 啟用

1. git clone 本專案

   ```bash
   git clone git@github.com:ChengTze-Wu/Domu-pricefetcher.git
   ```

2. 安裝 node.js 18.0 以上版本

   cf. https://nodejs.org/en/download/package-manager

3. 安裝 dependencies

   ```bash
   cd Domu-pricefetcher && npm install
   ```

4. 執行 `npm run start` 啟動 server

## Docker 啟用

1. Build docker image

   ```bash
   cd Domu-pricefetcher && docker build -t domu-pricefetcher .
   ```

2. Run docker container

   ```bash
   docker run -d -p 127.0.0.1:3500:3500 domu-pricefetcher
   ```

## API

### GET /priceUrl

#### Query Parameters

- `city`: 縣市名稱，例如 "台北市"
- `town`: 鄉鎮市區名稱，例如 "中正區"
- `start`: 開始日期，格式為民國年 "YYY,M"，例如 "110,1"
- `end`: 结束日期，格式為 "YYY,M"，例如 "110,12"

  ```http
  GET /priceUrl?city=台北市&town=中正區&start=110,1&end=110,12
  ```

### GET /priceData

#### Query Parameters

- `city`: 縣市名稱，例如 "台北市"
- `town`: 鄉鎮市區名稱，例如 "中正區"
- `start`: 開始日期，格式為民國年 "YYY,M"，例如 "110,1"
- `end`: 结束日期，格式為 "YYY,M"，例如 "110,12"

  ```http
  GET /priceData?city=台北市&town=中正區&start=110,1&end=110,12
  ```
