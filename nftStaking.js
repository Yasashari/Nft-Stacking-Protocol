let provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;

// connect metamask with dapp
async function connectmetamask() {
  // metamask requires reqesting permission to connect users accounts
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();
  console.log("Account address: ", await signer.getAddress());
}

const nftStakingaddr = "0xC86159F1c7Bc0f6C26241B47B06c2A5f07fB73B0";

const nftStackingABI = [
  "function name() view returns(string)",
  "function stake(uint[] memory tokenIds) public",
  "function getRewards(address staker) public returns (uint)",
  "function claim() public nonReentrant",
  "function unstake(uint[] memory tokenIds) public",
];

const nftstakingABIJSON = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftContract",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "staker",
        type: "address",
      },
    ],
    name: "getRewards",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "stakers",
    outputs: [
      {
        internalType: "uint256",
        name: "currYield",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rewards",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastCheckpoint",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "tokenOwners",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const NFTcontrataddr = "0x04c75A4FD5782AD1fDc4DD30045D853A6BBB0dcC";
const NFTcontractABI = ["function approve(address to, uint256 tokenId) public", "function getApproved(uint256 tokenId) public view  returns(address)"];

// const NFTMarketplaceABIjson =

// async function check() {
//   const nftStacking = new ethers.Contract(nftStakingaddr, nftStackingABI, provider);
//   let name1 = await nftStacking.name();
//   console.log(name1);
// }

async function approve() {
  const NFTcontract = new ethers.Contract(NFTcontrataddr, NFTcontractABI, provider);
  const id = document.getElementById("input1").value;
  await NFTcontract.connect(signer).approve(nftStakingaddr, id);
  const addr = await NFTcontract.getApproved(id);
  console.log(addr);
}

// async function checkapprove() {
//   const NFTcontract = new ethers.Contract(NFTcontrataddr, NFTcontractABI, provider);
//   const addr = await NFTcontract.getApproved(1);
//   console.log(addr);
// }

async function Stake() {
  const nftStacking = new ethers.Contract(nftStakingaddr, nftStackingABI, provider);
  const id = document.getElementById("input1").value;
  console.log(id);

  await nftStacking.connect(signer).stake([id]);
}

async function getReward() {
  const nftStacking = new ethers.Contract(nftStakingaddr, nftStackingABI, provider);
  const myaddr = await signer.getAddress();
  await nftStacking.connect(signer).getRewards(myaddr);
  setTimeout(rewardAmount, 20000);
}

async function rewardAmount() {
  const nftStacking = new ethers.Contract(nftStakingaddr, nftstakingABIJSON, provider);
  const myaddr = await signer.getAddress();
  const reward = await nftStacking.stakers(myaddr);
  //   const reward1 = reward.toString();
  let stakearray = [];
  for (let i = 0; i < 3; i++) {
    stakearray[i] = reward[i].toString();
  }
  console.log(stakearray[1] / 1e18);

  document.getElementById("label1").innerText = `: ${(stakearray[1] / 1e18).toFixed(5)}TribX`;
}

async function Claim() {
  const nftStacking = new ethers.Contract(nftStakingaddr, nftStackingABI, provider);
  await nftStacking.connect(signer).claim();
}

async function unstake() {
  const nftStacking = new ethers.Contract(nftStakingaddr, nftStackingABI, provider);
  const id = document.getElementById("input2").value;
  await nftStacking.connect(signer).unstake([id]);
}
