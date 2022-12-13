const abi = require("./abi");

class Contract {
    constructor(web3, address) {
        this.contract = new web3.eth.Contract(abi, address);
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

module.exports = Contract;