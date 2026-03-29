const { readFileSync, writeFileSync } = require("fs");
const { resolve } = require("path");

const filePath = resolve(__dirname, "..", "README.md");
const raw = readFileSync(filePath, "utf-8");
const cacheKey = Date.now().toString();

const updated = raw.replace(
  /github-contribution-grid-snake(?:-dark)?\.svg(?:\?cache=\d+)?/g,
  (match) => `${match.split("?cache=")[0]}?cache=${cacheKey}`,
);

if (updated === raw) {
  throw new Error("README.md does not contain the expected URLs");
}

writeFileSync(filePath, updated, "utf-8");
console.log(`README.md cache key bumped to ${cacheKey}`);
