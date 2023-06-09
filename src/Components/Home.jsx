import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import pic from "../assets/pic3.png"

const Home = () => {
    return (
        <Box bgColor={"blackAlpha.800"} w={"full"} h={"85vh"}>
            <Image src={pic} w={"full"} h={"full"} objectFit={"contain"} />
            <Text fontSize={"6xl"} textAlign={"center"} fontWeight={"thin"} color={"whiteAlpha.800"} mt={"-20"}>Xcrypto</Text>
        </Box>
    )
}

export default Home
