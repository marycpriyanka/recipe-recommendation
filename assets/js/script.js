
let queryUrl;

// Handler for search recipe user form submission
function formSubmitHandler(event) {
    // event.preventDefault();

    // API Id for Edamam recipe search API
    let appId = "3f548913";
    // API key for Edamam recipe search API
    let appKey = "9d558572444afeba08f4059681e7376b"

    let mainIngredient = "chicken";
    let mealType = "Lunch";
    let diet = "balanced";
    let time = "30";

    queryUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=" + mainIngredient + "&app_id=" + appId + "&app_key=" + appKey
        + "&diet=" + diet + "&mealType=" + mealType + "&time=" + time;
    fetch(queryUrl)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                console.log("Error: " + response.statusText);
            }
        })
        .then(function (data) {
            console.log(data);
            console.log(data.hits[0].recipe);
            displayRecipeCards(data.hits)
        })
        .catch(function (error) {
            console.log("Unable to connect to server: " + error);
        })
}

function displayRecipeCards(recipes) {

}

// formSubmitHandler();
