// variable holding my array which will later be turned into buttons
// and allow text input to be pushed into to create new search requests
let justiceLeague = ["Batman", "Superman", "Wonderwoman", "Green Lanter", "Flash","Hawk-Girl","Nightwing","Green Arrow","Aqua Man",];
// variables for the url and store the search input data and putting into the url so the
// returned results are relative
function displayGiphy() {
let heroes = $(this).attr("data-name");
let queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + heroes + "&api_key=oYURyvVVlGb1yJxJPwtjo9CzLSW1zXxq&limit=10";
console.log(displayGiphy);

$.ajax({ url: queryUrl, method: "GET"}).done(function(response) {
    $('.giphGoesHere').empty();
// for looping through the response 
    for (let i = 0; i < response.data.length; i++) {
// variable for retrieving response data and creating HTML elements to show it on the page
      let giphD = $('<div class="giphD">');
      let rating = response.data[i].rating;
      let ratingP = $('<p>').text("Rating: " + rating);
      let animated = response.data[i].images.fixed_height.url;
      let still = response.data[i].images.fixed_height_still.url;
      let giphI = $('<img class="gImage">');
// giving the above created img element attributes defined with variables containing response data
      giphI.attr('src', still);
      giphI.attr('data-still', still);
      giphI.attr('data-animate', animated);
      giphI.attr('data-state', 'still')
// appending the created <p> holding the rating and the <img> holding the gif to the above created <div>
// to store it all in
      giphD.append(ratingP);
      giphD.prepend(giphI);
// prepending(to the top) the <div> holding the gif and rating to a class(thats attached to an HTML element)
      $('.giphGoesHere').prepend(giphD);
    }
  });
};
// document on click function so that when the HTML element with the class gImage
// is clicked it will change its src and state allowing the gif to change from animated and still
$('.giphGoesHere').on("click", ".gImage", function() {
// variable  giving the HTMML element with the class of gImage an attribute of data-state
  let state = $(this).attr('data-state');
// if/else statement stating what should be done once the gif is clicked and then once it is clicked again
  if (state == 'still') {
    $(this).attr('src', $(this).data('animate'));
    $(this).attr('data-state', 'animate');}
  else {
    $(this).attr('src', $(this).data('still'));
    $(this).attr('data-state', 'still');
    }
  });
// function to create the buttons using the first created array to grab values from
function renderButtons() {
  $(".buttons-original").empty();
// for statement to loop through the array and make sure each item has a button created
  for (let i = 0; i < justiceLeague.length; i++) {
    let b = $('<button class="button">');
      b.addClass("justiceLeague");
      b.attr("data-name", justiceLeague[i]);
      b.text(justiceLeague[i]);
// appends created button to the html element
      $(".buttons-original").append(b);
  }
};
//  event handler for creating a new button when the submittal form is used
$(".add-giph").on("click", function(event){
// default action performed by event will not happen
  event.preventDefault();
// variable to store the the retrived value of the form(.val)
// and then removes white space(spaces) from the returned value(.trim)
  let giphs = $(".giph-name").val().trim();
  justiceLeague.push(giphs);
  renderButtons();
});
// calls the first created function of displayGiphy on click and targets
// the HTML element with the class of ogPokemon
$(document).on("click", ".justiceLeague", displayGiphy);
// calls the renderButtons function
renderButtons();
