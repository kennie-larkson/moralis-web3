import dotenv from 'dotenv'
dotenv.config()
import express from'express'
import Moralis from 'moralis'
import { EvmChain} from '@moralisweb3/evm-utils'
import getEtherBalance from './utils.js'

const port = process.env.PORT || 3000
const web3api = process.env.MORALIS_API_KEY
const chain = EvmChain.RINKEBY
//const address = process.env.ETHER_ADDRESS

const app = express()

app.use(express.json())


app.get('/', (req,res)=> {
   return res.send('Hello world.')
})

app.post('/ether-balance', async function (req, res) {
    console.log(req.body);
    const {address} = req.body
    try {
        const data = await getEtherBalance(address, chain)
        res.status(200).json({data})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

async function startServer() {
    app.listen(port, ()=> console.log(`Server running on port ${port}`))

    await Moralis.default.start({apiKey: web3api}).then(() => console.log('Successfully connected to Moralis server.'))
}

startServer()

