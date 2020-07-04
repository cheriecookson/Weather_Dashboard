var cityList = JSON.parse(localStorage.getItem("cityList")) || ["denver", "taos", "miami"];
function cities(arr) {
  $("#searchList").empty();
  for (var i = 0; i < arr.length; i++) {
    var li = $("<li>");
    li.attr("class", "list-group-item cityList");
    var city = arr[i].split("");
    city[0] = city[0].toUpperCase();
    li.text(city.join(""));
    $("#searchList").append(li);
  }
}
cities(cityList);

$("#searchList").on("click", ".cityList", function(event) {
  console.log($(this).text());
  apiFunc($(this).text().toLowerCase());
});

function apiFunc(citySearch) {
  if (!cityList.includes(citySearch)) {
    cityList.push(citySearch.toLowerCase());
    localStorage.setItem("cityList", JSON.stringify(cityList));
    cities(cityList);
  }
  
  $("#today").text(moment().format('(MM/DD/YYYY)'));
  // var addDay = (1++, 'day');
  $("#timeDay1").text(moment().add(1, 'day').format('MM/DD/YYYY'));
  $("#timeDay2").text(moment().add(2, 'day').format('MM/DD/YYYY'));
  $("#timeDay3").text(moment().add(3, 'day').format('MM/DD/YYYY'));
  $("#timeDay4").text(moment().add(4, 'day').format('MM/DD/YYYY'));
  $("#timeDay5").text(moment().add(5, 'day').format('MM/DD/YYYY'));

  fetch(
    'http://api.openweathermap.org/data/2.5/forecast?q=' +
    citySearch + '&units=imperial&appid=46619697f21a244c99d30c9c97e0ff6c'
  )
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
      $("#tempToday").text(response.list[0].main.temp);
      $("#tempDay1").text(response.list[1].main.temp);

      $("#humidityToday").text(response.list[0].main.humidity);
      $("#humidityDay1").text(response.list[1].main.humidity);

      $("#windSpeedToday").text(response.list[0].wind.speed); 
    var cityLat = response.city.coord.lat;       
    var cityLon = response.city.coord.lon;
      $("#cityNameResult").text(response.city.name);
    var icon = response.list[0].weather[0].icon;
       $("#iconToday").attr('src', "http://openweathermap.org/img/wn/" + icon + "@2x.png");
    var iconDay1 = response.list[1].weather[0].icon;
       $("#iconDay1").attr('src', "http://openweathermap.org/img/wn/" + iconDay1 + "@2x.png");   

      // for (var i = 1; i <= 5; i++) {  

fetch(
  'http://api.openweathermap.org/data/2.5/uvi/forecast?appid=46619697f21a244c99d30c9c97e0ff6c&lat=' + 
  cityLat + '&lon=' + cityLon + '&cnt=0'
)
.then(function(responseUV) {
  return responseUV.json();
})
.then(function(responseUV) {
  var uvIndex = responseUV[0].value;
  $("#uvIndexToday").text(uvIndex);
  
  if (uvIndex < 3) {
    $("#uvIndexToday").addClass("bg-success");
  } else if (uvIndex > 2 && uvIndex < 6) {
    $("#uvIndexToday").addClass("bg-warning");
  } else if (uvIndex > 5 && uvIndex < 8) {
    $("#uvIndexToday").addClass("orange");
  } else if (uvIndex > 7 && uvIndex < 11) {
    $("#uvIndexToday").addClass("bg-danger");
  } else {
    $("#uvIndexToday").addClass("purple");
  }  
});

// Loop for 5 Day Forecast goes here... Date, icon, temp, humidity

});

}

function myFunction() {
    var citySearch = document.querySelector('#citySearch').value;
    apiFunc(citySearch);
}