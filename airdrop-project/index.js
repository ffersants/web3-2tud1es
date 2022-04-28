const {Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL, Keypair} = require("@solana/web3.js")

const wallet = new Keypair()
const connection = new Connection(clusterApiUrl('devnet', true))
const pk = new PublicKey(wallet.publicKey);
const sk = wallet.secretKey;

main()

async function main(){
    const amount1 = await getWalletBalance(pk)
    console.log(amount1)
    
    await airdropSol(pk)
    
    const amount2 = await getWalletBalance(pk)
    console.log(amount2)
}


async function airdropSol(walletPk){
    try{
        const transaction = await connection.requestAirdrop(walletPk, 2 * LAMPORTS_PER_SOL)        
        await connection.confirmTransaction(transaction)
    }catch(err){
        console.log(err)
    }
}

async function getWalletBalance(walletPk) {
    try{
        const balance = await connection.getBalance(walletPk)
        return balance
    }catch(err){
        console.log(err)
    }
}