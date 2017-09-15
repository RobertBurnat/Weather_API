var CORS_URL = "https://cors-anywhere.herokuapp.com/",
    BASE_URL = "https://www.metaweather.com",
    LOCATION_SEARCH_URL = BASE_URL + "/api/location/search/?query=",
    LOCATION_URL = BASE_URL + "/api/location/";

function getWoeid(city) {
  $.ajax({
    url: CORS_URL + LOCATION_SEARCH_URL + city,
    method: 'GET',
    success: function(data) {
      if (data && data.length) {
        var woeid = data[0].woeid;
        $('#woeid').text(woeid);
        getWeather(woeid);
      } else {
        alert('Nieobsługiwane miasto');
      }
    }
  });
}

function getWeather(woeid) {
  $.ajax({
    url: CORS_URL + LOCATION_URL + woeid,
    method: "GET",
    success: function(data) {
      var result = '';
      data.consolidated_weather.forEach(function(item) {
        result += '\
          <tr> \
            <td>' + item.applicable_date + '</td> \
            <td>' + Math.round(item.max_temp) + '</td> \
            <td>' + Math.round(item.min_temp) + '</td> \
            <td>' + item.weather_state_name + '</td> \
          </tr> \
        ';
      });
      
      $('#data').find('tbody').empty().append(result);
    }
  })
}
  
$('#get').click(function() {
  var cityName = $('#city').val();
  
  if (cityName) {
    getWoeid(cityName);
  }
});