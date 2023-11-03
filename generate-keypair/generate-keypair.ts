import { Keypair } from "@solana/web3.js";
import {getKeypairFromEnvironment} from "@solana-developers/node-helpers";
import * as dotenv from "dotenv";

const keypair = Keypair.generate();

console.log(`The public key is: `, keypair.publicKey.toBase58());
console.log(`The secret key is: `, keypair.secretKey);

dotenv.config();

const keypair_from_env = getKeypairFromEnvironment("SECRET_KEY");

console.log(`The env public key is: `, keypair_from_env.publicKey.toBase58());
console.log(`The env secret key is: `, keypair_from_env.secretKey);

console.log(`✅ Finished!`);