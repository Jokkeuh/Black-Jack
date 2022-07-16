


const cards = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
const colors = ["Spades","Hearts","Diamonds","Clubs"];
let deck = [];
let board = [];
let count = 0; 
let bankCount = 0;
let dealerTurn = false;





const bankContainer = document.getElementById("bank")
const stayBtn = document.getElementById("miss")
const runningCountContainer = document.getElementById("runningCount")
const container = document.getElementById("container")
const hitBtn = document.getElementById("hit")

class Player{
    constructor(name){
        this.name = name;
        this.hand = []
        return this.Player
    }
}

class Bank{
    constructor(name){
        this.name = name;
        this.hand = []
        return this.Bank
    }
}


const player = new Player('playerOne')
const hand = player.hand
const banker = new Bank('bankOne')
const bankerHand = banker.hand

hitBtn.addEventListener("click", () =>{
    PlayerHand("hit")
    displayCount(hand)
})
stayBtn.addEventListener("click", () =>{
    PlayerHand("pass")
    DealerHand()
    displayBankCount(bankerHand)    
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
const displayBankHand = (bankerHand) => {
    const cards = document.getElementById("bankerCards");    
    let newCard = document.createElement("div")
    newCard.setAttribute("id","newBankCard")
    newCard.setAttribute("class","newBankCard")
    newCard.innerHTML = bankerHand[bankerHand.length -1].Value
    cards.appendChild(newCard)

}









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
const displayCount = (hands) =>{
    const currentCount = document.getElementById("currentScore")
    winCondition()
    for(let i = hands.length-1; i < hands.length; i++ ){
        count += hands[i].CardValue 
    }
    winCondition()
        currentCount.innerHTML = count
}

const displayBankCount = (hands)=>{
    const currentBankScore = document.getElementById("bankScore")
   
   
    for(let i = hands.length-1; i < hands.length; i++ ){
        bankCount += hands[i].CardValue 
    }
        currentBankScore.innerHTML = bankCount
}

const valueCheck =()=>{
    if(hand[0] == undefined || bankerHand[0] == undefined){
       console.log('First count')
    }    
}


const winCondition = () =>{
    if(dealerTurn === true){
        return
    }
    const cards = document.getElementById("playerCards")
    if(count == 21){
        
        console.log(hand)
        alert("BLACKJACK")
        
        
            cards.innerHTML ="";
            hand.length = 0
            count = 0

        
       
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
        if(nextMove == 'hit'){
            dealerTurn = false
            let currentHand = drawCard().drawnCard
            hand.push(currentHand)
            displayDeck()
            displayPlayerHand(hand)
            return dealerTurn
            
        }
        if(nextMove =='pass'){
            dealerTurn = true
            return dealerTurn
        }
        return hand
}

const DealerHand = ()=>{
        let currentHand = drawCard().drawnCard
        const bankerCards = document.getElementById('bankerCards')
     

        if (bankCount == 21 ) {
            bankCount = 0
            bankerHand.length = 0
            console.log("BlackJack")
            bankerCards.innerHTML = "BlackJack"
        }

        if (bankCount > 21 ) {
            bankCount = 0
            console.log("21")
            bankerHand.length = 0
            bankerCards.innerHTML = ""
        }    
        bankerHand.push(currentHand)
        displayDeck()
        displayBankHand(bankerHand)
        

        
        return bankCount

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