"use strict"

const cities = [
    {
        name: "Indianapolis, IN",
        latitude: 39.79303691145844,
        longitude: -86.15616806469983,
    },
    {
        name: "Anchorage, AK",
        latitude: 61.21793482390542,
        longitude: -149.9001050732621,
    },
    {
        name: "Lakewood, CO",
        latitude: 39.70575114953082,
        longitude: -105.07640240770799,
    },
    {
        name: "San Diego, CA",
        latitude: 32.71625905082917,
        longitude: -117.14922117142818,
    },
    {
        name: "Chicago, IL",
        latitude: 41.88008156569595,
        longitude: -87.64560046813689,
    }

]
// 1. Populate city select element with city names from the city array above.
// 2. onchange event handler which finds the latitude & longitude for selected city 
// 3. fetch(`https://api.weather.gov/points/${latitude},${longitude}`)
// 4. Then get the forecast URL using "data.properties.forecast"
//                                 or "data.properties.forecastHourly"
// 5. fetch(data.properties.forecastHourly)
// 6. Loop through the array of forecast periods (data.properties.periods)
// 7. Display a forecast for each forecast period.

window.onload = function (_event) {
    const citiesSelect = document.getElementById("city")
    citiesSelect.onchange = handleCityChange

    populateCities(citiesSelect, cities)
}

function populateCities(citiesSelect, cities) {
    let html = ""
    for (let index = 0; index < cities.length; index += 1) {
        const currentCity = cities[index]
        html += `<option value="${currentCity.latitude},${currentCity.longitude}">${currentCity.name}</option>`
       
    }
    citiesSelect.innerHTML += html
}

function handleCityChange(event) {
    const coordinates = event.target.value
    console.log(coordinates)
    fetch(`https://api.weather.gov/points/${coordinates}`)
        .then(response => response.json())
        .then(data => getForecast(data.properties.forecast))
}

function getForecast(forecastURL){
    fetch(forecastURL)
        .then(response => response.json())
        .then(data => renderForecastCards(data.properties.periods))
        
}

function renderForecastCards (forecastPeriods) {
    let html = ""
    for(let index = 0; index < forecastPeriods.length; index += 1) {
        const currentForecast = forecastPeriods[index]
        html += `<div class="card">
        <h1>${currentForecast.temperature}</h1>
                <h2>${currentForecast.name}</h2>
                <h3>${currentForecast.detailedForecast}</h3>
                <h4>${currentForecast.temperatureUnit}</h4>
                <div class="card">
                `
        //html += `<option value="${currentForecast.temperature},${currentForecast.temperature}"</option>` 
    }
    const resultsDiv = document.getElementById("forecastResults")
    resultsDiv.innerHTML = html
}

//function createForecastCard (forecast) {
 //   return `
  //      <h3>${forecast.temperature}</h3>
   // `
//}

    

