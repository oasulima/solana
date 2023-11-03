import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import AddressForm from '../components/AddressForm'
import * as web3 from "@solana/web3.js"

const Home: NextPage = () => {
    const [balance, setBalance] = useState(0)
    const [address, setAddress] = useState('')
    const [executable, setExecutable] = useState('')

    const addressSubmittedHandler = async (address: string) => {
        try {
            setAddress(address);
            const key = new web3.PublicKey(address);
            const connection = new web3.Connection(web3.clusterApiUrl('devnet'));
            const balance = await connection.getBalance(key);
            setBalance(balance / web3.LAMPORTS_PER_SOL);
            const accountInfo = await connection.getAccountInfo(key);
            setExecutable(accountInfo?.executable ? "Yes" : "No");
        } catch (error) {
            setAddress("");
            setBalance(0);
            setExecutable("");
            alert(error);
        }
    }

    return (
        <div className={styles.App}>
            <header className={styles.AppHeader}>
                <p>
                    Start Your Solana Journey
                </p>
                <AddressForm handler={addressSubmittedHandler} />
                <p>{`Address: ${address}`}</p>
                <p>{`Balance: ${balance} SOL`}</p>
                <p>{`Is it executable? ${executable}`}</p>
            </header>
        </div>
    )
}

export default Home
