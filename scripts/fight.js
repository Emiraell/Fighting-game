//strike to cause damage on opponent
let damageAmt = 0;
let damaged = false;

const strike = (attacker, enemy) => {

  //check if both players name are ready before striking
  if (gottenPlayerNames === true) {
  let damage = Math.ceil(Math.random() * 10)
  damageAmt = damage;
  //if (attacker.striked === true) {
    attacker.striked = false;
  //}
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
      }
      styleHealth (enemy);
      /*if (enemy === p1) {
        p1Power.style.color = "red"
        document.getElementById('strikeSound1').play();
      } else {
        p2Power.style.color = "red"
        document.getElementById('strikeSound2').play();
      }*/
      renderGame (p1,p2)
    }

  
  
  }
  return damaged;
};

const styleHealth = (player) => {

  /*if (p1 === player) {
    p1Power.style.color = "green"
    document.getElementById('defendSound1').play();
  } else {
    p2Power.style.color = "green"
    document.getElementById('defendSound2').play();
  };*/

  if (player === p1 && damaged === true && superDamaged === false && healed == false) {
    p1Power.style.color = "red"
    document.getElementById('strikeSound1').play();
  } else if (player === p2 && damaged === true && superDamaged === false && healed == false) {
    p2Power.style.color = "red"
    document.getElementById('strikeSound2').play();
  } else if (player === p1 && superDamaged === true && damaged === false && healed == false) {
    p1Power.style.color = "orange";
    document.getElementById('superStrikeSound1').play();
  } else if (player === p2 && superDamaged === true && damaged === false && healed == false) {
    p2Power.style.color = "orange";
    document.getElementById('superStrikeSound2').play();
  } else if (p1 === player && healed === true) {
    p1Power.style.color = "blue"
    document.getElementById('healSound1').play();
  } else if (p2 === player && healed === true) {
    p2Power.style.color = "blue"
    document.getElementById('healSound2').play();
  } else if (p1 === player) {
    p1Power.style.color = "green"
    document.getElementById('defendSound1').play();
  } else if (p2 === player) {
    p2Power.style.color = "green"
    document.getElementById('defendSound2').play();
  }
  
}
//Super strike to inflict heavier damage on opponent
let superDamageAmt = 0;
let superDamaged = false;

const superStrike = (attacker, enemy) => {

  // also check if both players name are ready before striking
  if (gottenPlayerNames === true) {
    let superStrikeAmt = Math.ceil((Math.random () * 10) + 10);
    superDamageAmt = superStrikeAmt;
  //if (attacker.striked === true) {
    attacker.striked = false;
  //}
    if (attacker.health > 0 && enemy.health > 0) {
      //on striking, inflict a heavy damaged between 10 and 20 on the enemy
      enemy.health -= superStrikeAmt;
      enemy.striked = true;
      superDamaged = true;
      damaged = false
      healed = false;

      if (enemy.health < 0) {
        enemy.health = 0;
      }
      styleHealth (enemy)
     /* if (p1 === enemy) {
        p1Power.style.color = "red";
        document.getElementById('superStrikeSound1').play();
      } else {
        p2Power.style.color = "red";
        document.getElementById('superStrikeSound2').play();
      }*/
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
    healed = false
    styleHealth (defender)
    /*if (p1 === defender) {
      p1Power.style.color = "green"
      document.getElementById('defendSound1').play();
    } else {
      p2Power.style.color = "green"
      document.getElementById('defendSound2').play();
    }*/
  } else if (defender.striked === true && superDamaged === true && healed === false) {
    //recover the last amount if defender was super striked
    defender.health += superDamageAmt;
    superDamaged = false;
    defender.striked = false;
    healed = false
    styleHealth(defender)
    /*if (p1 === defender) {
      p1Power.style.color = "green"
      document.getElementById('defendSound1').play();
    } else {
      p2Power.style.color = "green"
      document.getElementById('defendSound2').play();
    }*/
  }
  renderGame (p1,p2);
};

//player recover a significant health after being striked
const heal = (healer) => {

  let recoverAmt = Math.ceil(Math.random () * 8);
  //player recover an amount of health between  1-8
  healer.health += recoverAmt;
  healed = true;
  superDamaged = false
  damaged = false
  
  styleHealth(healer)
  /*if (p1 === player) {
    p1Power.style.color = "blue"
    document.getElementById('healSound1').play();
  } else {
    p2Power.style.color = "blue"
    document.getElementById('healSound2').play();
  }*/

  if (healer.health > 100) {
    //keeps player health below 100
    healer.health = 100;
  }
  renderGame (p1,p2);
};

/*const winner = (pl1, pl2) => {
  if (gamePlaying === false && pl2.health < 1) {
    outcome.innerHTML = `${p1.name} wins`
  } else if  (gamePlaying === false && pl1.health < 1) {
    outcome.innerHTML = `${p2.name} wins`
  } 
}*/

//reset entire game at any point in the game
function reset () {

playerIndicator.hidden = true;
playerIndicator.classList.remove('nameTittle');
nameIndicator.classList.remove('namesDiv');
p1Image.classList.remove('image1');
p2Image.classList.remove('image2');
p1Image.innerHTML = ''
p2Image.innerHTML = ''
nameHeader.innerHTML = 'Player One'
nameSection.hidden = false;
document.getElementById('start').innerHTML = '';
document.body.style.backgroundImage = "none"
document.body.style.backgroundSize = "none"
gottenPlayerNames = false

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
damaged = false
superDamageAmt = 0;
superDamaged = false;
gamePlaying = false;
healed = false
p1Power.style.color = "white"
p2Power.style.color = "white"

  

 /* playerIndicator.hidden = true;
  playerIndicator.classList.remove('nameTittle')
  nameIndicator.classList.remove('namesDiv')

  gamePlaying = false
  player = [{
    name: '',
    health: 100,
    striked: false
  }, {
      name: '',
      health: 100,
      striked: false
    }];

    nameSection.hidden = false;
    document.body.style.backgroundImage ="none"
    p1Image.classList.add('image1')
    p2Image.classList.add('image2')
    p1Image.innerHTML = ''
    p2Image.innerHTML = ''
    p1Image.classList.remove('image1')
    p2Image.classList.remove('image2')
    p1Name.innerHTML = player[0].name
    p2Name.innerHTML = player[1].name
    p1Power.innerHTML = ''
    p2Power.innerHTML = ''*/
};

//player one controls
document.addEventListener('keyup', (events) => {
  if (events.key === 'w' && gamePlaying === true && p2.health > 0) {
    strike (p1, p2);
    p2Power.style.color = "red";
  }
});
document.addEventListener('keyup', (events) => {
  if (events.key === 'z' && gamePlaying === true && p2.health > 0) {
    p2Power.style.color = "red";
    superStrike (p1, p2);
  }
});
document.addEventListener('keyup', (events) => {
  if (events.key === 'a' && gamePlaying === true && p1.health > 0 ) {
    heal (p1);
    p1Power.style.color = "blue";
  }
});
document.addEventListener('keydown', (events) => {
  if (events.key === 'd' && gamePlaying === true && p1.health > 0) {
    defend (p1);
    p1Power.style.color = "green";
  }
});

//player two controls
document.addEventListener('keyup', (events) => {
  if (events.key === 'i' && gamePlaying === true && p1.health > 0) {
    strike (p2, p1);
    p1Power.style.color = "red";
  }
})
document.addEventListener('keyup', (events) => {
  if (events.key === 'm' && gamePlaying === true && p1.health > 0) {
    superStrike (p2, p1);
    p1Power.style.color = "red";
  }
});
document.addEventListener('keyup', (events) => {
  if (events.key === 'j'  && gamePlaying === true && p2.health > 0) {
    heal (p2);
    p2Power.style.color = "blue";
  }
});
document.addEventListener('keydown', (events) => {
  if (events.key === 'k' && gamePlaying === true && p2.health > 0) {
    defend (p2);
    p2Power.style.color = "green";
  }
})