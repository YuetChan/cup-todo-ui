import * as React from 'react';

import { Button } from '@mui/material'
import Head from 'next/head'

import styles from '../styles/Home.module.scss'

import NavBar from '../components/nav-bar'
import { getSessionUserEmail } from '../util/user-util';
import { isJwtEmptyOrInvalid } from '../util/jwt-util';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  const handleEstimateNowClick = async () => {
    if(!isJwtEmptyOrInvalid()) {
      await router.push(`${process.env.NEXT_PUBLIC_DOMAIN}/new-request`);
    }else {
      await router.push(`${process.env.NEXT_PUBLIC_ABAC_HOST}/oauth/google-oauth`);
    }
  }

  return (
    <div className={ styles.container }>
      <Head>
        <title>Cup Tier</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={ styles.main }>
        <NavBar/>

        <div className='home__content'>
          <b>Let us estimate your tier !</b>

          <div style={{
            fontSize: "19px",
            margin: "11px 0px 0px 0px"
          }}>
            Fill out four simple questions and get a tier report along with detail explanation
          </div>

          <div style={{
            display: "flex",
            margin: "19px 0px 0px 0px"
          }}>
            <Button 
              size='large' 
              variant="outlined"
              onClick={ handleEstimateNowClick }>
                Estimate now
            </Button>
          </div>

          <div style={{ padding: "37px 0px 0px 0px" }}>
            <img 
              src={"https://i.ibb.co/cLDw0kL/tier-template.png"} 
              className="responsive-img"
            />
          </div>
        </div>  
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}

export default Home;