const hre = require("hardhat");
const fxRootContractABI = require("../fxRootContractABI.json");
const tokenContractJSON = require("../artifacts/contracts/VALNFT.sol/VALNFT.json");

const tokenAddress = "0xA59729d896162e951eD2b91Ee7061420685C5026"; 
const tokenABI = tokenContractJSON.abi;
const fxERC721RootAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de";
const walletAddress = "0xe5A1359167d585Fea1a88AE6178a9e9c29B3d6dc"; 


async function main() {

    const myNFTContract = await hre.ethers.getContractAt(tokenABI, tokenAddress);
    const fxContract = await hre.ethers.getContractAt(fxRootContractABI, fxERC721RootAddress);
    const transferNFTs = 3;

    for (let i = 0; i < transferNFTs; i++) {

      const nftID = await myNFTContract.tokenOfOwnerByIndex(walletAddress, i);
      // Approve the FxPortal Bridge to transfer the NFT on your behalf

      const approveTx = await myNFTContract.approve(fxERC721RootAddress, nftID);
      await approveTx.wait();
  
      console.log('Approval confirmed for NFT with nftID:', nftID.toString());
  
      // Deposit the NFT to the FxPortal Bridge
      const depositTx = await fxContract.deposit(
        tokenAddress,
        walletAddress,
        nftID,
        "0x6556"
      );
      await depositTx.wait();
  
      console.log("NFT with nftID:", nftID.toString(), "deposited to the FxPortal Bridge");
    }
  
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });