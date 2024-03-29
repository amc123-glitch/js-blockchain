/*
* Simple Blockchain with javascript and sha256
*
* to run -> terminal `node main.js`
*
*/
// Importing the crypto-js sha
const SHA256 = require("crypto-js/sha256");

// defining what the block consist of
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

// summing up the hash
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    // Setting the begginning of the hash to specific characters
    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}

// Blcok chain class
class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    // Create the initial chain
    createGenesisBlock() {
        return new Block(0, "12/20/2017", "Genesis block", "0");
    }

// Finding the latest block 
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Adding a new chain
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    // Validation
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // currentBlock to calculateHash
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            // currentBlock to previousHash
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        // true is true....
        return true;
    }
}

// Testing
let antcoin = new Blockchain();

// Block 1
console.log('Mining block 1...');
antcoin.addBlock(new Block(1, "12/20/2017", { amount: 4 }));
// Block 2
console.log('Mining block 2...');
antcoin.addBlock(new Block(2, "12/22/2017", { amount: 8 }));


// console.log('Is blockchain valid? ' + antcoin.isChainValid());

// antcoin.chain[1].data = { amount: 100 };
// antcoin.chain[1].hash = antcoin.chain[1].calculateHash();

// console.log('Is blockchain valid? ' + antcoin.isChainValid());

// console.log(JSON.stringify(antcoin, null , 4));