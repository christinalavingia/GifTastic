$(document).ready(function() {

//Initial array of buttons
var teamsArray = ["Kansas City Chiefs", "Los Angeles Rams", "Minnesota Vikings", "New England Patriots", "Phildelphia Eagles", "Green Bay Packers", "San Francisco 49ers", "Seattle Seahawks"];

//Displays array items as buttons
function displayArrayButtons() {
    $("#team-buttons").empty();
    for (var j = 0; j < teamsArray.length; j++) {
        $("#team-buttons").append("<button class='btn btn-light teamSearch' data-team='" + teamsArray[j] + "'>" + teamsArray[j] + "</button>");
    }
}

displayArrayButtons();

//Sets new button from user input
$("#add-team").on("click", function() {
    event.preventDefault();
    var teamName = $("#teams-input").val().trim();
    teamsArray.push(teamName);

displayArrayButtons();

});


//Fetches gifs from the Giphy API
$(document).on("click", ".teamSearch", function() {
    var teamName = $(this).attr("data-team");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + teamName + "&api_key=7aG4b9imj3YrYLlVf4dY2PQ8a4aLIrIt";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        var results = response.data;

//Displays gifs pulled from Giphy API
    $("#teamGifs").empty();
    for (var i = 0; i < 10; i++) {
        var teamDiv = $("<div>");
        teamDiv.attr("class","gifStyle");
        var rating = results[i].rating;
        var displayRating = $("<p>").text("Rating: " + rating);
        $("#teamGifs").append(teamDiv);
        var image = $("<img>");

        image.attr("src", results[i].images.fixed_height_still.url);
        image.attr("data-still", results[i].images.fixed_height_still.url);
        image.attr("data-animate", results[i].images.fixed_height.url);
        image.attr("data-state", "still");
        image.attr("class", "gif");
        teamDiv.append(image);
        teamDiv.append(displayRating);
        $("#teamGifs").append(teamDiv);

        }
    });
});

//Alters image state on click
function changeImageState() {
    var state = $(this).attr("data-state");
    var animateState = $(this).attr("data-animate");
    var stillState = $(this).attr("data-still");

    if (state == "still") {
        $(this).attr("src", animateState);
        $(this).attr("data-state", "animate");
    } else if (state == "animate") {
        $(this).attr("src", stillState);
        $(this).attr("data-state", "stll");
    }
}
    
    $(document).on("click", ".gif", changeImageState);
});