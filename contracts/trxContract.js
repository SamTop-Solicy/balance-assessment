const TronWeb = require('tronweb');
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const tronWeb = new TronWeb(fullNode, solidityNode);
tronWeb.setAddress('TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t');


class TrxContract {
    constructor(address) {
        this.address = address;
    }

    initialize = async () => {
        try {
            this.contract = await tronWeb.contract().at(this.address);
            this.decimals = await this.contract.decimals().call();
        } catch (e) {
            console.log(e);
        }
    }

    balanceOf = async (address) => {
        try {
            return {
                success: true,
                data: await this.contract.balanceOf(address).call(),
            };
        } catch(e) {
            return {
                success: false,
                data: e,
            };
        }
    }
}

module.exports = TrxContract;