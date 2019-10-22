$(document).ready(function(){
// Creating array of topics.
    const topics = ["csgo ", "league of legends ", "starcraft ", "minecraft ", "rocket league ", "dota ", "world of warcraft ", "hearthstone ", "yugioh ", "pokemon "];
// Function to create the btn.
    function renderButtons(){
        $("#buttons-here").empty(); // this way there won't be repeat buttons
// Creating loop for array.
        for(let i = 0; i < topics.length; i++){
            // creating buttons for individual buttons.
            let a = $("<buttons>");
                a.addClass("topics");
                a.attr("data-search", topics[i]);
                a.text(topics[i]);
                $("#buttons-here").append(a);
        }
    }
// Adding new buttons.
    $("#add-button").submit(function(event){
        event.preventDefault();
// Getting user data.
        let textBox = $("#input").val().trim();
        topics.push(textBox);
        renderButtons();
     // console.log(topics);
    });
    renderButtons();
// GIF function when button is clicked.
    $(document).on("click", ".topics", function(){
        let x = $(this).data("search");
     // console.log(x);
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=oYURyvVVlGb1yJxJPwtjo9CzLSW1zXxq&limit=10"
     // console.log(queryURL);
        $.ajax({url: queryURL,
                metho:"GET"}).then(function(response){
     // console.log(response);
                    for (let i = 0; i < response.data.length; i++){
                        $("#gifs-here").prepend("<p>Rating: " + response.data[i].rating + "</p>");
                        $("#gifs-here").prepend("<img src=' " + response.data[i].images.downsized.url + "'>'")
                    }
                })
    });
});