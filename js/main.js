var videoGame = (function () {
    function videoGame() {
    }
    return videoGame;
}());
window.onload = function () {
    var addBtn = document.querySelector("input[type=button]");
    addBtn.onclick = addVideoGame.bind(this);
};
function clearAllErrors() {
    var errSummary = getById("validation-summary");
    errSummary.innerText = "";
}
function addVideoGame() {
    clearAllErrors();
    if (isAllDataValid()) {
        var game = getVideoGame();
        displayGame(game);
    }
    else {
        displayRatingLink();
    }
}
function displayRatingLink() {
    var ratingsElement = document.querySelectorAll(".rating-error");
    for (var i = 0; i < ratingsElement.length; i++) {
        var currElem = ratingsElement[i];
        currElem.innerHTML += " <a target='_blank' href='https://www.esrb.org'>Click here for more information</a>";
    }
}
function getVideoGame() {
    var game = new videoGame();
    var titleInput = getById("title");
    game.title = titleInput.value;
    var priceInput = getById("price");
    game.price = parseFloat(priceInput.value);
    var descriptionInput = getById("description");
    game.description = descriptionInput.value;
    var ratingInput = getById("rating");
    game.rating = ratingInput.value;
    var digitalOnly = getById("online");
    game.isDigitalOnly = digitalOnly.checked;
    return game;
}
function getById(id) {
    return document.getElementById(id);
}
function displayGame(myGame) {
    var displayDiv = getById("display");
    var gameHeading = document.createElement("h2");
    gameHeading.innerText = myGame.title;
    var gameInfo = document.createElement("p");
    var gameMedia = "";
    if (myGame.isDigitalOnly) {
        gameMedia = "This is a digital only game.";
    }
    else {
        gameMedia = "You can come buy a physical copy!";
    }
    gameInfo.innerText = myGame.title + " has a rating of " + myGame.rating + ". It costs $" + myGame.price.toFixed(2) + ". " + gameMedia + " A description of the game would be " + myGame.description;
    displayDiv.appendChild(gameHeading);
    displayDiv.appendChild(gameInfo);
}
function getInputById(id) {
    return document.getElementById(id);
}
function isAllDataValid() {
    var isValid = true;
    var title = getInputById("title").value;
    if (title == "") {
        isValid = false;
        addErrMsgWithClass("Title is required!", "title-error");
    }
    var price = getInputById("price").value;
    var priceValue = parseFloat(price);
    if (price == "" || isNaN(priceValue)) {
        isValid = false;
        addErrMsgWithClass("Price is required and must be a number.", "price-error");
    }
    var description = getInputById("description").value;
    if (description == "") {
        isValid = false;
        addErrMsgWithClass("A description is required!", "description-error");
    }
    var rating = getById("rating").value;
    if (rating == "") {
        isValid = false;
        addErrMsgWithClass("You must choose a rating!", "rating-error");
    }
    return isValid;
}
function addErrMsgWithClass(errMsg, cssClass) {
    var errSummary = getById("validation-summary");
    var errItem = document.createElement("li");
    errItem.classList.add(cssClass);
    errItem.innerText = errMsg;
    errSummary.appendChild(errItem);
}
