//returns random string 'rock' 'paper' or 'scissors'
function getComputerChoice() {
  let randomNumber = Math.floor(Math.random() * 3) + 1

  switch (randomNumber) {
    case 1:
      return 'rock'
      break
    case 2:
      return 'paper'
      break
    case 3:
      return 'scissors'
  }
}

//returns string 'rock' 'paper' or 'scissors' based on user input
function getPlayerChoice() {
  let valid
  let playerInput

  while (!valid) {
    playerInput = prompt('Rock, paper, or scissors?').toLowerCase()

    if (
      playerInput === 'rock' ||
      playerInput === 'paper' ||
      playerInput === 'scissors'
    ) {
      valid = true
    }
  }

  return playerInput
}

//plays a round and returns a string that announces the result
function playRound(playerSelection, computerSelection) {
  let resultAnnouncement

  if (playerSelection === computerSelection) {
    resultAnnouncement = `Tie! ${playerSelection[0].toUpperCase()}${playerSelection.slice(
      1,
    )} ties with ${computerSelection}.`
  } else if (
    (playerSelection === 'rock' && computerSelection === 'scissors') ||
    (playerSelection === 'paper' && computerSelection === 'rock') ||
    (playerSelection === 'scissors' && computerSelection === 'paper')
  ) {
    resultAnnouncement = `You win the round! ${playerSelection[0].toUpperCase()}${playerSelection.slice(
      1,
    )} beats ${computerSelection}.`
  } else {
    resultAnnouncement = `You lose the round. ${computerSelection[0].toUpperCase()}${computerSelection.slice(
      1,
    )} beats ${playerSelection}.`
  }

  return resultAnnouncement
}

//plays five rounds, logging the each result in the console, and announcing the result of the game
function game() {
    let roundCount = 0;
    let playerWins = 0;
    let computerWins = 0;

    while (roundCount <5) {
        let round = playRound(getPlayerChoice(), getComputerChoice())
        let resultIndictor = round.slice(4, 5)

        if (resultIndictor === 'w') {
            playerWins++;
        } else if (resultIndictor === 'l') {
            computerWins++;
        } 

        console.log(round)

        roundCount++;
    }

    if (playerWins > computerWins) {
        console.log(`Player wins the game!`)
    } else if (computerWins > playerWins) {
        console.log(`Computer wins the game.`)
    } else {
        console.log(`Game over with a tie.`)
    }
}

game()
