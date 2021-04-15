const UniswapV2Factory = artifacts.require("UniswapV2Factory");
const UniswapV2ERC20 = artifacts.require("UniswapV2ERC20");

const fs = require('fs')
const contracts = require('../../../../contract_addresses.json')

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(UniswapV2Factory, accounts[0]);
  await deployer.deploy(UniswapV2ERC20);

  const factoryContract = await UniswapV2Factory.deployed()
  const tokenContract = await UniswapV2ERC20.deployed()


  fs.writeFileSync('../../../../contract_addresses.json',JSON.stringify({
    ...contracts,
    factoryAddress: factoryContract.address,
    uniTokenAddress: tokenContract.address
  }), 'utf-8');
};
