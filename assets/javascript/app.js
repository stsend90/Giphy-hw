let justiceLeague = ["Batman", "Superman", "Wonderwoman", "Green Lanter", "Flash", "Robbin", "Nightwing", "Green Arrow", "Aqua Man",];

function displayGiphy() {
let heroes = $(this).attr("data-name");
let queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + heroes + "&api_key=oYURyvVVlGb1yJxJPwtjo9CzLSW1zXxq&limit=10";
console.log(displayGiphy);

$.ajax({ url: queryUrl, method: "GET"}).done(function(response) {
    $('.giphGoesHere').empty();

    for (let i = 0; i < response.data.length; i++) {

      let giphD = $('<div class="giphD">');
      let rating = response.data[i].rating;
      let ratingP = $('<p>').text("Rating: " + rating);
      let animated = response.data[i].images.fixed_height.url;
      let still = response.data[i].images.fixed_height_still.url;
      let giphI = $('<img class="gImage">');

      giphI.attr("src", still);
      giphI.attr("data-still", still);
      giphI.attr("data-animate", animated);
      giphI.attr("data-state", still)

      giphD.append(ratingP);
      giphD.prepend(giphI);

      $('.giphGoesHere').prepend(giphD);
    }
  });
};

$('.giphGoesHere').on("click", ".gImage", function() {

  let state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).data("animate"));
    $(this).attr("data-state", "animate");}
  else {
    $(this).attr("src", $(this).data("still"));
    $(this).attr("data-state", "still");
    }
  });

function renderButtons() {
  $(".buttons-original").empty();

  for (let i = 0; i < justiceLeague.length; i++) {
    let b = $("<button class='button'>");
      b.addClass("justiceLeague");
      b.attr("data-name", justiceLeague[i]);
      b.text(justiceLeague[i]);

      $(".buttons-original").append(b);
  }
};

$(".add-giph").on("click", function(event){
  event.preventDefault();
  let giphs = $(".giph-name").val().trim();
  justiceLeague.push(giphs);
  renderButtons();
});

$(document).on("click", ".justiceLeague", displayGiphy);
renderButtons();
