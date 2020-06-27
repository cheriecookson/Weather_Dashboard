// // Create a function called `myFunction()`
// function myFunction() {
//     // Create a variable called `searchTerm` that will use `document.querySelector()` to target the `id` of the input
//     // Use `.value` to capture the value of the input and store it in the variable
//     var searchTerm = document.querySelector('#searchTerm').value;
  
//     // Make a `fetch` request concatenating the `searchTerm` to the query URL
//     // Remember to add your API key at the end
//     fetch(
//       'https://api.giphy.com/v1/gifs/search?q=' +
//         searchTerm +
//         '&api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FN&limit=1'
//     )
//       .then(function(response) {
//         return response.json();
//       })
//       .then(function(response) {
//         console.log(response.data[0]);
//         // Create a variable that will select the <div> where the GIF will be displayed
//         var responseContainerEl = document.querySelector('#response-container');
  
//         // Empty out the <div> before we append a GIF to it
//         responseContainerEl.innerHTML = '';
  
//         var gifImg = document.createElement('img');
//         gifImg.setAttribute('src', response.data[0].images.fixed_height.url);
  
//         // Append 'gifImg' to the <div>
//         responseContainerEl.appendChild(gifImg);
//       });
//   }
  

  function rendereditEvents(list, id) {
    $('#editEvents'+ id).empty();
    for (var i = 0; i < list.length; i++) {
      var editEventItem = $(' <p> ');
      editEventItem.text(list[i]);
      // var editEventClose = $('<button>');
      // editEventClose.attr('data-event', i);
      // editEventClose.attr('value', id);
      // editEventClose.addClass('checkbox');     
      // editEventClose.text(' X ');
      // editEventItem = editEventItem.prepend(editEventClose);
      $('#editEvents'+ id).append(editEventItem);
    }
  }
  $('.container-fluid').on('click',".add-editEvent", function(event) {
    event.preventDefault();
    var id  = event.target.value;
    console.log(id);
    var editEventTask = $('#editEvent' + id)
      .val()
      .trim();
var list = JSON.parse(localStorage.getItem(id)) || [];
    list.push(editEventTask);
    rendereditEvents(list, id);
    localStorage.setItem(id, JSON.stringify(list));      
    $('#editEvent'+ id).val('');
  });

  $(document).on('click', '.checkbox', function() {    
      var editEventNumber = $(this).attr('data-event');
      var id  = event.target.value;
      var list = JSON.parse(localStorage.getItem(id)) || [];
      console.log(editEventNumber);
      list.splice(editEventNumber, 1);
      rendereditEvents(list, id);
      localStorage.setItem(id, JSON.stringify(list));
    });
    
    for (var i = 9; i <= 17; i++) {
        var list = JSON.parse(localStorage.getItem(i)) || [];
        rendereditEvents(list, i);
    }
    