const axios = require("axios");


const getWeather = async function (req, res) {
  try {
    let options = {
      method: "get",
      url: "http://api.openweathermap.org/data/2.5/weather?q=London&appid=4c020f7bc07445a9f4a76e81988c06da",
    };
    const london = await axios(options);

    let city = london.data
    res.status(200).send({ msg: "Successfully fetched data", data: city });

  }
  catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "Some error occured" });
  }

};




const cityTemp = async function (req, res) {

  try {
    let city = ["Bangalore", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
    let arr = [];
    for (let i = 0; i < city.length; i++) {

      let options = {
        method: "get",
        url: `http://api.openweathermap.org/data/2.5/weather?q=${city[i]}&appid=4c020f7bc07445a9f4a76e81988c06da` 
      }
      let response = await axios(options)
      console.log(response.data.main.temp)

      arr.push({ "city": city[i], "temp": response.data.main.temp })
    }
    let sortCities = arr.sort(function (a, b) { return a.temp - b.temp })
    console.log(sortCities)
    res.status(200).send({ status: true, data: sortCities })

  }

  catch (err) {
    console.log(err.message)
    res.status(500).send({ msg: "Something went wrong" })
  }
}





module.exports.getWeather = getWeather;
module.exports.cityTemp = cityTemp;
