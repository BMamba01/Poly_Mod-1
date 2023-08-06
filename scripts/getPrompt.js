const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/VALNFT.sol/VALNFT.json");

const tokenAddress = "0xA59729d896162e951eD2b91Ee7061420685C5026"; 
const tokenABI = tokenContractJSON.abi;
const walletAddress = "0xe5A1359167d585Fea1a88AE6178a9e9c29B3d6dc"; 

async function main() {

    const myContract = await hre.ethers.getContractAt(tokenABI, tokenAddress);
    const count = await myContract.balanceOf(walletAddress); // It will return number of NFTs in wallet

    for (let i = 0; i < count; i++) {
        const nftID = await myContract.tokenOfOwnerByIndex(walletAddress, i);
        const prompt = await myContract.promptDescription(nftID);
        console.log(`NFT with nftID ${nftID.toString()} has prompt: ${prompt}`);
      }

  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

