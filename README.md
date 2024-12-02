# PriceFetcher

本專案針對內政部房價實價登錄資料提供 API 橋接功能，解決官方查詢 URL 加密的問題。專案中設計了兩個主要的 API Endpoint，分別用於生成查詢 URL 與獲取實價登錄數據，便於開發者整合使用。

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
