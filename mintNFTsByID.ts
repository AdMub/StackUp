import { getDefaultProvider, Wallet, utils } from "ethers"; // ethers v5
import { Provider, TransactionResponse } from "@ethersproject/providers"; // ethers v5
import { ERC721Client } from "@imtbl/contracts";

const CONTRACT_ADDRESS = "0x1d34d57504e94776edeb9199f07196bea168fbd2";
const PRIVATE_KEY =
  "5cce4d7f4f2a1d9b672205e887bca4b87085fe685edb0032aea71e08532ec651";
const TOKEN_ID1 = 1;
const TOKEN_ID2 = 2;
const TOKEN_ID3 = 3;

const provider = getDefaultProvider("https://rpc.testnet.immutable.com");

const mint = async (provider: Provider): Promise<TransactionResponse> => {
    // Bound contract instance
  const contract = new ERC721Client(CONTRACT_ADDRESS);
  console.log('Contract instance created with address:', CONTRACT_ADDRESS);

  // The wallet of the intended signer of the mint request
  const wallet = new Wallet(PRIVATE_KEY, provider);

  const requests = [
    {
      to: "0xDc29d248a7E32802AEba4f7AFc3d1D5e329Bee04",
      tokenIds: [TOKEN_ID1, TOKEN_ID2, TOKEN_ID3],
    },
    ];

  const gasOverrides = {
    maxPriorityFeePerGas: 100e9, // 100 Gwei
    maxFeePerGas: 150e9,
    gasLimit: 200000,
    };

  const populatedTransaction = await contract.populateMintBatch(requests, gasOverrides);

  const result = await wallet.sendTransaction(populatedTransaction);
  console.log("Transaction sent, result:", result); // To get the TransactionResponse value
  return result;
};

mint(provider);