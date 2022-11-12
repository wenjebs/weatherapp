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
    .then(function (data) {
      try {
        console.log(data)
        const temperature = Math.round(data.main.temp)
        const name = data.name
        const description = data.weather[0].description
        const feels = Math.round(data.main.feels_like)
        const humidity = data.main.humidity
        const wind = data.wind.speed
        const imgcode = data.weather[0].icon
        editDom(temperature, name, description, feels, humidity, wind, imgcode)
      } catch {
        const error = document.querySelector('.error')
        error.style.display = 'block'
        if (error.classList.contains('fade-in2')) {
          error.classList.remove('fade-in2');
          error.offsetWidth;
          error.classList.add('fade-in2');
        } else {
          error.classList.add('fade-in2');
        }
        setTimeout(() => {
          error.style.display = 'none'
        }, 5000)
      }
    })
}

function editDom (temperature, name, description, feels, humidity, wind, imgcode) {
  const weathercontainer = document.querySelector('.weather-data')
  const temperaturetext = document.querySelector('.temperature')
  const city = document.querySelector('.city')
  const describe = document.querySelector('.description')
  const feelslike = document.querySelector('.feelsLike')
  const humidtext = document.querySelector('.humidity')
  const windspeed = document.querySelector('.wind')
  const img = document.getElementById('weatherimg')
  temperaturetext.textContent = temperature
  temperaturetext.innerHTML += '<span class="symbol">°C</span>'
  city.textContent = name
  describe.textContent = description
  feelslike.textContent = 'FEELS LIKE: ' + feels + '°C'
  humidtext.textContent = 'HUMIDITY: ' + humidity + '%'
  windspeed.textContent = 'WIND SPEED: ' + wind + 'KM/H'
  img.src = `https://openweathermap.org/img/wn/${imgcode}.png`
  if (weathercontainer.classList.contains('fade-in2')) {
    weathercontainer.classList.remove('fade-in2');
    weathercontainer.offsetWidth;
    weathercontainer.classList.add('fade-in2');
  } else {
    weathercontainer.classList.add('fade-in2');
  }
}

function inputEventListener () {
  const form = document.getElementById('form')
  form.addEventListener('submit', handleSubmit)
}
function handleSubmit (e) {
  e.preventDefault()
  const input = document.getElementById('input')
  const country = input.value
  processData(country)
  input.value = ''
}
inputEventListener()
fetchData('singapore')
