//This code block adds an event listener to the DOMContentLoaded event, which fires when the HTML document has been completely loaded and parsed by the browser.
document.addEventListener("DOMContentLoaded", () => {
    let gamestate = new GameState()   
    let btn = document.getElementById("start-button")
    btn.addEventListener("click", () =>{
        let body = document.getElementsByClassName("container")
        body[0].innerHTML = "<h1>Crazy Eights</h1> <h3 id='turn'>Turn: Player "+(gamestate.turn+1)+"</h3> <div id='pile'></div> <div id='current-player'><div class='hand' id='p1-hand'></div></div><h3 id='declared-suit'>Declared Suit: "+gamestate.declaredSuit+"</h3>"
        gamestate.round()
    })
})

//This JavaScript code defines three classes: Player, Card, and GameState, which together appear to create "Crazy Eights" card game.
class Player{
    constructor(number){
        this.number = number //It stores the player's number or identifier.
        this.hand = [] //It initializes an empty array to represent the player's hand, which will hold Card objects.
        this.points // It seems to represent the player's points, but it is not assigned any initial value in the constructor.
    }
}

class Card{ //This class represents a single playing card.
    constructor(rank, suit, value)
    {
        this.suit = suit //The suit of the card (e.g., "hearts", "diamonds", "spades", "clubs").
        this.rank = rank //The rank or face value of the card (e.g., "2", "3", "Q", "K").
        this.value = value //The value associated with the card (e.g., for Crazy Eights, this could be a numerical value for number cards or special values for face cards and "8").
        this.id = ""+rank+suit.charAt(0)
    }
}

class GameState{ //This class represents the overall game state and game logic for the card game.
    constructor(){
        this.players = [] //It initializes an empty array to store the player objects in the game.
        this.deck = [] // It initializes an empty array to represent the game's deck of cards, which will hold Card objects.
        this.pile = [] // It initializes an empty array to represent the pile of discarded cards during the game.
        this.finished = false //It is set to false by default, suggesting that the game is not finished initially.
        this.turn = 0 // It represents the current player's turn (likely an index corresponding to the player in the players array).
        this.currentPlayer; //  It is not assigned a value in the constructor, but it will likely store the current player object during the game.
        this.declaredSuit = " "; //  It is initialized as an empty string, likely to represent the declared suit (when an "8" is played).
        this.topCard; //  It is not assigned a value in the constructor, but it will likely store the top card on the pile during the game.

        //Methods

        this.addPlayers()
        this.createDeck()
        this.shuffle()
        this.deal()

        //The purpose of this loop is to initialize the topCard property of the GameState object with the first non-"8" card from the deck array. It keeps popping cards from the deck until a card with a rank other than "8" is found and then assigns it to this topCard.
        while(!this.topCard || this.topCard.rank == "8"){
            this.topCard = this.deck.pop()
            this.pile.push(this.topCard)
        }
        
    }
// This method adds players to the game by creating new Player objects and pushing them into the this.players array. 
    addPlayers(){
        for(let i = 0; i < 4; i++){
            let p = new Player(i+1)
            this.players.push(p)
        }
    }
// This method shuffles the deck array, which represents the game's deck of cards. It uses the Fisher-Yates shuffle algorithm to randomly reorder the cards in the array. 
    shuffle() {
        for (var i = this.deck.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = temp;
        }
    }
// This method deals cards to the players. It assumes that the deck array has been created and shuffled before this method is called. The method loops through each player in the this.players array and deals five cards to each player. It does this by using the splice() method to extract the last five cards from the deck array and then pushing them into the player's hand array.
    deal(){
       for(let i = 0; i<this.players.length; i++)
       {
           this.players[i].hand.push(deck.splice(deck.length-5))
       }
    }
//his method creates the game's deck of cards. It loops through four suits (Clubs, Hearts, Spades, and Diamonds) and through 13 ranks (from "1" (Ace) to "13" (King)). It creates a Card object for each combination of suit and rank, setting the rank, suit, and value properties accordingly. The newly created Card object is then added to the deck array, which represents the complete deck of cards for the game.
    createDeck(){
        let suits = ["Clubs", "Hearts", "Spades", "Diamonds"]
        for(let i = 0; i<4; i++)
        {
            for(let j = 1; j<14; j++)
            {
                let card;
                if(j == 1)
                {
                    card = new Card("A", suits[i], 1)
                }
                else if(j == 11)
                {
                    card = new Card("J", suits[i], 10)
                }
                else if(j == 12)
                {
                    card = new Card("Q", suits[i], 10)
                }
                else if(j == 13)
                {
                    card = new Card("K", suits[i], 10)
                }
                else{
                    card = new Card(""+j, suits[i], j)
                }
                this.deck.push(card)
            }
        }
    }

    deal(){
        for(let i = 0; i < this.players.length; i++)
        {
            for(let j = 0; j<5; j++)
            {
                this.players[i].hand.push(this.deck.pop())
            }
            
        }
    }
    // displays current players hand
    displayHands(){
            let addition = "" 
            let hand = this.currentPlayer.hand
            let currentHand = document.getElementById("current-player")
            for(let j = 0; j < hand.length; j++)
            {
                let file = hand[j].id+".png"
                addition += "<img class = 'card-image' id = '"+hand[j].id+"' src = 'assets/"+file+"' alt = '"+hand[j].id+"'>"
            }
            currentHand.innerHTML = addition
        }
    
// This method is responsible for displaying the top card of the pile, which represents the discard pile. It takes the id property of the topCard, appends ".png" to it, and constructs an image file name.
    displayPile()
    {
        let file = this.topCard.id+".png"
        let p = document.getElementById('pile')
        p.innerHTML = "<img class = 'card-image' id = '"+this.topCard.id+"' src = 'assets/"+file+"' alt = '"+this.topCard.id+"'>"
    }

//This method updates various elements in the game interface with the current game state. It sets the HTML content of the element with the ID "turn" to display the current player's turn number (this.turn + 1). Additionally, it updates the element with the ID "declared-suit" based on the current topCard. If the topCard has a rank of "8," it shows the suit that the player declared as the current suit. Otherwise, it sets the content to an empty string, effectively hiding the declared suit.
    updates(){
        let pnum = document.getElementById('turn')
        pnum.innerHTML = "Player "+(this.turn+1)
        let points = document.getElementById('current-points')
        let suit = document.getElementById('declared-suit')
        if(this.topCard.rank == "8"){
            suit.innerHTML = "Declared Suit: "+this.declaredSuit
        }
        else{
            suit.innerHTML = " "
        }
    }
// This method represents a single round of the game and handles the logic for the player's turn. It starts by selecting the current player from the players array based on the turn property. The method then updates the game interface and displays the hands and the top card of the pile. After displaying the game state, the method iterates through the current player's hand to find valid cards that can be played on the topCard. 
    round(){
        this.currentPlayer = this.players[this.turn]
        let num = this.turn+1
        let hand = this.currentPlayer.hand
        let id = "p"+num+"-hand"
        let count = 0
        this.updates()
        this.displayHands()
        this.displayPile()
        console.log(this.topCard)
        console.log(num)
        console.log(hand)
        for(let i = 0; i<hand.length; i++)
        {
            let card = hand[i]
            let currentSuit;
            if(this.topCard.rank == "8")
            {
                currentSuit = this.declaredSuit.toUpperCase()               
            }
            else{
                currentSuit = this.topCard.suit.toUpperCase()    
            }
            if(card.suit.toUpperCase() == currentSuit || card.rank == this.topCard.rank || card.rank == "8"){
                count++
                let cardID = card.id
                let cardElement = document.getElementById(cardID)
                cardElement.addEventListener('click', ()=>{
                    this.pile.push(card)
                    console.log("success")
                    let index = hand.indexOf(card)
                    hand.splice(index, 1)
                    if(hand.length == 0){
                        this.finished = true
                        this.declareWinner()
                    }
                    else if(card.rank == "8"){
                        this.declaredSuit = prompt("Declare a suit")
                        while (!(this.declaredSuit.toUpperCase() == "HEARTS" || this.declaredSuit.toUpperCase() == "SPADES" || this.declaredSuit.toUpperCase() == "DIAMONDS" || this.declaredSuit.toUpperCase() == "CLUBS")){
                            this.declaredSuit = prompt("That is not a valid suit. Please declare a suit.")
                        }
                        this.turn = (this.turn+1)%4
                        this.topCard = this.pile[this.pile.length-1]
                        this.round()
                    }
                    else{
                        this.turn = (this.turn+1)%4
                        this.topCard = this.pile[this.pile.length-1]
                        this.round()
                    }
                })

            }
        
        }
        if(count == 0){
            let body = document.getElementsByClassName("container")
            let draw = document.createElement("button")
            draw.type = "input"
            draw.className = "btn btn-danger"
            draw.id = "draw"
            draw.innerHTML = "Draw"
            body[0].appendChild(draw)
            draw.addEventListener('click', ()=>{
                this.currentPlayer.hand.push(this.deck.pop())
                this.turn = (this.turn+1)%4
                body[0].removeChild(draw)
                this.round()
            })

            
        }


// This method is called when a player wins the game (i.e., finishes all their cards). It replaces the content of the element with the ID "container" with a message displaying the winning player's number. 
    }
    declareWinner(){
        document.getElementById('container').innerHTML = "<div class='winner'>Player "+this.currentPlayer.number+" is the winner!</div>"
        //make more pretty and celebratory
    }

    

    
}