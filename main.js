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
            wallet: '0x0000a26b00c1f0df003000390027140000faa719',
            addr: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
            ticker: 'WETH',
            network: 56,
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
            wallet: '0x544984957b2d3af0ab331f6e8ca35bab00de53e3',
            addr: '0xc3761EB917CD790B30dAD99f6Cc5b4Ff93C4F9eA',
            ticker: 'ERC20',
            network_type: 'bnb_chain'
        },
        {
            wallet: '0xb6c8da1ac9bb63386b0dd883e64432c09b8689ff',
            addr: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
            ticker: 'WETH',
            network_type: 'trx'
        },
    ]
};

const contracts = {};

const balances = {};

const calculate = async (models) => {
    await Promise.all(models.tokens.map(async (info) => {
        if (!contracts[info.addr])
            contracts[info.addr] = new Contract(web3, info.addr);
        const res = await contracts[info.addr].balanceOf(info.wallet);
        if (res.success) {
            balances[info.network_type] = (BigInt(balances[info.network_type] || 0) + BigInt(res.data)).toString();
        }
        else
            console.log(res.data);
    }));
    const res = [];
    for (const [key, balance] of Object.entries(balances)) {
        res.push({
            exchange: key,
            amount: formatBalanceNumber(balance),
        });
    }
    console.log(res);
    return res;
}

const prependZeroes = (number) => {
    let res = number;
    if (number.length < 18) {
        for (let i = 0; i < 18 - number.length + 1; ++i) {
            res = `0${res}`;
        }
    }
    return res;
}

const formatBalanceNumber = (number) => {
    number = prependZeroes(number);
    const start = number.slice(0, number.length - 18);
    const end = number.slice(number.length - 18, number.length - 14);
    return `${start}.${end}`
}

calculate(models);
