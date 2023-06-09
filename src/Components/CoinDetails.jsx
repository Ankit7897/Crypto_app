import { Box, Container, RadioGroup, HStack, Radio, VStack, Text, Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { server } from '../main'
import Chart from './Chart'

const CoinDetails = () => {

    const params = useParams();

    const [coin, setCoin] = useState({})
    const [loding, setLoding] = useState(true)
    const [error, setError] = useState(false)
    const [currency, setCurrency] = useState("inr")
    const [days, setdays] = useState("24h");
    const [chartArray, setchartArray] = useState([])

    const currencySymbol = currency === "inr" ? " ₹" : currency === "eur" ? "€" : "$"
    const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"]

    const switchChartStats = (key) => {

        switch (key) {
            case "24h":
                setdays("24h")
                setLoding(true)
                break;

            case "7d":
                setdays("7d")
                setLoding(true)
                break;

            case "14d":
                setdays("14d")
                setLoding(true)
                break;

            case "30d":
                setdays("30d")
                setLoding(true)
                break;

            case "60d":
                setdays("60d")
                setLoding(true)
                break;

            case "200d":
                setdays("200d")
                setLoding(true)
                break;

            case "1y":
                setdays("1y")
                setLoding(true)
                break;

            case "max":
                setdays("max")
                setLoding(true)
                break;





            default:
                setdays("24h")
                setLoding(true)
                break;
        }

    }


    useEffect(() => {
        const fetchCoins = async () => {

            try {
                const { data } = await axios.get(`${server}/coins/${params.id}`)

                const { data: chartData } = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
                setCoin(data);
                setchartArray(chartData.prices)
                setLoding(false);
            } catch (error) {
                setError(true)
                setLoding(false)
            }
        }
        fetchCoins()
    }, [params.id, currency, days])

    if (error) return <ErrorComponent message={"Error while feching Coins"} />

    return (
        <Container maxW={"container.xl"}>
            {
                loding ? (<Loader />) : (<>

                    <Box width={"full"} borderWidth={1}><Chart
                        arr={chartArray}
                        currency={currencySymbol}
                        days={days} /></Box>

                    <HStack p={'4'} overflowX={"auto"}>
                        {
                            btns.map((i) => (
                                <Button disabled={days === i} key={i} onClick={() => switchChartStats(i)}>{i}</Button>
                            ))

                        }
                    </HStack>

                    <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
                        <HStack spacing={"4"}>
                            <Radio value={'inr'}>INR</Radio>
                            <Radio value={'usd'}>USD</Radio>
                            <Radio value={'eur'}>EUR</Radio>
                        </HStack>
                    </RadioGroup>

                    <VStack spacing={"4"} p="16" alignItems={"flex-start"}>
                        <Text fontSize={"small"} alignSelf="center" opacity={"0.7"}>Last updeted on{" "} {Date(coin.market_data.last_updated).split("G")[0]}</Text>

                        <Image src={coin.image.large} w={"16"} h={"16"} objectFit={"contain"} />
                        <Stat>
                            <StatLabel>{coin.name}</StatLabel>
                            <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
                            <StatHelpText>
                                <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"} />
                                {coin.market_data.price_change_percentage_24h}%
                            </StatHelpText>
                        </Stat>
                        <Badge fontSize={"2xl"} bgColor={"blackAlpha.800"} color={"white"}>{`# ${coin.market_cap_rank}`}</Badge>

                        <CustomBar high={`${currencySymbol} ${coin.market_data.high_24h[currency]}`}
                            low={`${currencySymbol} ${coin.market_data.low_24h[currency]}`} />

                        <Box w={"full"} p="4">
                            <Iteme title={"Max Supply"} value={coin.market_data.max_supply} />
                            <Iteme title={"Circulating Supply"} value={coin.market_data.circulating_supply} />

                            <Iteme title={"Market Cap"} value={`${currencySymbol} ${coin.market_data.market_cap[currency]}`} />
                            <Iteme title={"All time high"} value={`${currencySymbol} ${coin.market_data.ath[currency]}`} />
                            <Iteme title={"All time low"} value={`${currencySymbol} ${coin.market_data.atl[currency]}`} />
                        </Box>
                    </VStack>


                </>
                )
            }

        </Container >
    )
}

const Iteme = ({ title, value }) => (
    <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
        <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>{title}</Text>
        <Text>{value}</Text>
    </HStack>
)

const CustomBar = ({ high, low }) => (
    <VStack w={"full"}>
        <Progress value={50} colorScheme={"teal"} w={"full"} />
        <HStack justifyContent={"space-between"} w={"full"}>
            <Badge children={low} colorScheme={"red"} />
            <Text fontSize={"sm"}>24H Range</Text>
            <Badge children={high} colorScheme={"green"} />
        </HStack>
    </VStack>
)

export default CoinDetails
