class videoGame{
    title: string;
    price: number;
    description: string;
    rating: string;
    isDigitalOnly: boolean;
}

// object example
/*
let myGame = new VideoGame();
myGame.title = "Mario";
myGame.price = 100;
myGame.rating = "E";
myGame.isDigitalOnly = true;
*/

window.onload = function() {
    let addBtn =
        <HTMLElement>document.querySelector("input[type=button]");
    addBtn.onclick = addVideoGame.bind(this);
}

/**
 * Clears all errors in the validation summary
 */
function clearAllErrors() {
    let errSummary = getById("validation-summary");
    errSummary.innerText = "";
}

function addVideoGame() {
    clearAllErrors();
    if(isAllDataValid()) {
        let game:videoGame = getVideoGame();
        displayGame(game);
    }
    else {
        displayRatingLink();
    }
}

function displayRatingLink() {
    let ratingsElement = document.querySelectorAll(".rating-error");
    for (let i = 0; i < ratingsElement.length; i++){
        let currElem = ratingsElement[i];
        currElem.innerHTML += " <a target='_blank' href='https://www.esrb.org'>Click here for more information</a>";
    }
}

/**
 * Gets all game data from the form and returns it in a videoGame object
 */
function getVideoGame():videoGame{
    let game = new videoGame();
    let titleInput = <HTMLInputElement>getById("title");
    game.title = titleInput.value;

    let priceInput = <HTMLInputElement>getById("price");
    game.price = parseFloat(priceInput.value);

    let descriptionInput = <HTMLInputElement>getById("description");
    game.description = descriptionInput.value;

    let ratingInput = <HTMLSelectElement>getById("rating");
    game.rating = ratingInput.value;

    let digitalOnly = <HTMLInputElement>getById("online");
    game.isDigitalOnly = digitalOnly.checked;

    /* Another way of doing the check for the checkbox
    if(digitalOnly.checked){
        game.isDigitalOnly = true;
    }
    else {
        game.isDigitalOnly = false;
    }
    */

    return game

}

function getById(id:string){
    return document.getElementById(id);
}

function displayGame(myGame: videoGame):void {
    let displayDiv = getById("display");

    // create <h2> with game title
    let gameHeading = document.createElement("h2");
    gameHeading.innerText = myGame.title;

    // Create paragraph game details
    let gameInfo = document.createElement("p");
    let gameMedia = "";
    if (myGame.isDigitalOnly) {
        gameMedia = "This is a digital only game.";
    }
    else{
        gameMedia = "You can come buy a physical copy!";
    }

    /* old way
    gameInfo.innerText = myGame.title + " has a rating of " + myGame.rating +
         ". It costs " + myGame.price + ". It is " + notDigitalDisplay + " digital Only";
    */

    // New way with Template literals
    gameInfo.innerText = `${myGame.title} has a rating of ${myGame.rating}. It costs $${myGame.price.toFixed(2)}. ${gameMedia} A description of the game would be ${myGame.description}`

    // Add <h2> in the <div id="display">
    displayDiv.appendChild(gameHeading);

    // Add <p> game information
    displayDiv.appendChild(gameInfo);

}

function getInputById(id:string):HTMLInputElement {
    return <HTMLInputElement>document.getElementById(id);
}



function isAllDataValid(): boolean {
    let isValid = true;

    let title = getInputById("title").value;
    if (title ==""){
        isValid = false;
        addErrMsgWithClass("Title is required!", "title-error");
    }

    let price = getInputById("price").value;
    let priceValue = parseFloat(price);
    if (price =="" || isNaN(priceValue)){
        isValid = false;
        addErrMsgWithClass("Price is required and must be a number.", "price-error");
    }

    let description = getInputById("description").value;
    if (description ==""){
        isValid = false;
        addErrMsgWithClass("A description is required!", "description-error");
    }

    let rating= (<HTMLOptionElement>getById("rating")).value;
    if (rating == ""){
        isValid = false;
        addErrMsgWithClass("You must choose a rating!", "rating-error");
    }
    return isValid;
}

function addErrMsgWithClass(errMsg:string, cssClass:string) {
    let errSummary = getById("validation-summary");
    let errItem = document.createElement("li");
    errItem.classList.add(cssClass);
    errItem.innerText = errMsg;
    errSummary.appendChild(errItem);
}
