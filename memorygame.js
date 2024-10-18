const cardsarray = [
    {
        name: 'hippo',
        icon: "A"
    },
    {
        name: 'bat',
        icon: "B"
    },
    {
        name: 'alicorn',
        icon: "C"
    },
    {
        name: 'deer',
        icon: "D"
    },
    {
        name: 'ram',
        icon: "E"
    },
    {
        name: 'monkey',
        icon: "F"
    },
    {
        name: 'hippo',
        icon: "A"
    },
    {
        name: 'bat',
        icon: "B"
    },
    {
        name: 'alicorn',
        icon: "C"
    },
    {
        name: 'deer',
        icon: "D"
    },
    {
        name: 'ram',
        icon: "E"
    },
    {
        name: 'monkey',
        icon: "F"
    }
];

let flippedcards = [];
let matchedpairs = 0;

shufflecards();
const gameboard = document.getElementById('gameboard');
displaycards();

function shufflecards() {
    for (let i = cardsarray.length - 1; i >= 0; i--) {
        const randindex = Math.floor(Math.random() * (i + 1));
        [cardsarray[i], cardsarray[randindex]] = [cardsarray[randindex], cardsarray[i]];
    }
}

function displaycards() {
    cardsarray.forEach((curr, index) => {
        const card = document.createElement('div');
        card.setAttribute('id', index);
        card.classList.add('cardback');
        card.classList.add('active');
        gameboard.append(card);
        card.addEventListener('click', flipcard);
    });
}

function flipcard() {
    // Check if less than 2 cards are flipped and the card is active
    if (flippedcards.length < 2 && this.classList.contains('active')) {
        let cardid = this.getAttribute('id');

        // Prevent the same card from being clicked twice
        if (flippedcards.length === 1 && flippedcards[0].getAttribute('id') === cardid) {
            return; // Exit if the same card is clicked
        }

        // Add card to flippedcards and reveal its icon
        flippedcards.push(this);
        this.classList.remove('cardback');
        this.innerHTML = cardsarray[cardid].icon;
    }

    // Check for match if two cards are flipped
    if (flippedcards.length == 2) {
        setTimeout(checkmatch, 1000);
    }
}

function checkmatch() {
    const card1id = flippedcards[0].getAttribute('id');
    const card2id = flippedcards[1].getAttribute('id');

    if (cardsarray[card1id].name === cardsarray[card2id].name) {
        // Cards match, disable them and change their appearance
        flippedcards[0].style.border = 'none';
        flippedcards[0].style.backgroundColor = '#f5e8ba';
        flippedcards[0].innerHTML = '';
        flippedcards[0].classList.remove('active');

        flippedcards[1].style.border = 'none';
        flippedcards[1].style.backgroundColor = '#f5e8ba';
        flippedcards[1].innerHTML = '';
        flippedcards[1].classList.remove('active');

        matchedpairs++;
        gameover();
    } else {
        // Cards do not match, flip them back
        flippedcards[0].innerHTML = '';
        flippedcards[0].classList.add('cardback');

        flippedcards[1].innerHTML = '';
        flippedcards[1].classList.add('cardback');
    }

    // Clear flipped cards array
    flippedcards = [];
}

function gameover() {
    if (matchedpairs == cardsarray.length / 2) {
        // Remove all cards from the game board
        while (gameboard.firstChild) {
            gameboard.removeChild(gameboard.firstChild);
        }
        // Display win message
        gameboard.innerHTML = "YOU WON";
        gameboard.classList.remove('game');
        gameboard.classList.add('won');
    }
}
