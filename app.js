console.log("Let's get this party started!");

let searchOffset = 0; //Global offset for api pagination
let lastSearchTerm = ""; //Keep track of last search term

async function getGiphy(searchTerm) {
//Reset offset if a new term is searched
if(searchTerm !== lastSearchTerm) {
  searchOffset = 0; //New search term, start from beginning
  lastSearchTerm = searchTerm;
}
  const gifs = await axios.get("https://api.giphy.com/v1/gifs/search", {
      params: {
        q: searchTerm,
        api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym",
        limit: 1,
        offset: searchOffset
      }
    });
  displayGifs(gifs.data.data);
  searchOffset++; //If it's the same search term increment by one for the next result
}

//Function to display gifs
function displayGifs(gifs) {
  const gifsContainer = $("#gifsContainer");

  //Check to see if there any gifs in the repsonse
  if (gifs.length > 0) {
    //Select the 1st gif
    const gif = gifs[0];

    //Chect the number of items to decide if a new row is needed.
    const totalItems = $(".gif-item").length;
    let row;
    if (totalItems % 3 === 0) {
      //Starts new row after 3 gifs
      row = $("<div class='row'></div>");
      gifsContainer.append(row);
    } else {
      row = $("#gifsContainer .row").last(); //Append to last row if less than 3 items
    }

    //Create new column for gif
    const col = $("<div class='col-4 gif-item'></div>");
    const img = $("<img>", {
      src: gif.images.fixed_height.url,
      class: "img-fluid", //Makes image responsive
    });
    col.append(img);
    row.append(col);
  }
}
//Event listener for form submission
$("#giphyForm").submit(function (event) {
  event.preventDefault(); //Prevent the form from resetting
  const searchTerm = $("#giphySearch").val(); //Get value from input box
  getGiphy(searchTerm); //Call getGiphy function with search term
});

// Delete button to delete all gifs
function deleteGifs() {
  $("#gifsContainer").empty();
}

//Event listner for the delete button
$("#delete").click(deleteGifs);
