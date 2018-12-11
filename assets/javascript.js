$(document).ready(function() {

//Initial array of buttons
var teamsArray = ["Kansas City Chiefs", "Los Angeles Rams", "Minnesota Vikings", "New England Patriots", "Phildelphia Eagles", "Green Bay Packers", "San Francisco 49ers", "Seattle Seahawks"];

//Displays array items as buttons
function displayArrayButtons() {
    $("#team-buttons").empty();
    for (var j = 0; j < teamsArray.length; j++) {
        var button = $("<button>");
        button.addClass("displayedButtons btn btn-light");
        button.attr("data-team", teamsArray[j]);
        button.text(teamsArray[j]);
        $("#team-buttons").append(button);
    }
}

//Sets new button from user input
$("#add-team").on("click", function(event) {
    event.preventDefault();
    var input = ("#teams-input").val().trim();
    teamsArray.push(input);
    console.log(input);
});

displayArrayButtons();

//Fetches gifs from the Giphy API
    var teamName = $(this).attr("data-team");
    limit = 10;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=7aG4b9imj3YrYLlVf4dY2PQ8a4aLIrIt";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        var gifData = response.data;

//Displays gifs pulled from Giphy API
    $("#teamGifs").empty();
    for (var i = 0; i < 10; i++) {
        var displayDiv = $("<div>");
        displayDiv.addClass("gif");

        var rating = gifData[i].rating;
        var displayRating = $("<p>").text("Rating: " + rating);
        displayDiv.append(displayRating);
        $("#teamGifs").append(displayDiv);

        var image = $("<img>");
        image.attr("src", gifData[i].images.fixed_height_still.url);
        image.attr("data-still", gifData[i].images.fixed_height_still.url);
        image.attr("data-animate", gifData[i].images.fixed_height.url);
        image.attr("data-state", "still");
        displayDiv.append(image);
        $("#teamGifs").append(displayDiv);

    }
});

//Alters image state on click
function changeImageState() {
    var state = $(this).attr("data-state");

    if (state == "still") {
        $(this).attr("src", "animate");
        $(this).attr("data-state", "animate");
    } else if (state == "animate") {
        $(this).attr("src", "still");
        $(this).attr("data-state", "stll");
    }
}
    
    $(document).on("click", ".displayedButtons", displayArrayButtons),
    $(document).on("click", ".gif", changeImageState);
});