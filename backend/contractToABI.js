import fs from 'fs';
import solc from 'solc';

const contractPath = "./contracts/Lottery.sol";
const source = fs.readFileSync(contractPath, 'utf8');

const input = {
    language: "Solidity",
    sources: {
        'Lottery.sol': {
            content: source
        }},
        settings: {
            outputSelection: {
                '*': {
                    '*': ['abi', 'evm.bytecode','evm.bytecode.sourceMap'],
                },
            },
        },
    }


const output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(output);
const contract = output.contracts['Lottery.sol'].Lottery;

const abi = contract.abi;
const bytecode = contract.evm.bytecode.object;

fs.writeFileSync('./ABI/Lottery.json', JSON.stringify({abi, bytecode}, null, 2));

console.log('Contract ABI and Bytecode has been generated successfully!');
