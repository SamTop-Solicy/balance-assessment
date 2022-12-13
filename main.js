const web3 = require("./web3");
const Contract = require("./contract");

const models = {
    exchange: 'binance',
    tokens: [
        {
            wallet: '0x15652636f3898f550b257b89926d5566821c32e1',
            addr: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
            ticker: 'WETH',
            network: 1,
            network_type: 'evm'
        },
        {
            wallet: '0x6a07eada81a7eb879f8dcbd9a339227f62c010c7',
            addr: '0xc3761EB917CD790B30dAD99f6Cc5b4Ff93C4F9eA',
            ticker: 'ERC20',
            network: 56,
            network_type: 'evm'
        },
        {
            wallet: '0x15652636f3898f550b257b89926d5566821c32e1',
            addr: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
            ticker: 'WETH',
            network_type: 'bnb_chain'
        },
        {
            wallet: '0x15652636f3898f550b257b89926d5566821c32e1',
            addr: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
            ticker: 'WETH',
            network_type: 'trx'
        },
    ]
};

const contracts = {};

const wallets = {};

const calculate = async (models) => {
    await Promise.all(models.tokens.map(async (info) => {
        if (!contracts[info.addr])
            contracts[info.addr] = new Contract(web3, info.addr);
        const res = await contracts[info.addr].balanceOf(info.wallet);
        if (res.success) {
            wallets[info.wallet] = wallets[info.wallet] || {};
            wallets[info.wallet][info.ticker] = (BigInt(wallets[info.wallet][info.ticker] || 0) + BigInt(res.data)).toString();
        }
        else
            console.log(res.data);
    }));
    return wallets;
}

calculate(models);
