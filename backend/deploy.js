import Web3 from 'web3';
import fs from 'fs';

const { abi, bytecode } = JSON.parse(fs.readFileSync('./ABI/Lottery.json', 'utf8'));

const RPC_URL = 'http://127.0.0.1:7545';
const PRIVATE_KEY = '0xd71f03f713aa76e3cd0bd073399f3f54c27256060c79a9df75c7fd9b0f9b8314';

const deploy = async () => {
    const web3 = new Web3(RPC_URL);
    const wallet = web3.eth.accounts.wallet.add(PRIVATE_KEY);

    const contract = new web3.eth.Contract(abi);
    const deployed = contract.deploy({ data: '0x' + bytecode });

    try {
        const deployedContract = await deployed.send({
            from: wallet[0].address, // Use wallet.address
            gas: 5000000, // Increase gas limit
        });

        console.log("Contract deployed to:", deployedContract.options.address);
    } catch (error) {
        console.error("Deployment error:", error.message);
    }
};

deploy().catch(console.error);
