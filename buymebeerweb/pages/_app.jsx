import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Sepolia } from "@thirdweb-dev/chains";
import Head from "next/head"; // for metadata and favicon
import "../styles/globals.css";



const activeChain = Sepolia;



function MyApp({ Component, pageProps }) {
  return (
    <>
    {/* This will help us to set the metadata of our app */}
    <Head>
      <title>Buy Me a Beer</title>
      <link rel="shortcut icon" href='../icon.png' />
      <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css"></link>

    </Head>


    <ThirdwebProvider activeChain={activeChain}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
    </>
  );
}

export default MyApp;
