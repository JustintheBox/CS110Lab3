document.addEventListener("DOMContentLoaded", function() {

  // variables and get document elements
  let currentPlayer = 'X';
  let scores = {
    'Justin': 0,
    'Computer': 0
  };
  const cells = document.querySelectorAll('.xo');
  const displayPlayer = document.querySelector('.display_player');
  const displayScores = document.querySelector('.display_scores');

  // functions
  function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }

  function checkWinner() {
    const winningCombinations = [
      ['one', 'two', 'three'],
      ['four', 'five', 'six'],
      ['seven', 'eight', 'nine'],
      ['one', 'four', 'seven'],
      ['two', 'five', 'eight'],
      ['three', 'six', 'nine'],
      ['one', 'five', 'nine'],
      ['three', 'five', 'seven']
    ];

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        document.querySelector("." + a + " span").textContent === currentPlayer &&
        document.querySelector("." + b + " span").textContent === currentPlayer &&
        document.querySelector("." + c + " span").textContent === currentPlayer
      ) {
        if (currentPlayer === 'X')
          scores['Justin']++; 
        else
          scores['Computer']++;
        displayScores.textContent = ''
        displayScores.textContent = `Justin: ${scores['Justin']}, Computer: ${scores['Computer']}`;
        return true;
      }
    }

    return false;
  }

  function handleCellClick(e) {
    console.log("Success")
    e.stopImmediatePropagation()
    const cell = e.target;
    if (cell.textContent === '') { 
      cell.textContent = currentPlayer; 
      if (checkWinner()) {
        setTimeout(() => {
          alert(`Player ${currentPlayer} wins!`);
          resetGame();
        }, 100);
      } else {
        togglePlayer(); 
        if (currentPlayer === 'O') {
          makeComputerMove();
        }
      }
    }
  }

  function makeComputerMove() {
    const emptyCells = Array.from(cells).filter(cell => cell.textContent === '');
    if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    emptyCells[randomIndex].textContent = currentPlayer;
    if (checkWinner()) {
      setTimeout(() => {
        alert(`Player ${currentPlayer} wins!`);
        resetGame();
      }, 100);
    } else {
      togglePlayer(); 
    }
  } else {
    setTimeout(() => {
      alert(`It's a draw.`);
      resetGame();
    }, 100);
    }
  }
  function resetGame() {
    cells.forEach(cell => {
      cell.textContent = ''; 
    });
    displayPlayer.textContent = "Justin";
    currentPlayer = 'X'
  }

  function resetScore() 
  {
    displayScores.textContent = "Justin: 0, Computer: 0";
  }

  // event listeners
  cells.forEach(cell => { cell.addEventListener('click', handleCellClick);});
  document.querySelector('.reset').addEventListener('click', resetScore);
  document.querySelector('.new_game').addEventListener('click', resetGame);

  // initialize text
  displayPlayer.textContent = "Justin";
  displayScores.textContent = "Justin: 0, Computer: 0";
});
