
function myFunction() {
    var citySearch = document.querySelector('#citySearch').value;
    $("#today").text(moment().format('(MM/DD/YYYY)'));
    var day1 = moment().add(1, 'day').format('(MM/DD/YYYY)');
    console.log(day1);
    

    fetch(
      'http://api.openweathermap.org/data/2.5/forecast?q=' +
      citySearch + '&units=imperial&appid=46619697f21a244c99d30c9c97e0ff6c'
    )
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      var temp = response.list[0].main.temp;
        $("#tempToday").text(temp);
      var humidity = response.list[0].main.humidity;
        $("#humidityToday").text(humidity);
      var windSpeed = response.list[0].wind.speed;
        $("#windSpeedToday").text(windSpeed); 
      var cityLat = response.city.coord.lat;       
      var cityLon = response.city.coord.lon;
      var cityName = response.city.name;
        $("#cityNameResult").text(cityName);
      var icon = response.list[0].weather[0].icon;
      var iconLink = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        $("#iconToday").attr('src', iconLink);

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

//   function rendereditEvents(list, id) {
//     $('#editEvents'+ id).empty();
//     for (var i = 0; i < list.length; i++) {
//       var editEventItem = $(' <p> ');
//       editEventItem.text(list[i]);
//       // var editEventClose = $('<button>');
//       // editEventClose.attr('data-event', i);
//       // editEventClose.attr('value', id);
//       // editEventClose.addClass('checkbox');     
//       // editEventClose.text(' X ');
//       // editEventItem = editEventItem.prepend(editEventClose);
//       $('#editEvents'+ id).append(editEventItem);
//     }
//   }
//   $('.container-fluid').on('click',".add-editEvent", function(event) {
//     event.preventDefault();
//     var id  = event.target.value;
//     console.log(id);
//     var editEventTask = $('#editEvent' + id)
//       .val()
//       .trim();
// var list = JSON.parse(localStorage.getItem(id)) || [];
//     list.push(editEventTask);
//     rendereditEvents(list, id);
//     localStorage.setItem(id, JSON.stringify(list));      
//     $('#editEvent'+ id).val('');
//   });

//   $(document).on('click', '.checkbox', function() {    
//       var editEventNumber = $(this).attr('data-event');
//       var id  = event.target.value;
//       var list = JSON.parse(localStorage.getItem(id)) || [];
//       console.log(editEventNumber);
//       list.splice(editEventNumber, 1);
//       rendereditEvents(list, id);
//       localStorage.setItem(id, JSON.stringify(list));
//     });
    
//     for (var i = 9; i <= 17; i++) {
//         var list = JSON.parse(localStorage.getItem(i)) || [];
//         rendereditEvents(list, i);
//     }
    