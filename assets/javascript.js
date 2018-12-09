$(document).ready(function() {

var teamsArray = ["Kansas City Chiefs", "Los Angeles Rams", "Minnesota Vikings", "New England Patriots", "Phildelphia Eagles", "Green Bay Packers"];

function displayGifs() {
    $("#teamGifs").empty();
    var input = $(this).attr("data-name");
    var limit = 10;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=7aG4b9imj3YrYLlVf4dY2PQ8a4aLIrIt";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {

        for (var i = 0; i < teamsArray.length; i++) {
            var displayDiv = $("<div>");
            var image = $("<img>");
            image.attr("src", "response.data[i],images.orginal_still.url");
            image.attr("data-still", response.data[i].images.original_still.url);
            image.attr("data-animate", response.data[i].images.original.url);
            image.attr("data-state", "still");
            image.attr("class", "gif");
            displayDiv.append(image);

            var rating = response.data[i].rating;
            var displayRating = $("<p>").text("Rating: " + rating);
            displayDiv.append(displayRating);

            $("#teamGifs").append(displayDiv);
        }
    });
}

function addButtons() {
    $("#team-buttons").empty();
    for (var t = 0; t < teamsArray.length; t++) {
        var newButton = $("<button>");
        newButton.attr("class", "btn btn-default");
        newButton.attr("id", "input");
        newButton.attr("data-name", teamsArray[t]);
        newButton.text(teamsArray[i]);
        $("#team-buttons").append(newButton);
    }
}

function changeImageState() {
    var state = $(this).attr("data-state");
    var animate = $(this).attr("data-animate");
    var still = $(this).attr("data-still");

    if (state == "still") {
        $(this).attr("src", animate);
        $(this).attr("data-state", "animate");
    } else if (state == "animate") {
        $(this).attr("src", still);
        $(this).attr("data-state", "stll");
    }
}

$("#add-team").on("click", function() {
    var input = $("#teams-input").val().trim();
    form.reset();
    displayButtons.push(input);

    addButtons();
    return false;
}),
    
    $(document).on("click", "#teams-input", displayGifs),
    $(document).on("click", ".gif", changeImageState);
});