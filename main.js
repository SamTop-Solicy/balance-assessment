const ContractFactory = require("./contracts/contractFactory");

const models = {
    exchange: 'binance',
    tokens: [
        {
            wallet: 'TKHuVq1oKVruCGLvqVexFs6dawKv6fQgFs',
            addr: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
            ticker: 'WETH',
            network: 1,
            network_type: 'trx'
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
            wallet: '0xa180Fe01B906A1bE37BE6c534a3300785b20d947',
            addr: '0x55d398326f99059fF775485246999027B3197955',
            ticker: 'ERC20',
            network_type: 'bnb_chain'
        },
    ]
};

const contracts = {};

const network_data = {};

const calculate = async (models) => {
    await Promise.all(models.tokens.map(async (info) => {
        try {
            if (!contracts[info.addr])
                contracts[info.addr] = await ContractFactory.create(info.network_type, info.addr);
            const res = await contracts[info.addr].balanceOf(info.wallet);
            if (!network_data[info.network_type])
                network_data[info.network_type] = {
                    balance: 0,
                    decimals: contracts[info.addr].decimals,
                };
            if (res.success) {
                network_data[info.network_type].balance = (BigInt(network_data[info.network_type].balance || 0) + BigInt(res.data)).toString();
            } else {
                console.log(res.data);
            }
        } catch (e) {
            console.log(e);
        }
    }));
    const res = [];
    for (const [key, data] of Object.entries(network_data)) {
        res.push({
            exchange: key,
            amount: formatBalanceNumber(data.balance, data.decimals),
        });
    }
    console.log(res);
    return res;
}

const prependZeroes = (number, decimals) => {
    let res = number;
    if (number.length < decimals) {
        for (let i = 0; i < decimals - number.length + 1; ++i) {
            res = `0${res}`;
        }
    }
    return res;
}

const formatBalanceNumber = (number, decimals) => {
    number = prependZeroes(number, decimals);
    const start = number.slice(0, number.length - decimals);
    const end = number.slice(number.length - decimals, number.length - 14);
    return `${start}.${end}`
}

calculate(models);
