document.addEventListener('DOMContentLoaded', () => {
  const gameBoard = document.getElementById('gameBoard');
  const resetButton = document.getElementById('resetButton');
  const scoreDisplay = document.getElementById('score');

  const images = [
    'memoria-1.jpg', 'memoria-2.jpg', 'memoria-3.jpg', 'memoria-4.jpg', 'memoria-5.jpg', 'memoria-6.jpg', 'memoria-7.jpg',
    'memoria-8.jpg'
  ];

  let cards = [];
  let flippedCards = [];
  let matchedCards = 0;
  let score = 0;

  function initializeGame() {
    cards = [];
    flippedCards = [];
    matchedCards = 0;
    score = 0;
    scoreDisplay.textContent = '0';

    const shuffledImages = shuffleArray([...images, ...images]);
    shuffledImages.forEach((image, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.image = image;
      card.innerHTML = `<span class="number">${index + 1}</span><img src="img/${image}" alt="Card Image">`;
      card.addEventListener('click', () => flipCard(card));
      gameBoard.appendChild(card);
      cards.push(card);
    });
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
      card.classList.add('flipped');
      flippedCards.push(card);
      if (flippedCards.length === 2) {
        checkMatch();
      }
    }
  }

  function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.image === card2.dataset.image) {
      card1.classList.add('matched');
      card2.classList.add('matched');
      matchedCards += 2;
      score += 10;
      scoreDisplay.textContent = score;
      if (matchedCards === cards.length) {
        alert(`¡Felicitaciones! Lograste un total de ${score} puntos.`);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
      }, 1000);
    }
    flippedCards = [];
  }

  resetButton.addEventListener('click', () => {
    gameBoard.innerHTML = '';
    initializeGame();
  });

  initializeGame();
});