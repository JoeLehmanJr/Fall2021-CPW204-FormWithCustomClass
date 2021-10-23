var videoGame = (function () {
    function videoGame() {
    }
    return videoGame;
}());
function getById(id) {
    return document.getElementById(id);
}
function getInputById(id) {
    return document.getElementById(id);
}
window.onload = function () {
    var addBtn = document.querySelector("input[type=button]");
    addBtn.onclick = addVideoGame.bind(this);
};
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
function clearAllErrors() {
    var errSummary = getInputById("validation-summary");
    errSummary.innerText = "";
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
function getVideoGame() {
    var game = new videoGame();
    var titleInput = getInputById("title");
    game.title = titleInput.value;
    var priceInput = getInputById("price");
    game.price = parseFloat(priceInput.value);
    var descriptionInput = getInputById("description");
    game.description = descriptionInput.value;
    var ratingInput = getById("rating");
    game.rating = ratingInput.value;
    var digitalOnly = getInputById("online");
    game.isDigitalOnly = digitalOnly.checked;
    return game;
}
function displayRatingLink() {
    var ratingsElement = document.querySelectorAll(".rating-error");
    for (var i = 0; i < ratingsElement.length; i++) {
        var currElem = ratingsElement[i];
        currElem.innerHTML += " <a target='_blank' href='https://www.esrb.org'>Click here for more information</a>";
    }
}
function addErrMsgWithClass(errMsg, cssClass) {
    var errSummary = getInputById("validation-summary");
    var errItem = document.createElement("li");
    errItem.classList.add(cssClass);
    errItem.innerText = errMsg;
    errSummary.appendChild(errItem);
}
function displayGame(myGame) {
    var displayDiv = getInputById("display");
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
