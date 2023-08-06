// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract VALNFT is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private nftIDCounter;

    mapping(uint256 => string) private nftPrompts;

    constructor() ERC721("Valorant_Token", "VAL-T") {}

    function setDescription(uint256 nftID, string memory prompt) external onlyOwner {
        nftPrompts[nftID] = prompt;
    }

    function promptDescription(uint256 nftID) external view returns (string memory) {
        return nftPrompts[nftID];
    }

    function mint(address to , string memory cid) external onlyOwner {
        uint256 nftID = nftIDCounter.current();
        _mint(to, nftID);
        nftPrompts[nftID] = cid;
        nftIDCounter.increment();
    }
}