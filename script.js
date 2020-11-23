const cards = document.querySelectorAll('.card')

//let hasFlippedCard = false
let firstCard, secondCard

let lockBoard = false

function flipCard() {

    if (lockBoard) return
    
    if (this === firstCard) return

    this.classList.add('flip')

    if (!firstCard) {
        firstCard = this
    } else {
        secondCard = this
        checkMatch(firstCard, secondCard)
    }
}

function checkMatch(first, second) {
    
    if (first.dataset.card === second.dataset.card)
        disableCards(first, second)
    else 
        unflipCards(first, second)
    
}

function disableCards(firstCard, secondCard) {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)

    resetBoard()
}

function unflipCards(firstCard, secondCard) {
    lockBoard = true

    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        //lockBoard = false
        resetBoard()
    }, 1200);
}

function resetBoard() {
    lockBoard = false
    firstCard = null
    secondCard = null
}

function shuffle() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * cards.length)
        card.style.order = randomPosition
    })
}

function setup() {
    cards.forEach(card => {
        card.addEventListener('click', flipCard)
    })

    shuffle()
}

setup()