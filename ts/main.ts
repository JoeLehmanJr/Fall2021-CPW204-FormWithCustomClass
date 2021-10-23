/**
 * Created object to hold form data.
 */
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
myGame.description =
    "Doom is a first-person shooter presented with early 3D graphics."
myGame.rating = "E";
myGame.isDigitalOnly = true;
*/

/**
 * Helper function to getInputById and returns the HTMLElement referenced by id.
 * @param id the id of the element you want to grab.
 * @returns HTMLElement that is referenced by the id parameter
 */
function getById(id:string):HTMLElement{
    return document.getElementById(id);
}

/**
 * Helper function to getInputById and returns the HTMLInputElement referenced by id.
 * @param id the id of the element you want to grab.
 * @returns HTMLInputElement that is referenced by the id parameter
 */
function getInputById(id:string):HTMLInputElement {
    return <HTMLInputElement>document.getElementById(id);
}

/**
 * Handles the on click event for the Add New Video Game button
 */
window.onload = function() {
    let addBtn =
        <HTMLElement>document.querySelector("input[type=button]");
    addBtn.onclick = addVideoGame.bind(this);
}

/**
 * Main function that controls the flow of this page.
 *
 * Starts by clearing all error messages, grabs the data from the for and stores
 * it in an object that is then tests for validity of the inputs, and assuming
 * that the data is valid display it just below form. If the rating is not
 * valid display link to https://www.esrb.org.
 */
function addVideoGame():void {
    clearAllErrors();
    if(isAllDataValid()) {
        let game:videoGame = getVideoGame();
        displayGame(game);
    }
    else {
        displayRatingLink();
    }
}

/**
 * Clears all errors in the validation summary
 */
function clearAllErrors() {
    let errSummary = getInputById("validation-summary");
    errSummary.innerText = "";
}

/**
 * Validates form data and returns a boolean indicating whether the form data is valid.
 * @returns true if the form data is valid. Otherwise false.
 */
 function isAllDataValid(): boolean {
    let isValid = true;

    // Validates the title
    let title = getInputById("title").value;
    if (title ==""){
        isValid = false;
        addErrMsgWithClass("Title is required!", "title-error");
    }

    // Validates the price
    let price = getInputById("price").value;
    let priceValue = parseFloat(price);
    if (price =="" || isNaN(priceValue)){
        isValid = false;
        addErrMsgWithClass("Price is required and must be a number.", "price-error");
    }

    // Validates the description
    let description = getInputById("description").value;
    if (description ==""){
        isValid = false;
        addErrMsgWithClass("A description is required!", "description-error");
    }

    // Validates the rating
    let rating= (<HTMLOptionElement>getById("rating")).value;
    if (rating == ""){
        isValid = false;
        addErrMsgWithClass("You must choose a rating!", "rating-error");
    }
    return isValid;
}

/**
 * Gets all game data from the form and returns it in a videoGame object
 */
 function getVideoGame():videoGame{

    // Creates a new videoGame object
    let game = new videoGame();

    // retrieve the title from the form
    let titleInput = getInputById("title");
    game.title = titleInput.value;

    // retrieve the price from the form and turn it into a float
    let priceInput = getInputById("price");
    game.price = parseFloat(priceInput.value);

    // retrieve the description from the form
    let descriptionInput = getInputById("description");
    game.description = descriptionInput.value;

    // retrieve the rating from the form
    let ratingInput = <HTMLSelectElement>getById("rating");
    game.rating = ratingInput.value;

    // retrieve the status of isDigitalOnly from the form
    let digitalOnly = getInputById("online");
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

/**
 * Add message to the rating error message that points to https://www.esrb.org.
 */
function displayRatingLink() {
    let ratingsElement = document.querySelectorAll(".rating-error");
    for (let i = 0; i < ratingsElement.length; i++){
        let currElem = ratingsElement[i];
        currElem.innerHTML += " <a target='_blank' href='https://www.esrb.org'>Click here for more information</a>";
    }
}

/**
 * Displays the error message passed by the parameter errMsg. It then sets the
 * class using cssClass parameter.
 * @param errMsg  contains the error message
 * @param cssClass contains the class to be applied to the error message.
 */
 function addErrMsgWithClass(errMsg:string, cssClass:string) {
    let errSummary = getInputById("validation-summary");
    let errItem = document.createElement("li");
    errItem.classList.add(cssClass);
    errItem.innerText = errMsg;
    errSummary.appendChild(errItem);
}

/**
 * Displays summary of the game that was just added.
 * @param myGame an object that holds the form data.
 */
function displayGame(myGame: videoGame):void {
    let displayDiv = getInputById("display");

    // create <h2> with game title
    let gameHeading = document.createElement("h2");
    gameHeading.innerText = myGame.title;

    // Create paragraph game details
    let gameInfo = document.createElement("p");
    let gameMedia = "";

    // If isDigitalOnly is checked
    if (myGame.isDigitalOnly) {
        gameMedia = "This is a digital only game.";
    }

    // If isDigitalOnly is not checked
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