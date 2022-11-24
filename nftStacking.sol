//SPDX-License-Identifier:MIT

pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTStaking is ERC20,ReentrancyGuard {

IERC721 nftContract;

uint constant SECONDS_PER_DAY=24*60*60;
uint constant BASE_YIELD_RATE=1000 ether;

struct Staker{

  uint currYield;
  uint rewards;
  uint lastCheckpoint;
  uint[] stakedNFTs;

}

mapping(address=>Staker) public stakers;
mapping(uint=>address) public tokenOwners;

constructor(address _nftContract, string memory name, string memory symbol) ERC20(name, symbol) {
        nftContract=IERC721(_nftContract);
    }

function stake(uint[] memory tokenIds) public{

 Staker storage user=  stakers[msg.sender];
 uint yield=user.currYield;
 
 uint length=tokenIds.length;
 for(uint i=0 ; i< length ; i++){
   require(nftContract.ownerOf(tokenIds[i])==msg.sender, "You are not the owner of the Nft");
   
nftContract.safeTransferFrom(msg.sender,address(this),tokenIds[i]);

tokenOwners[tokenIds[i]]= msg.sender;
yield+=BASE_YIELD_RATE;
user.stakedNFTs.push(tokenIds[i]);



 }
accumulate(msg.sender);
user.currYield= yield;

 }

function unstake(uint[] memory tokenIds) public {
   Staker storage user= stakers[msg.sender];
   uint yield =user.currYield;
  
   uint length= tokenIds.length;
   
for(uint i=0 ; i < length ; i++){
   
  require(tokenOwners[tokenIds[i]]==msg.sender,"You are not the owner");
  require(nftContract.ownerOf(tokenIds[i])==address(this), "NFT not staked");

  tokenOwners[tokenIds[i]]=address(0);
 
  if(yield!=0){
  
   yield-=BASE_YIELD_RATE ; 

 }

  nftContract.safeTransferFrom(address(this),msg.sender, tokenIds[i]);

 }

accumulate(msg.sender);
user.currYield=yield;
 
 }

function claim() public nonReentrant {

  Staker storage user =  stakers[msg.sender];
  
  accumulate(msg.sender);
  
 _mint(msg.sender, user.rewards);
 
 user.rewards=0;
  
 }



function accumulate(address staker) internal{

 stakers[staker].lastCheckpoint= block.timestamp;

 }

function getRewards(address staker) public returns (uint) {
 Staker storage user=stakers[staker];

 if(user.lastCheckpoint==0){
 
  user.rewards=0;

 }
  
  user.rewards=((block.timestamp-user.lastCheckpoint)*user.currYield)/SECONDS_PER_DAY ; 
  return user.rewards;
 }

function onERC721Received(address, address, uint256, bytes calldata) external pure 
returns(bytes4){

return bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));

}

}