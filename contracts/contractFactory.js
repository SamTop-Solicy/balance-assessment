const EthContract = require('./ethContract');
const TrxContract = require("./trxContract");
const BnbContract = require("./bnbContract");

class ContractFactory {
    static async createEthContract(address) {
        const contract = new EthContract(address);
        await contract.initialize();
        return contract;
    }

    static async createTrxContract(address) {
        const contract = new TrxContract(address);
        await contract.initialize();
        return contract;
    }

    static async createBnbContract(address) {
        const contract = new BnbContract(address);
        await contract.initialize();
        return contract;
    }

    static async create(chainType, address) {
        switch (chainType) {
            case "evm": return await this.createEthContract(address);
            case "trx": return await this.createTrxContract(address);
            case "bnb_chain": return await this.createBnbContract(address);
        }
    }
}

module.exports = ContractFactory;