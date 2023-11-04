import * as web3 from "@solana/web3.js";
import * as dotenv from "dotenv";
import { getKeypairFromEnvironment } from "@solana-developers/node-helpers"


const PING_PROGRAM_ADDRESS = new web3.PublicKey('zfMjLgobB4kvWVGVTYgh5hi8LZzBX3tvF7ExBkiuCT2')

dotenv.config();

const payer = getKeypairFromEnvironment('PERSONAL_SECRET_KEY')
const connection = new web3.Connection(web3.clusterApiUrl('devnet'))

await sendPingTransaction(connection, payer);

async function sendPingTransaction(connection: web3.Connection, payer: web3.Keypair) {
    const transaction = new web3.Transaction();

    const programId = new web3.PublicKey(PING_PROGRAM_ADDRESS);

    const instruction = new web3.TransactionInstruction({
        keys: [],
        programId
    });

    transaction.add(instruction);

    const signature = await web3.sendAndConfirmTransaction(connection, transaction, [payer]);

    console.log(`You can view your transaction on the Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)
}