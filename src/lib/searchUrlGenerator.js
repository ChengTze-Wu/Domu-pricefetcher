import { JSDOM } from "jsdom";
import path from "path";
import fs from "fs";
import vm from "vm";

const { window } = new JSDOM("<!doctype html><html><body></body></html>");
global.window = window;
global.document = window.document;

Object.defineProperty(global, "navigator", {
  value: {
    userAgent: "node.js",
  },
  configurable: true,
});

function loadScript(scriptPath) {
  const scriptContent = fs.readFileSync(scriptPath, "utf8");
  vm.runInThisContext(scriptContent);
}

const currentDir = path.dirname(new URL(import.meta.url).pathname);
const vendorPath = path.resolve(currentDir, "vendor.bundle.js");
const commonPath = path.resolve(currentDir, "common.bundle.min.js");
loadScript(vendorPath);
loadScript(commonPath);

if (typeof window.common === "undefined") {
  throw new Error("common is not defined");
}

const common = window.common;

export function generateSearchUrl(dataObj) {
  if (typeof common.getSearchUrl !== "function") {
    throw new Error("common.getSearchUrl is not a function");
  }
  return common.getSearchUrl(dataObj);
}
