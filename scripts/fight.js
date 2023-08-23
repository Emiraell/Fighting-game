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
      //make sure enemy's health never goes below zero
      if (enemy.health < 0) {
        enemy.health = 0;
      }
      
      if (enemy === p1) {
        p1Power.style.color = "red"
        document.getElementById('strikeSound1').play();
      } else {
        p2Power.style.color = "red"
        document.getElementById('strikeSound2').play();
      }
      renderGame (p1,p2)
    }

  healed = false
  
  }
  return damaged;
};

const styleHealth = (player) => {
  if (player === p1 && superDamaged === true) {
    p1Power.style.color = "red";
    document.getElementById('superStrikeSound1').play();
  } else {
    p2Power.style.color = "red";
    document.getElementById('superStrikeSound2').play();
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

      if (enemy.health < 0) {
        enemy.health = 0;
      }

      if (p1 === enemy) {
        p1Power.style.color = "red";
        document.getElementById('superStrikeSound1').play();
      } else {
        p2Power.style.color = "red";
        document.getElementById('superStrikeSound2').play();
      }
      renderGame (p1, p2);
    }
  healed = false;
  
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

    if (p1 === defender) {
      p1Power.style.color = "green"
      document.getElementById('defendSound1').play();
    } else {
      p2Power.style.color = "green"
      document.getElementById('defendSound2').play();
    }
  } else if (defender.striked === true && superDamaged === true && healed === false) {
    //recover the last amount if defender was super striked
    defender.health += superDamageAmt;
    superDamaged = false;
    defender.striked = false;
    
    if (p1 === defender) {
      p1Power.style.color = "green"
      document.getElementById('defendSound1').play();
    } else {
      p2Power.style.color = "green"
      document.getElementById('defendSound2').play();
    }
  }
  renderGame (p1,p2);
};

//player recover a significant health after being striked
const heal = (player) => {

  let recoverAmt = Math.ceil(Math.random () * 8);
  //player recover an amount of health between  1-8
  player.health += recoverAmt;
  healed = true;
  if (p1 === player) {
    p1Power.style.color = "blue"
    document.getElementById('healSound1').play();
  } else {
    p2Power.style.color = "blue"
    document.getElementById('healSound2').play();
  }

  if (player.health > 100) {
    //keeps player health below 100
    player.health = 100;
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
    p2Power.innerHTML = ''
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
});