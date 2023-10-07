const path = require("path");
const fs = require("fs");
const solc = require("solc");

const cartorioPath = path.resolve(__dirname, "contracts", "cartorio.sol");
const source = fs.readFileSync(cartorioPath, "utf8");

const input = {
    language: 'Solidity',
    sources: {
      'cartorio.sol': {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  };
//console.log(solc.compile(source,1));
module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
    'cartorio.sol'
  ].cartorio;
