//strike to cause damage on opponent
let damageAmt = 0;
let damaged = false;

const strike = (attacker, enemy) => {

  //check if both players name are ready before striking
  if (gottenPlayerNames === true) {
    let damage = Math.ceil(Math.random() * 10)
    damageAmt = damage;
    attacker.striked = false;
    if (attacker.health > 0 && enemy.health > 0) {

      //on striking, inflict a random damaged between 1 and 10 on the enemy
      enemy.health -= damage;
      enemy.striked = true;
      damaged = true;
      superDamaged = false
      healed = false

      //make sure enemy's health never goes below zero
      if (enemy.health < 0) {
        enemy.health = 0;
      };
      styleHealth (enemy);
      renderGame (p1,p2);
    }
  }
  return damaged;
};


//style player health and play sound according to action taken
const styleHealth = (player) => {

  if (player === p1 && damaged === true && superDamaged === false && healed == false) {
    p1Power.style.color = "red";
    document.getElementById('strikeSound1').play();
  } else if (player === p2 && damaged === true && superDamaged === false && healed == false) {
    p2Power.style.color = "red";
    document.getElementById('strikeSound2').play();
  } else if (player === p1 && superDamaged === true && damaged === false && healed == false) {
    p1Power.style.color = "orange";
    document.getElementById('superStrikeSound1').play();
  } else if (player === p2 && superDamaged === true && damaged === false && healed == false) {
    p2Power.style.color = "orange";
    document.getElementById('superStrikeSound2').play();
  } else if (p1 === player && healed === true) {
    p1Power.style.color = "blue";
    document.getElementById('healSound1').play();
  } else if (p2 === player && healed === true) {
    p2Power.style.color = "blue";
    document.getElementById('healSound2').play();
  } else if (p1 === player) {
    p1Power.style.color = "green";
    document.getElementById('defendSound1').play();
  } else if (p2 === player) {
    p2Power.style.color = "green";
    document.getElementById('defendSound2').play();
  }
};


//Super strike to inflict heavier damage on opponent
let superDamageAmt = 0;
let superDamaged = false;

const superStrike = (attacker, enemy) => {

  // also check if both players name are ready before striking
  if (gottenPlayerNames === true) {
    let superStrikeAmt = Math.ceil((Math.random () * 10) + 10);
    superDamageAmt = superStrikeAmt;
    attacker.striked = false;

    if (attacker.health > 0 && enemy.health > 0) {
      //on striking, inflict a heavy damaged between 10 and 20 on the enemy
      enemy.health -= superStrikeAmt;
      enemy.striked = true;
      superDamaged = true;
      damaged = false;
      healed = false;

      if (enemy.health < 0) {
        enemy.health = 0;
      }
      styleHealth (enemy);
      renderGame (p1, p2);
    }
    return superDamaged;
  }
};


//recovering the last amount of damaged done to an enemy
//only the last player striked || superstriked can recover and it's just once 
const defend = (defender) => {

  if (defender.striked === true && damaged === true && healed === false) {
    //recover the last amount if defender was striked
    defender.health += damageAmt;
    damaged = false;
    defender.striked = false;
    healed = false;
    styleHealth (defender);
    renderGame (p1,p2);
  } else if (defender.striked === true && superDamaged === true && healed === false) {
    //recover the last amount if defender was super striked
    defender.health += superDamageAmt;
    superDamaged = false;
    defender.striked = false;
    healed = false;
    styleHealth (defender);
    renderGame (p1,p2);
  }
};

//player recover a significant health after taking a hit
const heal = (healer) => {

  let recoverAmt = Math.ceil(Math.random () * 8);
  //player recover an amount of health between  1-8
  if (healer.health > 0 && healer.health !== 100 && gamePlaying != false) {
  healer.health += recoverAmt;
  healed = true;
  superDamaged = false;
  damaged = false;

    if (healer.health > 100) {
      //keeps player health below 100
      healer.health = 100;
    }
    styleHealth(healer);
    renderGame (p1,p2);
  }
};

//reset entire game at any point in the game
function reset () {

playerIndicator.hidden = true;
playerIndicator.classList.remove('nameTittle');
nameIndicator.classList.remove('namesDiv');
p1Image.classList.remove('image1');
p2Image.classList.remove('image2');
p1Image.innerHTML = '';
p2Image.innerHTML = '';
nameHeader.innerHTML = 'Player One';
nameSection.hidden = false;
document.getElementById('start').innerHTML = '';
document.getElementById('start').style.color = "white"
document.body.style.backgroundImage = "none";
document.body.style.backgroundSize = "none";
document.getElementById('rules').innerHTML = '';
document.getElementById('ruleSec').hidden = false;
p1Power.style.color = "white";
p2Power.style.color = "white";

playerInfo = [{
  name: '',
  health: 100,
  striked: false
}, {
    name: '',
    health: 100,
    striked: false
  }];

  p1 = playerInfo[0];
  p2 = playerInfo[1];

  p1Name.innerHTML = p1.name;
  p2Name.innerHTML = p2.name;
  p1Power.innerHTML = '';
  p2Power.innerHTML = '';

damageAmt = 0;
damaged = false;
superDamageAmt = 0;
superDamaged = false;
gamePlaying = false;
healed = false;
gottenPlayerNames = false;
};

//player one controls
document.addEventListener('keyup', (events) => {
  if (events.key === 'w' && gamePlaying === true && p2.health > 0) {
    strike (p1, p2);
  }
});
document.addEventListener('keyup', (events) => {
  if (events.key === 'z' && gamePlaying === true && p2.health > 0) {
    superStrike (p1, p2);
  }
});
document.addEventListener('keyup', (events) => {
  if (events.key === 'a' && gamePlaying === true && p1.health > 0 ) {
    heal (p1);
  }
});
document.addEventListener('keydown', (events) => {
  if (events.key === 'd' && gamePlaying === true && p1.health > 0) {
    defend (p1);
  }
});

//player two controls
document.addEventListener('keyup', (events) => {
  if (events.key === 'i' && gamePlaying === true && p1.health > 0) {
    strike (p2, p1);
  }
});
document.addEventListener('keyup', (events) => {
  if (events.key === 'm' && gamePlaying === true && p1.health > 0) {
    superStrike (p2, p1);
  }
});
document.addEventListener('keyup', (events) => {
  if (events.key === 'j'  && gamePlaying === true && p2.health > 0) {
    heal (p2);
  }
});
document.addEventListener('keydown', (events) => {
  if (events.key === 'k' && gamePlaying === true && p2.health > 0) {
    defend (p2);
  }
});