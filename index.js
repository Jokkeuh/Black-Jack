


const cards = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
const colors = ["Spades","Hearts","Diamonds","Clubs"];
let deck = [];
let board = [];

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


const valueCounter =()=>{
    
    let count = 0;
    hand.forEach(card => {
       count += card.CardValue
       
    });

    if(count >= 22){
        hand.length = 0
        console.log("bust")
        return
    }
    console.log(count)
    return count
    
}




const PlayerHand =(nextMove)=>{
    valueCounter()
        if(nextMove === 'hit'){
            let currentHand =  drawCard().drawnCard
            hand.push(currentHand)
        }
        if(nextMove === 'pass'){
            hand.length = 0
        }
        
        
        
        return hand
    
}


const drawCard = () =>{
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
    
}