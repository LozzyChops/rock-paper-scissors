'use strict'

//return random string 'rock' 'paper' or 'scissors'
function getComputerChoice() {
  let randomNumber = Math.floor(Math.random() * 3) + 1

  switch (randomNumber) {
    case 1:
      return 'rock'
    case 2:
      return 'paper'
    case 3:
      return 'scissors'
  }
}

//play a round with the given choices and return a result string and the updated scores
function playRound(pSelection, cSelection, pScore = 0, cScore = 0) {
  let result

  if (pSelection === cSelection) {
    result = 'Tied round'
    return [result, pScore, cScore]
  } else if (
    (pSelection === 'rock' && cSelection === 'scissors') ||
    (pSelection === 'paper' && cSelection === 'rock') ||
    (pSelection === 'scissors' && cSelection === 'paper')
  ) {
    result = 'Player won the round'
    pScore++
  } else {
    result = 'Computer won the round'
    cScore++
  }
  return [result, pScore, cScore]
}

//if a win state has been reached, return true and the winner string, else return false
function checkForWin(pScore, cScore) {
  if (pScore > 4) {
    return [true, 'PLAYER']
  } else if (cScore > 4) {
    return [true, 'COMPUTER']
  } else {
    return [false]
  }
}

function setUpIntroDisplay() {
  const gameContainer = document.querySelector('#container')
  const startButton = document.querySelector('#start-button')
  const introContainer = document.querySelector('#intro')

  gameContainer.style.display = 'none'

  startButton.addEventListener('click', () => {
    introContainer.style.display = 'none'
    gameContainer.style.display = 'flex'
  })
}

function updateDisplay(result, pScore, cScore) {
  document.querySelector('#instructions').textContent = `${result}`
  document.querySelector('#player-score').textContent = `${pScore}`
  document.querySelector('#computer-score').textContent = `${cScore}`
}

;(function game() {
  const gameButtons = Array.from(
    document.querySelectorAll('#game-buttons>button'),
  )
  let playerScore
  let computerScore
  let roundResult
  let gameOver
  let winner

  setUpIntroDisplay()

  document.querySelector('#play-again').addEventListener('click', () => {
    document.querySelector('#announcement').style.display = 'block'
    document.querySelector('#game-buttons').style.display = 'flex'
    document.querySelector('#play-again').style.display = 'none'
  })

  gameButtons.forEach((button) =>
    button.addEventListener('click', function (event) {
      //play a round and get the new statuses
      ;[roundResult, playerScore, computerScore] = playRound(
        event.target.textContent.toLowerCase(),
        getComputerChoice(),
        playerScore,
        computerScore,
      )
      ;[gameOver, winner] = checkForWin(playerScore, computerScore)

      //if one of the players reached 5 points, game is over
      if (gameOver) {
        updateDisplay(`${winner} WINS THE GAME!`, playerScore, computerScore)
        document.querySelector('#announcement').style.display = 'none'
        document.querySelector('#game-buttons').style.display = 'none'
        document.querySelector('#play-again').style.display = 'block'
        playerScore = 0
        computerScore = 0
        gameOver = false
      } else {
        updateDisplay(roundResult, playerScore, computerScore)
      }
    }),
  )
})()
