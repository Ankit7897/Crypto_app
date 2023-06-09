import { Avatar, Box, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import outher from '../assets/outher.jpg'

const Footer = () => {
    return (

        <Box bgColor={'blackAlpha.900'} color={"whiteAlpha.700"} minH={"48"} py={["16", "8"]}>
            <Stack direction={["column", "row"]} h={"full"} alignItems={"center"}>
                <VStack w={"full"} alignItems={["center", "flex-start"]}>

                    <Text fontWeight={"bold"}>About Us</Text>
                    <Text fontSize={"sm"} letterSpacing={"widest"} textAlign={["center", "left"]}>We are the best crypto app in India, we provide our gauidance at a very cheap price</Text>

                </VStack>

                <VStack>
                    <Avatar src={outher} boxSize={"20"} mt={["4", "0"]}></Avatar>
                    <Text>Our Founder</Text>
                </VStack>
            </Stack>
        </Box>
    )
}

export default Footer
