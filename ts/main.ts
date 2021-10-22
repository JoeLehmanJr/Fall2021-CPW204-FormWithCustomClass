class videoGame{
    title: string;
    price: number;
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
    gameInfo.innerText = `${myGame.title} has a rating of ${myGame.rating}. It costs $${myGame.price.toFixed(2)}. ${gameMedia}`

    // Add <h2> in the <div id="display">
    displayDiv.appendChild(gameHeading);

    // Add <p> game information
    displayDiv.appendChild(gameInfo);

}

function getInputById(id:string):HTMLInputElement {
    return <HTMLInputElement>document.getElementById(id);
}


// TODO: Add validation code
function isAllDataValid(): boolean {
    let isValid = true;

    let title = getInputById("title").value;
    if (title ==""){
        isValid = false;
        addErrorMessage("Title is required!");
    }

    let price = getInputById("price").value;
    let priceValue = parseFloat(price);
    if (price =="" || isNaN(priceValue)){
        isValid = false;
        addErrorMessage("Price is required and must be a number.");
    }

    let rating= (<HTMLOptionElement>getById("rating")).value;
    if (rating == ""){
        isValid = false;
        addErrorMessage("You must choose a rating!");
    }

    return isValid;
}

function addErrorMessage(errMsg:string) {
    let errSummary = getById("validation-summary");
    let errItem = document.createElement("li");
    errItem.innerText = errMsg;

    errSummary.appendChild(errItem);
}
