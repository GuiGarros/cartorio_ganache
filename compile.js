const path = require("path");
const fs = require("fs");
const solc = require("solc");

const cartorioPath = path.resolve(__dirname, "contracts", "cartorio.sol");
const source = fs.readFileSync(cartorioPath, "utf8");

module.exports = solc.compile(source, 1).contracts[":cartorio"];
