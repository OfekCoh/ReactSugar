const API_KEY = "already in the base";
const BASE_URL = "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=ILS&apikey=UUFWOP6OMZO2FT0Z";
//JSON PATH= $["Realtime Currency Exchange Rate"]["5. Exchange Rate"]

export const getShekelValue = async () => {
    const response = await fetch(`${BASE_URL}`);
    const data = await response.json();

    // Navigate the JSON structure based on the JSON path
    const exchangeRate = data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
    
    return parseFloat(exchangeRate); // return it as a number}
};

// ((sugar+twebtyfivepremia+hytels+switchp+delivery)*double.parse(dollarrate)/1000)