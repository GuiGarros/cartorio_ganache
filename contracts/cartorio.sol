// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract cartorio {
    address payable public vendedor;
    address public comprador;
    uint public valor;

    constructor() {
        vendedor = payable(msg.sender);
    }

    function setValor(uint preco) public payable{
        valor = preco*1000000000000000000;
    }

    function compradorAddress(address addressComprador) public payable{
       comprador = addressComprador;
    }

    function concluiCompra() public payable soComprador{
        require(msg.value >= valor );
        vendedor.transfer(address(this).balance);
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