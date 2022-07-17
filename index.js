


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
    isAce()
    passOrHit("hit")
    displayCount(hand)
})
stayBtn.addEventListener("click", () =>{
    isAce()
    passOrHit("pass")
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
const isAce = () =>{
    for(let i = 0; i < hand.length; i++){
        if(hand[i].Value == "A"){

            if(count > 22){
                const currentCount = document.getElementById("currentScore")
                count = count - 10
                currentCount.innerHTML = count

                return count
            }
            console.log("PLAYER HAS ACE");
        }
    }
    
    for(let i = 0; i < bankerHand.length; i++){
        if(bankerHand[i].Value == "A"){
            if(bankCount > 22){
                const currentBankScore = document.getElementById("bankScore")

                bankCount = bankCount - 10
                currentBankScore.innerHTML = bankCount

                return bankCount
            }
            console.log("DEALER HAS ACE");
            
        }
    }
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
    winCondition()
}

const winCondition = () =>{
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


const passOrHit = (nextMove) =>{
    if(nextMove == 'hit'){
        PlayerHand()
        displayDeck()
        displayPlayerHand(hand)
        //return dealerTurn
    }
    if(nextMove == "pass"){
        DealerHand()
        displayDeck()
        displayBankHand(bankerHand)
    }


}
/*const PlayerHandtemp =(nextMove)=>{
    // split into two functions, PlayerHand(like Dealerhand) and PlayerDecision
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
}*/

const PlayerHand =()=>{
    // split into two functions, PlayerHand(like Dealerhand) and PlayerDecision
    let currentHand = drawCard().drawnCard
    const playerCards = document.getElementById('playerCards')

    
        if(count == 21){
            count = 0
            hand.length = 0
            console.log("BlackJack")
            bankerCards.innerHTML = "BlackJack"
            
            
        }
        if (count > 21 ) {
            count = 0
            hand.length = 0
            console.log("BUSTER")
            playerCards.innerHTML = ""
        } 
        hand.push(currentHand)
        displayDeck()
        
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
            console.log("BUSTER")
            bankerHand.length = 0
            bankerCards.innerHTML = ""
        }    
        bankerHand.push(currentHand)
        displayDeck()
        
        

        
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