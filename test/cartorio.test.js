const assert = require("assert");
const ganache = require("ganache");
const { Web3 } = require("web3");
const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require("../compile");

let cartorio;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  cartorio = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("cartorio Contract", () => {
  it("deploys a contract", () => {
    assert.ok(cartorio.options.address);
  });

  it('Deploy do contrato como vendedor', async () => {
    await cartorio.methods.constructor({
      from: accounts[0],
    });

    const vendedor = await cartorio.methods.getVendedor().call({
      from: accounts[0]
    });

    await cartorio.methods.comprador(accounts[1]).send({
      from: accounts[1]
    }); 
    const set = 1;
    await cartorio.methods.setValor(1).send({
      from: accounts[0]
    });

    let valor = await cartorio.methods.getValor().call({
      from: accounts[0],
    });

    console.log(valor);
    await cartorio.methods.concluiCompra().call({
      from:accounts[1],
      value: web3.utils.toWei("1","ether")
    });
    
    assert.equal(vendedor,accounts[0]);
    assert.equal(valor,web3.utils.toWei("1","ether"));
  });

});
