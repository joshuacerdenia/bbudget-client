import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from '../components/NavBar';
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import { UserProvider } from '../contexts/UserContext'
import Helper from '../app-helper'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
    const [user, setUser] = useState({ email: null })

    useEffect(() => {
        if (Helper.getAccessToken() !== null) {
            const options = { headers: {
                Authorization: `Bearer ${Helper.getAccessToken()}`
            }}
  		    // Send access token to API endpoint
            fetch(`${Helper.apiBaseUrl}/api/users/details`, options)
            .then((response) => response.json())
            .then((userData) => {
  	            // Should receive user data
                if (userData.email !== undefined) {
                    setUser({ email: userData.email })
                } else {
                    setUser({ email: null })
                }
            });
        }
  }, [user.id])

    const unsetUser = () => {
    // Log out user
        localStorage.clear()
        setUser({ email: null })
    }

    return (
        <UserProvider value={{user, setUser, unsetUser}}>
           {/* 
            <Head>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap"
                    rel="stylesheet"
                    key="google-font-source-sans-pro"
                />
           </Head>*/}
        

            <AppNavBar />
            <Container>
                <Component {...pageProps} />
            </Container>
           {/*
            <style global jsx>{`
                body {
                    font-family: 'Source Sans Pro', sans-serif;
                }
                `}
            </style>*/}
        </UserProvider>
    );
}

export default MyApp