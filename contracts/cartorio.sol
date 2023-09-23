// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.4.17;

contract cartorio {
    address public vendedor;
    address public comprador;
    uint public valor;

    constructor() public{
        vendedor = msg.sender;
    }

    function setValor(uint preco) public payable{
        valor = preco*1000000000000000000;
    }

    function comprador(address addressComprador) public payable {
       comprador = addressComprador;
    }

    function concluiCompra() public payable soComprador{
        require(msg.value >= valor );
        vendedor.transfer(this.balance);
    }

    modifier soComprador() {
        require(msg.sender == comprador);
        _;
    }

    modifier soVendedor()
    {
        require(msg.sender == vendedor);
        _;
    } 

    function getVendedor() public view returns (address){
        return vendedor;
    }

    function getValor() public view returns (uint){
        return valor;
    }
}