import { GET } from "./APIMethods";


const getAllCryptoList = () =>{
     const apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
    return GET(apiUrl)
}

const getAllCryptoListIconDetails = (coinId:string) => {
     return GET(`https:api.coingecko.com/api/v3/coins/${coinId}?localization=true&tickers=true&market_data=true`);
}

export {getAllCryptoList,getAllCryptoListIconDetails}