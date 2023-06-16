import React from "react"
import backgroundImage from '../assets/resort-bg1.png'
import { Box, Text } from '@chakra-ui/react'



function Hero() {
  return (
    <Box
      display={'flex'}
      alignItems={'flex-start'}
      justifyItems={'flex-start'}
      backgroundImage={backgroundImage}
      backgroundSize={'cover'}
      backgroundPosition={'center'}
      backgroundRepeat={'no-repeat'}
      minHeight={`calc(100vh - 100px)`}
    >
      <Box

        borderRadius={15}
        width={800}
        padding={{ base: 50, md: 20}}
        margin={{base: "80px 60px", md: "160px 180px"}}
        backgroundColor={'gray.900'}
        opacity={'0.7'}
      >
        <Text color={'whiteAlpha.900'} mb={4} fontWeight={'500'}>
          Welcome to the ski resorts information page! Select Resorts to see a list of all the resorts in the world (this can take a bit of time on first load.), and some general information. Search by continent, country or name. 
        </Text>
        <Text color={'whiteAlpha.900'} mb={4} fontWeight={'500'}>
          Click on resort information to see specific information on that resort, including pistes, no. of restaurants and bars, lifts and runs. 
        </Text>
        <Text color={'whiteAlpha.900'} mb={8} fontWeight={'500'}>
          Feel free to make an account and save some resorts to your favorites to come back to later. 
        </Text>
        <Text color={'whiteAlpha.900'} fontWeight={'500'}>
          Enjoy and happy resort hunting!  
        </Text>

      </Box>
    </Box>

  )
}

export default Hero