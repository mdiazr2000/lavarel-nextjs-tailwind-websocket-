import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link";
import Login from "../components/forms/form_login";


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create NextJs App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

          <Login labelText="Login to your account"
                 dontHave="Don't have an account yet?"/>
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}
