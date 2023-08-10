let p1Attack = document.getElementById('p1Attack');
let p2Attack = document.getElementById('p2Attack');
let p1Heal = document.getElementById('p1Heal');
let p2Heal = document.getElementById('p2Heal');
let p1Super = document.getElementById('p1Super');
let p2Super = document.getElementById('p2Super');
let p1Power = document.getElementById('p1Power');
let p2Power = document.getElementById('p2Power');
let nameInp = document.getElementById('nameInput');
let nameEnter = document.getElementById('nameBtn');
let nameHeader = document.getElementById('nameHeader');
let p1Name = document.getElementById('p1Name');
let p2Name = document.getElementById('p2Name');
let outcome = document.getElementById('outcome')


let gamePlaying = true;
let player = [{
  name: 'excel',
  health: 100
}, {
    name: 'nonso',
    health: 100,
  }];

  let p1 = player[0]
  let p2 = player[1]

  renderGame (p1, p2)

function renderGame (player1, player2) {
p1Name.innerHTML = p1.name
p2Name.innerHTML = p2.name
p1Power.innerHTML = p1.health
p2Power.innerHTML = p2.health

if (player1.health === 0 || player2.health === 0) {
  gamePlaying = false

  if (player2.health < 1) {
    outcome.innerHTML = `${player1.name} wins`
  } else if  (player1.health < 1) {
    outcome.innerHTML = `${player2.name} wins`
  } else {
    outcome.innerHTML = `TIE`
  }
  //winner (p1,p2);
}
}


const attack = (attacker, enemy) => {
  let damage = Math.ceil(Math.random() * 10)
  //console.log(damage)
  
  if (attacker.health > 0 && enemy.health > 0) {
    enemy.health -= damage
    console.log(enemy.health)
    if (enemy.health < 0) {
      enemy.health = 0
    }
    
    renderGame (p1,p2)
  }
}

const superAttack = (attacker, enemy) => {
  let superStrike = Math.ceil((Math.random () * 10) + 10)
  console.log(superStrike)

  if (attacker.health > 0 && enemy.health > 0) {
    enemy.health -= superStrike

    if (enemy.health < 0) {
      enemy.health = 0
    }
    renderGame (p1, p2)
  }
}

const heal = (playerr) => {
  let recover = Math.ceil(Math.random () * 5)
  //console.log(recover)
  playerr.health += recover
  console.log (playerr.health)
  if (playerr.health > 100) {
    playerr.health = 100
    console.log(playerr.health)
    
  }
  renderGame (p1,p2)
}

/*const winner = (pl1, pl2) => {
  if (gamePlaying === false && pl2.health < 1) {
    outcome.innerHTML = `${p1.name} wins`
  } else if  (gamePlaying === false && pl1.health < 1) {
    outcome.innerHTML = `${p2.name} wins`
  } 
}*/

document.addEventListener('keydown', (events) => {
  if (events.key === 'q' && gamePlaying === true && p2.health > 0) {
    attack (p1, p2)
  }
})

document.addEventListener('keydown', (events) => {
  if (events.key === 'z' && gamePlaying === true && p2.health > 0) {
    superAttack (p1, p2)
  }
})

document.addEventListener('keydown', (events) => {
  if (events.key === 'a' && gamePlaying === true && p1.health > 0 ) {
    heal (p1);
  }
})





document.addEventListener('keydown', (events) => {
  if (events.key === 'o' && gamePlaying === true && p1.health > 0) {
    attack (p2, p1)
  }
})

document.addEventListener('keydown', (events) => {
  if (events.key === 'm' && gamePlaying === true && p1.health > 0) {
    superAttack (p2, p1)
  }
})

document.addEventListener('keydown', (events) => {
  if (events.key === 'k'  && gamePlaying === true && p2.health > 0) {
    heal (p2);
  }
})

/*function getnameInp () {

  if (nameHeader.innerText === 'Player One Name') {
    p1Name.innerHTML = nameInp.value
    if (p1Name.innerHTML === 'player One' && nameInp.value === '' ) {
      p1Name.innerHTML = 'Computer'
    }
    p1Name.innerHTML = nameInp.value
    nameHeader.innerHTML = 'Player Two Name'
  } else if (nameHeader.innerText === 'Player Two Name') {
    p2Name.innerHTML = nameInp.value
    nameHeader.innerHTML = 'Player One Name'
  } 
  nameInp.value = '';
}

nameEnter.addEventListener('click', () => {
  getnameInp ();
})
*/