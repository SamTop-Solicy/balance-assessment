const abi = require("../abi");
const Web3 = require('web3');


class EthContract {
    chainURL = "https://eth-mainnet.g.alchemy.com/v2/DpJWNCW1L8psVTEPyqbaesaZO9DCNpio";

    constructor(address) {
        try {
            const web3 = new Web3(this.chainURL);
            this.contract = new web3.eth.Contract(abi, address);
        } catch (e) {
            throw "invalid chain url";
        }
    }

    async initialize() {
        this.decimals = await this.contract.methods.decimals().call();
    }

    balanceOf = async (address) => {
        try {
            return {
                success: true,
                data: await this.contract.methods.balanceOf(address).call()
            };
        } catch(e) {
            return {
                success: false,
                data: e,
            };
        }
    }
}

module.exports = EthContract;