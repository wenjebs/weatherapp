import './style.css'

async function fetchData (country) {
  try {
    const rawData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}+&appid=6c6ad05549d59a3d691d1888c65dc8b3`)
    const weatherData = await rawData.json()
    //  handle no response
    if (weatherData.cod === '404') { alert('nope') }
    return weatherData
  } catch (err) {
    alert('sorry the api broke bro :(')
  }
}

function processData (country) {
  fetchData(country)
    .then(data => console.log(data))
}

function handleSubmit (e) {
  e.preventDefault();
  const input = document.getElementById('input')
  const country = input.value
  processData(country)
  input.value = '';
}
function inputEventListener() {
  const form = document.getElementById('form')
  form.addEventListener('submit', handleSubmit)
}

inputEventListener();