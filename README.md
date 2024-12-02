# PriceFetcher

**PriceFetcher** 是一個針對內政部房價實價登錄資料設計的 API，旨在解決官方查詢 URL 加密的問題。此專案提供兩個主要 API Endpoint，方便開發者整合使用：

1. **[URL 生成 (GET /priceUrl)](#1-get-priceurl)**：產生查詢用的加密 URL。
2. **[數據獲取 (GET /priceData)](#2-get-pricedata)**：直接取得實價登錄的查詢結果。

---

## 啟動方式

### 1. 本地環境啟動

1. **下載專案**
   ```bash
   git clone git@github.com:ChengTze-Wu/Domu-pricefetcher.git
   ```

2. **安裝 Node.js (18.0 以上版本)**  
   詳情請參考 [Node.js 官方文件](https://nodejs.org/en/download/package-manager)。

3. **安裝相依套件**
   ```bash
   cd Domu-pricefetcher && npm install
   ```

4. **啟動 Server**
   ```bash
   npm run start
   ```

---

### 2. Docker 環境啟動

1. **建置 Docker 映像檔**
   ```bash
   cd Domu-pricefetcher && docker build -t domu-pricefetcher .
   ```

2. **啟動 Docker 容器**
   ```bash
   docker run -d -p 127.0.0.1:3500:3500 domu-pricefetcher
   ```

---

## API 說明

### **1. GET /priceUrl**

此 API 用於生成內政部實價登錄查詢的加密 URL。

#### **Query Parameters**

| 參數名稱  | 說明          | 範例        |
| --------- | ------------- | ----------- |
| `city`    | 縣市名稱       | 台北市      |
| `town`    | 鄉鎮市區名稱   | 中正區      |
| `start`   | 開始日期 (民國年) | 110,1       |
| `end`     | 結束日期 (民國年) | 110,12      |

#### **範例請求**
```http
GET /priceUrl?city=台北市&town=中正區&start=110,1&end=110,12
```

---

### **2. GET /priceData**

此 API 用於直接獲取實價登錄查詢結果。

#### **Query Parameters**

| 參數名稱  | 說明          | 範例        |
| --------- | ------------- | ----------- |
| `city`    | 縣市名稱       | 台北市      |
| `town`    | 鄉鎮市區名稱   | 中正區      |
| `start`   | 開始日期 (民國年) | 110,1       |
| `end`     | 結束日期 (民國年) | 110,12      |

#### **範例請求**
```http
GET /priceData?city=台北市&town=中正區&start=110,1&end=110,12
```
