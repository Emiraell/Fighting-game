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
let outcome = document.getElementById('outcome');


let gamePlaying = true;
let healed = false;
let striked = false;
//let executed = false

let player = [{
  name: 'excel',
  health: 100,
  striked: false,

}, {
    name: 'nonso',
    health: 100,
    striked: false,
  }];

  //console.log(player)  
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
};

let damageAmt = 0;
let damaged = false
const strike = (attacker, enemy) => {
  let damage = Math.ceil(Math.random() * 10)
  damageAmt = damage
  //console.log(damage)
  if (attacker.strike === true) {
    attacker.strike = false
  }
  if (attacker.health > 0 && enemy.health > 0) {
    enemy.health -= damage
    enemy.strike = true
    //console.log(enemy.health)
    if (enemy.health < 0) {
      enemy.health = 0
    }
    
    renderGame (p1,p2)
  }
  //console.log(player)
  //executed = true;
  //striked = true;
  healed = false
  damaged = true;
  return damaged
};


let superDamageAmt = 0;
let superDamaged = false;
//let unstrikedHealth;

const superStrike = (attacker, enemy) => {
  
  let superStrikeAmt = Math.ceil((Math.random () * 10) + 10)
  superDamageAmt = superStrikeAmt
  //console.log(superStrikeAmt)
  if (attacker.strike === true) {
    attacker.striked = false
  }

  if (attacker.health > 0 && enemy.health > 0) {
    enemy.health -= superStrikeAmt
    enemy.striked = true
    //enemy.strikedHealth = enemy.health
    //console.log(enemy.strikedHealth)

    if (enemy.health < 0) {
      enemy.health = 0
    }
    renderGame (p1, p2)
  }
  //console.log(player)
  //executed = true
  //striked = true
  healed = false
  superDamaged = true
  return superDamaged
}

const defend = (attacker, defender) => {

  if (defender.strike === true && damaged === true && healed === false) {
    defender.health += damageAmt
    damaged = false
    defender.strike = false
    striked = false
  } else if (defender.strike === true && superDamaged === true && healed === false) {
  defender.health += superDamageAmt
  superDamaged = false
  defender.strike = false
  //striked = false
  }
//console.log(player)
  //executed = true
  
  renderGame (p1,p2)
}


const heal = (playerr) => {

  let recoverAmt = Math.ceil(Math.random () * 8)
  //console.log(recover)
  playerr.health += recoverAmt
  healed = true
  //console.log (playerr.health)
  if (playerr.health > 100) {
    playerr.health = 100
    //console.log(playerr.health) 
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

document.addEventListener('keyup', (events) => {
  if (events.key === 'w' && gamePlaying === true && p2.health > 0) {
    strike (p1, p2)
  }
})

document.addEventListener('keyup', (events) => {
  if (events.key === 'z' && gamePlaying === true && p2.health > 0) {
    superStrike (p1, p2)
  }
})

document.addEventListener('keyup', (events) => {
  if (events.key === 'a' && gamePlaying === true && p1.health > 0 ) {
    heal (p1);
  }
})

document.addEventListener('keydown', (events) => {
  if (events.key === 'd' && gamePlaying === true && p1.health > 0) {
    defend (p2, p1)
  }
})



document.addEventListener('keyup', (events) => {
  if (events.key === 'i' && gamePlaying === true && p1.health > 0) {
    strike (p2, p1)
  }
})

document.addEventListener('keyup', (events) => {
  if (events.key === 'm' && gamePlaying === true && p1.health > 0) {
    superStrike (p2, p1)
  }
})

document.addEventListener('keyup', (events) => {
  if (events.key === 'j'  && gamePlaying === true && p2.health > 0) {
    heal (p2);
  }
})

document.addEventListener('keydown', (events) => {
  if (events.key === 'k' && gamePlaying === true && p2.health > 0) {
    defend (p1, p2)
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