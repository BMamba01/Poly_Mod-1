const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/VALNFT.sol/VALNFT.json");
require('dotenv').config()

const tokenAddress = "0xA59729d896162e951eD2b91Ee7061420685C5026"; 
const tokenABI = tokenContractJSON.abi;
const walletAddress = "0xe5A1359167d585Fea1a88AE6178a9e9c29B3d6dc";   

async function main() {

    const nftData = [
      {
        cid: "QmPFLm32bxSmc257kgedfcrKF1qvkGKbBg8jz1B4a9WwsS",
        prompt: "Jett Skin",
      },
      {
        cid: "QmcY856nPRCSeUCj4BuE2eAVhfaC3VKttAGAPURxywyXkZ",
        prompt: "Multiplayer Game",
      },
      {
        cid: "QmekQgKLneV8hKQXw7dL9F6jeLbMU1nDZz9xv4a9ECWjCj",
        prompt: "Valorant Gun skin",
      },
      {
        cid: "QmSCH56NGdYXm2eR3ibbd5aK53qbdB7DxbLtVfH5aWtgdv",
        prompt: "Valorant",
      },
      {
        cid: "QmbGNuJg58Y9C24EjMTnGP9rGFFcZ9zB8hBJ2Edoc9zZ5f",
        prompt: "Man playing valorant",
      }
    ]

    const myContract = await hre.ethers.getContractAt(tokenABI, tokenAddress);
    let nftID = 0;
    for(const {cid, prompt} of nftData){
      // Minting NFTs
      const tx = await myContract.mint(walletAddress, cid);
      await tx.wait();
      console.log("NFT minted with CID: ", cid);

      // Setting Prompts
      const setDescTx = await myContract.setDescription(nftID, prompt);
      await setDescTx.wait();

      console.log(`Prompt set for NFT with nftID ${nftID.toString()}!`);
      nftID++;
    }

  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });