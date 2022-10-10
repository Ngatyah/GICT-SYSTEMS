import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import FormContainer from "../components/FormContainer ";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div className={styles.App}>
      <NavBar />
      <FormContainer />
    </div>
  )
}
