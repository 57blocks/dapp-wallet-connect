const InfuraRpcUrl = `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`
const AlchemyRpcUrl = `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`

const configUtil = {
  InfuraRpcUrl,
  AlchemyRpcUrl,
}

export default configUtil
