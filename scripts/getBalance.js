// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/VALNFT.sol/VALNFT.json");

const tokenAddress = "0xC36D68593d53e8EDFD5f9aa04Fc76124B17235CB"; 
const tokenABI = tokenContractJSON.abi;
const walletAddress = "0xe5A1359167d585Fea1a88AE6178a9e9c29B3d6dc"; // place your public address for your wallet here

async function main() {

  const myContract = await hre.ethers.getContractAt(tokenABI, tokenAddress);
  const count = await myContract.balanceOf(walletAddress); // It will return number of NFTs in wallet

  console.log("You now have: " + count.toString() + " NFTs in your Wallet!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});