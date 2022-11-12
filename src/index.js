import './style.css'

async function fetchData (country) {
  try {
    const rawData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}+&appid=6c6ad05549d59a3d691d1888c65dc8b3&units=metric`)
    const weatherData = await rawData.json()
    return weatherData
  } catch (err) {
    alert('sorry the api broke bro :(')
  }
}

function processData (country) {
  fetchData(country)
    .then(function(data){ 
      try {
        console.log(data)
        let temperature = Math.round(data.main.temp)
        let name = data.name
        let description = data.weather[0].description
        let feels = Math.round(data.main['feels_like'])
        let humidity = data.main.humidity
        let wind = data.wind.speed
        editDom(temperature, name, description, feels, humidity, wind)
      } catch {
        const error = document.querySelector('.error')
        error.style.display = 'block'
        setTimeout(()=>{
          error.style.display ='none'
        }, 2000)
      }
    })
}

function editDom (temperature, name, description, feels, humidity, wind) {
  const temperaturetext = document.querySelector('.temperature')
  const city = document.querySelector('.city')
  const describe = document.querySelector('.description')
  const feelslike = document.querySelector('.feelsLike')
  const humidtext = document.querySelector('.humidity')
  const windspeed = document.querySelector('.wind')
  temperaturetext.textContent = temperature
  temperaturetext.innerHTML += '<span class="symbol">°C</span>'
  city.textContent = name
  describe.textContent = description
  feelslike.textContent = 'FEELS LIKE: ' + feels + '°C'
  humidtext.textContent = 'HUMIDITY: ' + humidity + '%'
  windspeed.textContent = 'WIND SPEED: ' + wind + 'KM/H'
}


function inputEventListener() {
  const form = document.getElementById('form')
  form.addEventListener('submit', handleSubmit)
}
function handleSubmit (e) {
  e.preventDefault();
  const input = document.getElementById('input')
  const country = input.value
  processData(country)
  input.value = '';
}
inputEventListener();
fetchData('singapore');