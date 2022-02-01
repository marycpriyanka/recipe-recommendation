
let queryUrl;
// API Id for Edamam API
let appId = "3f548913";
// API key for Edamam API
let appKey = "9d558572444afeba08f4059681e7376b"

// Handler for search recipe user form submission
function formSubmitHandler(event) {
    event.preventDefault();

    let mainIngredient = "chicken";
    let mealType = "Lunch";
    let diet = "balanced";
    let time = "30";

    queryUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=" + mainIngredient + "&app_id=" + appId + "&app_key=" + appKey 
                + "&diet=" + diet + "&mealType=" + mealType + "&time=" + time;
    fetch(queryUrl)
        .then(function (response) {
            if(response.ok) {
                return response.json();
            }
            else {
                console.log("Error: " + response.statusText);
            }
        })
        .then(function (data) {
            console.log(data);
            displayRecipeCards(data.hits)
        })
        .catch(function (error) {
            console.log("Unable to connect to server: " + error);
        })
}

function displayRecipeCards(recipes) {
    
}
