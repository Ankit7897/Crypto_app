import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../main'
import { Button, Container, HStack, Radio, RadioGroup } from '@chakra-ui/react'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent'
import CoinCards from './CoinCards'

const Coins = () => {

    const [coins, setCoins] = useState([])
    const [loding, setLoding] = useState(true)
    const [error, setError] = useState(false)
    const [page, setPage] = useState(1)
    const [currency, setCurrency] = useState("inr")

    const currencySymbol = currency === "inr" ? " ₹" : currency === "eur" ? "€" : "$"
    const changePage = (page) => {
        setPage(page)
        setLoding(true)
    }
    const btn = new Array(132).fill(1)

    useEffect(() => {
        const fetchCoins = async () => {

            try {
                const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
                setCoins(data);
                setLoding(false);
            } catch (error) {
                setError(true)
                setLoding(false)
            }
        }
        fetchCoins()
    }, [currency, page])

    if (error) return <ErrorComponent message={"Error while feching Coins"} />
    return (

        <Container maxW={"container.xl"}>{loding ? (<Loader />) : (<>

            <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
                <HStack spacing={"4"}>
                    <Radio value={'inr'}>INR</Radio>
                    <Radio value={'usd'}>USD</Radio>
                    <Radio value={'eur'}>EUR</Radio>
                </HStack>
            </RadioGroup>

            <HStack wrap={"wrap"} justifyContent={"space-evenly"}>

                {

                    coins.map((i) => (
                        <CoinCards id={i.id} key={i.id} name={i.name} img={i.image} price={i.current_price
                        } symbol={i.symbol} currencySymbol={currencySymbol} />
                    ))
                }

            </HStack>
            <HStack w={"full"} overflow={"auto"} p={"8"}>

                {
                    btn.map((item, index) => (
                        <Button key={index} bgColor={"blackAlpha.900"} color={"white"} onClick={() => changePage(index + 1)}>{index + 1}</Button>
                    ))
                }
            </HStack>
        </>)}</Container>
    )
}

export default Coins

