import './style.css'

async function fetchData (country) {
  try {
    const rawData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}+&appid=6c6ad05549d59a3d691d1888c65dc8b3`)
    const weatherData = await rawData.json()
    //  handle no response
    if (weatherData.cod === '404') { alert('nope') }
    return weatherData
  } catch (err) {
    console.log(err, 'bingbong')
  }
}

function processData() {
    fetchData('Singapore')
    .then(data=>console.log(data))
}

console.log(processData())
