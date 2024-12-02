// script.js

const gameBoard = document.getElementById('gameBoard');
const moveCountElement = document.getElementById('moveCount');
const restartButton = document.getElementById('restartButton');

const cardsArray = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍓', '🥭', '🍍'];
let cards = [...cardsArray, ...cardsArray]; // Duplicate for matching pairs
let flippedCards = [];
let matchedCount = 0;
let moves = 0;

// Shuffle the cards
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Create the game board
function createBoard() {
  gameBoard.innerHTML = '';
  cards = shuffle(cards);
  cards.forEach((card) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.value = card;
    cardElement.addEventListener('click', handleCardClick);
    gameBoard.appendChild(cardElement);
  });
}

// Handle card click
function handleCardClick(e) {
  const clickedCard = e.target;

  // Prevent clicking on the same card twice
  if (clickedCard.classList.contains('flipped') || flippedCards.length === 2) return;

  // Flip the card
  clickedCard.classList.add('flipped');
  clickedCard.textContent = clickedCard.dataset.value;
  flippedCards.push(clickedCard);

  if (flippedCards.length === 2) {
    moves++;
    moveCountElement.textContent = moves;

    // Check for a match
    if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
      flippedCards.forEach((card) => card.classList.add('matched'));
      matchedCount++;
      flippedCards = [];

      // Check if the game is over
      if (matchedCount === cardsArray.length) {
        setTimeout(() => alert(`Congratulations! You completed the game in ${moves} moves.`), 500);
      }
    } else {
      // No match - flip back after a short delay
      setTimeout(() => {
        flippedCards.forEach((card) => {
          card.classList.remove('flipped');
          card.textContent = '';
        });
        flippedCards = [];
      }, 1000);
    }
  }
}

// Restart the game
restartButton.addEventListener('click', () => {
  moves = 0;
  matchedCount = 0;
  flippedCards = [];
  moveCountElement.textContent = moves;
  createBoard();
});

// Initialize the game
createBoard();
