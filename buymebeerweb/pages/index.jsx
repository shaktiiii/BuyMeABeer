import { ConnectWallet, Web3Button, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import {Card,Heading, Link, Image, CardBody, Container, Flex, Text ,Box, SimpleGrid, Skeleton, Input, Stack,Button, useToast,Spacer} from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useRef, useState } from "react";
import { ethers } from "ethers";


export default function Home() {
  
  const address = useAddress();

  const contractAddress = "0xdB37BA845A8C22D2f5Df837E107fdfc1Cb1E78c8";

  const {contract} = useContract(contractAddress); // it creates a instance of the abi 

  const {data: totalBeers, isLoading: loadingTotalBeers} = useContractRead(contract, "getTotalBeers"); // this is calling the function and storing its fetched value in the data key.
  const {data: recentBeers, isLoading: loadingRecentBeers} = useContractRead(contract, "getAllBeers");

  const [name, setName] = useState("");
  const [message, setMessage] = useState ("");

  

  const handleNameChange = (event) => {
    setName(event.target.value)
  }
  const handleMessageChange = (event) => {
    setMessage(event.target.value)
  }




  // BELOW SECTION FOR THE NUMBER OF BEERS AND THEIR TOATAL IN THE LEFT/UPPER COLUMN 
  const [totalNumberOfCans, setTotalNumberOfCans] = useState(0); 
  const totalAmountOfCans = (totalNumberOfCans * 0.01).toFixed(2);
  const [totalNumberOfBottles, setTotalNumberOfBottles] = useState(0);
  const totalAmountOfBottles = (totalNumberOfBottles * 0.05).toFixed(2);
  const [totalNumberOfPacks, setTotalNumberOfPacks] = useState(0);
  const totalAmountOfPacks = (totalNumberOfPacks * 0.1).toFixed(2);

  const totalNumberOfBeers = totalNumberOfCans + (5 * totalNumberOfBottles) + (10 * totalNumberOfPacks);
  let totalAmount = (0.01 * totalNumberOfBeers).toFixed(2);

  const incrementBeerCan =() => {
    setTotalNumberOfCans(totalNumberOfCans + 1);
  }
  const decrementBeerCan =() => {
    totalNumberOfCans !== 0 && setTotalNumberOfCans(totalNumberOfCans - 1);
  }

  const incrementBeerBottle =() => {
    setTotalNumberOfBottles(totalNumberOfBottles + 1)
  }
  const decrementBeerBottle =() => {
    totalNumberOfBottles !== 0 && setTotalNumberOfBottles(totalNumberOfBottles - 1)
  }
  const incrementBeerPack =() => {
    setTotalNumberOfPacks(totalNumberOfPacks + 1);
  }
  const decrementBeerPack =() => {
    totalNumberOfPacks !== 0 && setTotalNumberOfPacks(totalNumberOfPacks - 1)
  }
  
  

  const toast = useToast()

  const morethan0beers = () => {
    toast({
      position: 'top-right',
      duration: 7000,
      render: () => (

        <Box className={styles.toast} >
          <Flex  alignItems={"center"} justify={"center"} padding={"10px"} direction={"row"} gap={"25px"}>

            <Box display={"flex"} justifyContent={"center"} minWidth={"10vh"}>
            <Image  src="../singleBeer.png" boxSize={"70px"}/>            
            </Box>

            <Flex direction={"column"}>
              <Heading fontSize={"xl"}> Hey, {name} </Heading>
              
              <Text mt={"5px"}>Thanks for the beer man. I really Appreciate your generosity.</Text>
            </Flex>
            
          </Flex>
        </Box>
      ),
    })

  } 
  const morethan10beers = ()=> {
    toast({
      position: 'top-right',
      duration: 10000,
      render: () => (

        <Box className={styles.toast} >
          <Flex  alignItems={"center"} justify={"center"} padding={"10px"} direction={"row"} gap={"25px"}>

            <Box display={"flex"} justifyContent={"center"} minWidth={"10vh"}>
            <Image  src="../beerBottleThanks.png" boxSize={"70px"}/>            
            </Box>

            <Flex direction={"column"}>
              <Heading fontSize={"xl"}> Hey, {name} </Heading>
              
              <Text mt={"5px"}>To the beer fairy who knows the key to my heart (and taste buds)! Your gift has me hopping with joy, and my gratitude is bubbling over like a perfectly poured pint. Cheers to you!</Text>
            </Flex>
            
          </Flex>
        </Box>
      ),
    })

  } 
   const morethan25beers = () => {
    toast({
      position: 'top-right',
      duration: 10000,
      render: () => (

        <Box className={styles.toast} >
          <Flex  alignItems={"center"} justify={"center"} padding={"10px"} direction={"row"} gap={"15px"}>

            <Box display={"flex"} justifyContent={"center"} minWidth={"10vh"}>
            <Image  src="../beerBottels.png" boxSize={"70px"}/>            
            </Box>

            <Flex direction={"column"}>
              <Heading fontSize={"xl"}> Hey, {name} </Heading>
              
              <Text mt={"5px"}>Cheers to the master of hoppy surprises! Thanks for filling my fridge with liquid happiness. You've turned my ordinary days into extraordinary ones!</Text>
            </Flex>
            
          </Flex>
        </Box>
      ),
    })

  }  
  const morethan50beers = () => {
    toast({
      position: 'top-right',
      duration: 12000,
      render: () => (

        <Box className={styles.toast} >
          <Flex  alignItems={"center"} justify={"center"} padding={"10px"} direction={"row"} gap={"10px"}>

            <Box display={"flex"} justifyContent={"center"} minWidth={"10vh"}>
            <Image  src="../beer.png" boxSize={"70px"}/>            
            </Box>

            <Spacer />

            <Flex direction={"column"}>
              <Heading fontSize={"xl"}> Hey, {name} </Heading>
              
              <Text mt={"5px"}>You're like a beer whisperer, sensing my deepest desires and delivering them in the form of frothy goodness! My taste buds are throwing a wild party, and it's all thanks to your beery generosity. Cheers, mate!</Text>
            </Flex>
            
          </Flex>
        </Box>
      ),
    })

  }

  const callToastAccordingToBeers = () => {
      if (totalNumberOfBeers > 50) {
        morethan50beers();
      }else if (totalNumberOfBeers > 25) {
        morethan25beers();
      }else if (totalNumberOfBeers > 10) {
        morethan10beers();
      }else if (totalNumberOfBeers > 0) {
        morethan0beers();
      }
   
  }


  const clearValues = () => {
    setName("");
    setMessage("");

  }


  const onSuccess = () => {
    callToastAccordingToBeers();
    clearValues();
    setTotalNumberOfCans(0);
    setTotalNumberOfBottles(0);
    setTotalNumberOfPacks(0);
  }
  
  
  
  
  return (
   <Container maxW={"1200px"} w={"full"} >

     {/* Navigation for the webApp */}
    <Flex justifyContent={"space-between"} alignItems={"center"} py={"20px"} height={"80px"} borderBottom={"2px"}>

      <Box>
        <Text fontSize={"2xl"}  fontStyle={"italic"} fontWeight={"bold"}> Buy Me a Beer</Text>
      </Box>

      <ConnectWallet theme="light" className={styles.connectWalletBtn}/>

    </Flex>

    {/* BODY OF THE WEBAPP  */}
    <SimpleGrid columns={{md: 1, lg: 2}} spacingX={10} spacingY={7} mt={"40px"} >


      {/* LEFT/UPPER SIDE OF THE WEBSITE  */}
      <Box className={styles.leftColumn}>
          <Card >
            <CardBody>

                <Heading mb={"20px"}> Buy me a Beer</Heading>

                <Flex direction={"row"}>
                  <Text> Total Beers Chugged   </Text>
                  <Image pl={'2px'} boxSize="25px" src="../icon.png"/>
                  
                  <Skeleton isLoaded={!loadingTotalBeers} width={"20px"} ml={"5px"} >
                    : {totalBeers?.toString()} 
                  </Skeleton>
                 
                </Flex>

                

                <Text fontSize={"2xl"} py={"10px"}>Name: </Text>
                <Input focusBorderColor={"black"} className={styles.input} placeholder="Shakti" maxLength={20} value={name} onChange={handleNameChange}/>
                
                <Text fontSize={"2xl"} py={"10px"}> Message: </Text>
                <Input focusBorderColor={"black"} className={styles.input}  placeholder="wagmi" maxLength={100} value={message} onChange={handleMessageChange}/>
                

                {/* ################# TYPE AND NUMBER OF BEERS ################# */}
                <Box mt={"20px"}>
                                   
                  <Flex wrap={"wrap"} justify={"center"} gap={"50px"}>


                  {/* BeerCan  */}
                  <Flex direction={"column"} align={"center"} gap={"10px"}>
 
                    <Box as='button' onClick={() => incrementBeerCan()}>
                      <Image  src="../beerCan.png" boxSize={"45px"}/>            
                    </Box>

                    {/* Number of Beers  */}
                    <Flex direction={"row"} align={"center"} gap={"10px"}> 
                    
                    <Button className={styles.beerButtons} onClick={() => incrementBeerCan()} size={"xs"} >+</Button>
                    <Box><Text fontWeight={"bold"} fontSize={"md"}>{totalNumberOfCans}</Text></Box>
                    <Button className={styles.beerButtonsDec} onClick={() => decrementBeerCan()} size={"xs"}>-</Button>

                    </Flex>

                    <Box>
                      {totalNumberOfCans === 0 ? (<Box display={'flex'} justifyContent={"center"} className={styles.totalBox}> 0.01 Ether</Box>)
                       :(<Box display={'flex'} justifyContent={"center"} className={styles.totalBoxPrice}>{totalAmountOfCans}</Box>)}                      
                    </Box>

                  </Flex>

                  {/* BeerBottle  */}
                  <Flex direction={"column"} align={"center"} gap={"10px"}>
 
                    <Box as='button' onClick={() => incrementBeerBottle()}>
                      <Image  src="../beerBottle.png" boxSize={"45px"}/>            
                    </Box>

                    {/* Number of Beers  */}
                    <Flex direction={"row"} align={"center"} gap={"10px"}> 
                    
                    <Button className={styles.beerButtons} onClick={() => incrementBeerBottle()} size={"xs"} >+</Button>
                    <Box><Text fontWeight={"bold"} fontSize={"md"}>{totalNumberOfBottles}</Text></Box>
                    <Button className={styles.beerButtonsDec} onClick={() => decrementBeerBottle()} size={"xs"}>-</Button>

                    </Flex>

                    <Box>
                      {totalNumberOfBottles === 0 ? (<Box display={'flex'} justifyContent={"center"} className={styles.totalBox}> 0.05 Ether</Box>)
                       :(<Box display={'flex'} justifyContent={"center"} className={styles.totalBoxPrice}>{totalAmountOfBottles}</Box>)}                      
                    </Box>
                    
                  </Flex>

                  {/* BeerPack  */}
                  <Flex direction={"column"} align={"center"} gap={"10px"}>
 
                    <Box as='button' onClick={() => incrementBeerPack()}>
                      <Image  src="../beerBox.png" boxSize={"45px"}/>            
                    </Box>

                    {/* Number of Beers  */}
                    <Flex direction={"row"} align={"center"} gap={"10px"}> 
                    
                    <Button className={styles.beerButtons} onClick={() => incrementBeerPack()} size={"xs"} >+</Button>
                    <Box><Text fontWeight={"bold"} fontSize={"md"}>{totalNumberOfPacks}</Text></Box>
                    <Button className={styles.beerButtonsDec} onClick={() => decrementBeerPack()} size={"xs"}>-</Button>

                    </Flex>

                    <Box>
                      {totalNumberOfPacks === 0 ? (<Box display={'flex'} justifyContent={"center"} className={styles.totalBox}> 0.1 Ether</Box>)
                       :(<Box display={'flex'} justifyContent={"center"} className={styles.totalBoxPrice}>{totalAmountOfPacks}</Box>)}                      
                    </Box>
                    
                  </Flex>

                  </Flex>

                </Box>

                {/* Web 3 Button  */}
                <Flex mt={"20px"} justify={"center"} >

                 

                  {address ? (
                    
                    <Web3Button
                      contractAddress={contractAddress}
                      action={ async (contract) =>{
                         await contract.call("buyBeer", [name, message, totalNumberOfBeers], {value: ethers.utils.parseEther(totalAmount.toString())})
                      }}                       
                      className={styles.web3button}
                      onSuccess={() => onSuccess()}   
                    >
                      {`Pay ${totalAmount} `} 
                    </Web3Button>
                  ): (
                    <Text> Please Connect your Wallet</Text>
                  )}

                </Flex>
                

            </CardBody>
          </Card>
      </Box>
      
      {/* RIGHT/BOTTOM SIDE OF THE WEBSITE  */}
      <Box className={styles.rightColumn}>
       <Card maxH={"60vh"} overflow={"scroll"}>
        <CardBody>
           <Text fontWeight={"bold"}>Recent Messages: </Text>

           {!loadingRecentBeers ? (
            <Box >
              {
                recentBeers && recentBeers.map((beer, index) => {
                  return(
                    <Card key={index} my={"10px"}>
                      <CardBody className={styles.recentBeers}>
                        <Text casing={"capitalize"} fontSize={"2xl"}>{beer[1]}</Text>
                        <Text casing={"capitalize"}>{beer[2]}</Text>
                        <Text fontSize={"xx-small"} >Address: {beer[0]} </Text>

                      </CardBody>
                    </Card>
                  )
                })
              }
            </Box>
           ) : (
            <Stack>
              <Skeleton height={"100px"}></Skeleton>
              <Skeleton height={"100px"}></Skeleton>
              <Skeleton height={"100px"}></Skeleton>
            </Stack>
           )}
        </CardBody>
       </Card>
      </Box>


    </SimpleGrid>

    {/* FOOTER  */}
    <Flex alignItems={"center"} gap={"15px"} justifyContent={"right"} mt={"50px"} py={"10px"} borderTop={"2px"}  >

    <Link href="https://www.linkedin.com/in/dubeyshakti/" className={styles.footer__social_link}  isExternal>
        <i class="uil uil-linkedin-alt"></i>
    </Link>
    
    <Link href="https://twitter.com/shaktidubey_" className={styles.footer__social_link}  isExternal>
        <i class="uil uil-twitter-alt"></i>
    </Link>

    <Link href="https://github.com/shaktiiii" className={styles.footer__social_link}  isExternal>
        <i class="uil uil-github-alt"></i>
    </Link>

    <Link display={"flex"} alignItems={"center"} href='https://github.com/shaktiiii/BuyMeABeer' isExternal>
      View Code <ExternalLinkIcon mx='2px' />
    </Link>

    </Flex>
    

  

  

  
   </Container>
  );
}
