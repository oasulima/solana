import * as web3 from "@solana/web3.js";
import * as dotenv from "dotenv";

import { getKeypairFromEnvironment } from "@solana-developers/node-helpers"
 

dotenv.config();

const sender = getKeypairFromEnvironment('DEVNET_SECRET_KEY')
const recipient = getKeypairFromEnvironment('PERSONAL_SECRET_KEY')
const connection = new web3.Connection(web3.clusterApiUrl('devnet'))

await connection.requestAirdrop(sender.publicKey, web3.LAMPORTS_PER_SOL * 1);

await sendSoilTransaction(connection, sender, recipient.publicKey, 0.5);

async function sendSoilTransaction(connection: web3.Connection, sender: web3.Keypair, recipient: web3.PublicKey, amount_sol: number) {
    const transaction = new web3.Transaction();
 

    const sendSolInstruction = web3.SystemProgram.transfer({

        fromPubkey: sender.publicKey,
      
        toPubkey: recipient,
      
        lamports: web3.LAMPORTS_PER_SOL * amount_sol
      
      })

    transaction.add(sendSolInstruction);

    const signature = await web3.sendAndConfirmTransaction(connection, transaction, [sender]);

    console.log(`You can view your transaction on the Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)
}