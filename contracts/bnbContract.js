const abi = require("../abi");
const Web3 = require('web3');


class BnbContract {
    constructor(address) {
        try {
            const web3 = new Web3("https://bsc-dataseed1.binance.org:443");
            this.contract = new web3.eth.Contract(abi, address);
        } catch (e) {
            throw "invalid contract address";
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

module.exports = BnbContract;