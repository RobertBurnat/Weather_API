const CORS_URL = "https://cors-anywhere.herokuapp.com/",
      BASE_URL = "https://www.metaweather.com",
      LOCATION_SEARCH_URL = `${BASE_URL}/api/location/search/?query=`,
      LOCATION_URL = `${BASE_URL}/api/location/`,
      ICON_URL = `${BASE_URL}/static/img/weather/`;

async function getWoeid(city) {
    try {
        const result = await fetch(`${CORS_URL}${LOCATION_SEARCH_URL}${city}`);
        const data = await result.json();
        if(data && data.length) {
            let woeid = data[0].woeid;
            document.querySelector('#woeid').textContent = woeid;
            getWeather(woeid);
        } else {
            alert('Nieobsługiwane miasto');
            let cityName = document.querySelector('#city');
            cityName.value = '';
            cityName.focus();
        }
    } catch(error) {
        alert(error);
    }
}

async function getWeather(woeid) {
    try {
        const result = await fetch(`${CORS_URL}${LOCATION_URL}${woeid}`);
        const data = await result.json();
        let display = '';
        data.consolidated_weather.forEach(item => {
            display += `
            <tr>
                <td>${item.applicable_date}</td>
                <td>${Math.round(item.min_temp)}</td>
                <td>${Math.round(item.max_temp)}</td>
                <td><img src="${ICON_URL}${item.weather_state_abbr}.svg" style="width:32px"></td>
                <td>${item.weather_state_name}</td>
            </tr>
            `;
        });

        let insertToHTML = document.querySelector('#data').tBodies[0];
        insertToHTML.textContent = '';
        insertToHTML.insertAdjacentHTML('beforeend', display);
    } catch(error) {
        alert(error);
    }
};

document.querySelector('#get').addEventListener('click', () => {
   let cityName = document.querySelector('#city').value;
    if(cityName) {
        getWoeid(cityName);
    } else {
        cityName = document.querySelector('#city');
        cityName.checkValidity();
        cityName.reportValidity(); 
    }
});