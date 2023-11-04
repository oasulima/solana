import * as web3 from "@solana/web3.js";
import * as dotenv from "dotenv";
import { getKeypairFromEnvironment } from "@solana-developers/node-helpers"


const PING_PROGRAM_ADDRESS = new web3.PublicKey('ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa')
const PING_PROGRAM_DATA_ADDRESS = new web3.PublicKey('Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod')

dotenv.config();

const payer = getKeypairFromEnvironment('DEVNET_SECRET_KEY')
const connection = new web3.Connection(web3.clusterApiUrl('devnet'))

//await connection.requestAirdrop(payer.publicKey, web3.LAMPORTS_PER_SOL * 1);

await sendPingTransaction(connection, payer);

async function sendPingTransaction(connection: web3.Connection, payer: web3.Keypair) {
    const transaction = new web3.Transaction();

    const programId = new web3.PublicKey(PING_PROGRAM_ADDRESS);
    const pingProgramId = new web3.PublicKey(PING_PROGRAM_DATA_ADDRESS);

    const instruction = new web3.TransactionInstruction({
        keys: [
            {
                pubkey: pingProgramId,
                isSigner: false,
                isWritable: true
            }
        ],
        programId
    });

    transaction.add(instruction);

    const signature = await web3.sendAndConfirmTransaction(connection, transaction, [payer]);

    console.log(`You can view your transaction on the Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)
}