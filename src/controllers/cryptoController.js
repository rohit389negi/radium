const axios = require("axios");
const cryptoModel= require("../models/cryptoModel.js")

const getCryptoList = async function (req, res) {
  try {
    let options = {
      method: "get",
      url: "https://api.coincap.io/v2/assets",
    };
    const currencyList = await axios(options);
    
    const coinsData = currencyList.data.data;     
     for(i in coinsData) {    
      let coins = {
        symbol: coinsData[i].symbol,
        name: coinsData[i].name,
        marketCapUsd: coinsData[i].marketCapUsd,
        priceUsd: coinsData[i].priceUsd,
        changePercent24Hr: coinsData[i].changePercent24Hr
      };  
        await cryptoModel.findOneAndUpdate({symbol: coinsData[i].symbol }, coins,{ upsert: true, new: true} );
    }
        coinsData.sort(function(a,b) {return (b.changePercent24Hr - a.changePercent24Hr);
    });
    res.status(200).send({ status: true, data: coinsData });
  } 

  catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "Some error occured" });
  }
};




module.exports.getCryptoList= getCryptoList



