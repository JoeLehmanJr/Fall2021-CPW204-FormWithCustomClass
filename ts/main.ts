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

function addVideoGame() {
    if(isAllDataValid()) {
        let game = getVideoGame();
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
    // TODO: display video game below the form
}

// TODO: Add validation code
function isAllDataValid(): boolean {
    return true;

}