// Gets the HTML DOM elements
let mainIngredientTxtE = document.getElementById("mainIngredientInput");
let mealTypeElement = document.getElementById("MealType");
let dietElement = document.getElementById("diet");
let timeElement = document.getElementById("time")
let searchButton = document.getElementById("buttonSearch");
let errorLog = document.getElementById("errorLog");
let favoritesElement = document.getElementById("favoriteList");
let quote = document.getElementById("quote");
let recipeCardSection = document.getElementById("cards");

// Add event listener for search button
searchButton.addEventListener("click", formSubmitHandler);

// Query URL variable to be used in API call
let queryUrl;
// Gets the favorite recipe list from the local storage
let favoriteRecipes = JSON.parse(localStorage.getItem("FavoriteRecipes")) || [];

showFavorites();
getAndDisplayQuote();

function getAndDisplayQuote() {
    let queryUrl = "https://api.adviceslip.com/advice";
    let timer = setInterval(function () {
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
                // console.log(data);
                quote.textContent = data.slip.advice;
                // console.log(data.slip.advice);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, 10000);
}

// Displays the saved recipes in the collapsible div
function showFavorites() {
    // Adds a link for each item in the favorite recipe
    for (let i = 0; i < favoriteRecipes.length; i++) {
        let listItem = document.createElement("li");
        let link = document.createElement("a");
        link.textContent = favoriteRecipes[i].recipeName;
        link.href = favoriteRecipes[i].recipeURL;
        link.target = "_blank";
        listItem.appendChild(link);

        favoritesElement.appendChild(listItem);
    }
}

// Handler for search recipe user form submission
function formSubmitHandler(event) {
    event.preventDefault();

    // API Id for Edamam recipe search API
    let appId = "3f548913";
    // API key for Edamam recipe search API
    let appKey = "9d558572444afeba08f4059681e7376b"

    // Gets the user entered values
    let mainIngredient = mainIngredientTxtE.value;
    let mealType = mealTypeElement.value;
    let diet = dietElement.value;
    let time = timeElement.value;

    // Clears the text input field
    mainIngredientTxtE.textContent = "";

    // Query URL with user selected query parameters
    queryUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=" + mainIngredient + "&app_id=" + appId + "&app_key=" + appKey
        + "&diet=" + diet + "&mealType=" + mealType + "&time=" + time;
    // Fetches the Edamam recipe API
    fetch(queryUrl)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
                errorLog.textContent = "Error: " + response.statusText;
            }
        })
        .then(function (data) {
            recipeCardSection.innerHTML = "";
            displayRecipeCards(data.hits)
        })
        .catch(function (error) {
            console.log(error);
        })
}

// Displays the fetched recipes as cards
function displayRecipeCards(recipes) {
    console.log(recipes);
    for (let i = 0; i < recipes.length; i++) {
        let name = recipes[i].recipe.label;
        let image = recipes[i].recipe.images.SMALL.url;
        let url = recipes[i].recipe.url;

        let card = document.createElement("div");

        let link = document.createElement("a");
        let imageElement = document.createElement("img");
        imageElement.setAttribute("src", image);
        imageElement.setAttribute("alt", name);
        imageElement.setAttribute("class", "card-img-top");
        link.appendChild(imageElement);

        let titleElement = document.createElement("h5");
        titleElement.textContent = name;
        titleElement.setAttribute("class", "card-title");
        link.appendChild(titleElement);
        link.setAttribute("href", url);
        link.setAttribute("target", "_blank");
        card.appendChild(link);

        let button = document.createElement("button");
        button.textContent = "Add to favorites";
        button.setAttribute("class", "btn btn-dark mt-auto");
        card.appendChild(button);

        card.setAttribute("class", "card mb-3");
        card.setAttribute("style", "width: 18rem;");

        recipeCardSection.appendChild(card);
    }
}

// Saves a recipe name and its url to local storage
function saveFavoriteRecipe(recipeName, recipeUrl) {
    // Checks whether the recipe name is already there in favorites list
    let alreadyExists = false;
    for (let i = 0; i < favoriteRecipes.length; i++) {
        if (favoriteRecipes[i]["recipeName"] === recipeName) {
            alreadyExists = true;
        }
    }

    // If the recipe is not there in the recipe list, it will be added to local storage
    if (!alreadyExists) {
        let object = {
            recipeName: recipeName,
            recipeURL: recipeUrl
        };
        favoriteRecipes.push(object);

        localStorage.setItem("FavoriteRecipes", JSON.stringify(favoriteRecipes));

        // Adds the recipe as a link to favorites list 
        let listItem = document.createElement("li");
        let link = document.createElement("a");
        link.textContent = recipeName;
        link.href = recipeUrl;
        link.target = "_blank";
        listItem.appendChild(link);
        favoritesElement.appendChild(listItem);
    }
}

// Removes a favorite recipe from saved list
function deleteFavoriteRecipe(recipeName) {
    // Removes the recipe from local storage
    for (let i = 0; i < favoriteRecipes.length; i++) {
        if (favoriteRecipes[i].recipeName === recipeName) {
            favoriteRecipes.splice(i, 1);
            break;
        }
    }

    localStorage.setItem("FavoriteRecipes", JSON.stringify(favoriteRecipes));

    // Removes the recipe link from the collapsible list in homeapge
    for (let i = 0; i < favoritesElement.children.length; i++) {
        if (favoritesElement.children[i].firstChild.textContent === recipeName) {
            favoritesElement.removeChild(favoritesElement.children[i]);
        }
    }
}


