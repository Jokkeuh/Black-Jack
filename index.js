


const cards = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
const colors = ["Spades","Hearts","Diamonds","Clubs"];
let deck = [];
let board = [];
let count = 0; 




const bankContainer = document.getElementById("bank")
const stayBtn = document.getElementById("miss")
const runningCountContainer = document.getElementById("runningCount")
const container = document.getElementById("container")
const hitBtn = document.getElementById("hit")

hitBtn.addEventListener("click", () =>{
    PlayerHand("hit")
    displayCount()
    
})
stayBtn.addEventListener("click", () =>{
    PlayerHand("miss")
    
})

const displayDeck = () => {
    const deckContainer = document.getElementById("deck")
    deckContainer.innerHTML = deck.length
    
}
const displayPlayerHand = (hand) => {
    const cards = document.getElementById("playerCards");    
    let newCard = document.createElement("div")
    newCard.setAttribute("id","newCard")
    newCard.setAttribute("class","newCard")
    newCard.innerHTML = hand[hand.length -1].Value
    cards.appendChild(newCard)

}





class Player{
    constructor(name){
        this.name = name;
        this.hand = []
        return this.Player
    }
}

const player = new Player('playerOne')
const hand = player.hand



const CreateDeck = ()=>{
    deck = new Array();
    for(let i = 0; i<cards.length; i++){

        for(let j= 0; j < colors.length; j++){

            let value = parseInt(cards[i])
            if(cards[i] == "J" || cards[i] == "Q"|| cards[i] == "K"){
                value = 10;
            }
            if(cards[i] == "A"){
                value = 11;
            }

            let card = { Value: cards[i], Color: colors[j], CardValue: value};           
            deck.push(card)
            
        }
        
    }
    return deck
}
const displayCount = () =>{
    const currentCount = document.getElementById("currentScore")
    
    winCondition(count)
    for(let i = hand.length-1; i < hand.length; i++ ){
        count += hand[i].CardValue 
    }
    winCondition(count)
        currentCount.innerHTML = count
        //currentCount.innerHTML = temp + hand[hand.length - 1].CardValue
    
    
}

const valueCheck =()=>{
    if(hand[0] == undefined){
       console.log('First count')
    }    
}


const winCondition = () =>{
    const cards = document.getElementById("playerCards")
    if(count == 21){
        
        console.log(hand)
        alert("BLACKJACK")
        
        
            cards.innerHTML ="";
            hand.length = 0
            count = 0

        prompt("BLACKJACK")
       
        console.log("BLACKJACK")
        
        
    }
    if(count >= 22){
        
        console.log("bust")
        count = 0
        cards.innerHTML ="";
        hand.length = 0
        
    }
    
}

const PlayerHand =(nextMove)=>{
        if(nextMove === 'hit'){
            let currentHand =  drawCard().drawnCard
            hand.push(currentHand)
            displayDeck()
            displayPlayerHand(hand)
        }
        if(nextMove === 'pass'){
            hand.length = 0
        }
        return hand
}


const drawCard = () =>{

    valueCheck()
    if(deck.length < 1){
        console.log("next deck");
        CreateDeck()
        runningCount = 0;
        board.length = 0
    }
    const randomCardIndex = Math.floor(Math.random()*deck.length);
    let drawnCard = deck[randomCardIndex]
    getRunningCount(drawnCard)
    deck.splice(randomCardIndex, 1)
    board.push(drawnCard)

    
    return {drawnCard, deck, runningCount, board}
}

const createHands = () => {
    // amount of players
    // bank hand ***
    // amount of decks
    // amount of cards
    // amount of games
    // if hit -> take a card ***
    // if pass -> bank takes card ***
}

let runningCount = 0
const getRunningCount = (drawnCard) =>{
    if(deck.length == 0){
        runningCount = 0
        CreateDeck()
        board = []
    }

    if(drawnCard.CardValue < 6){
        runningCount = runningCount+1;
    }
    if(drawnCard.CardValue <= 9 && drawnCard.CardValue >= 7){
       return
    }
    if(drawnCard.CardValue >= 10){
        runningCount = runningCount-1;
    }
    runningCountContainer.innerHTML = runningCount
    
}