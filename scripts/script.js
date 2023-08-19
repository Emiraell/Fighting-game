//Divs needed for the entire game
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
let nameSection = document.getElementById('nameGetter');
let p1Image = document.getElementById('p1Image');
let p2Image = document.getElementById('p2Image');
let nameIndicator = document.getElementById('nameIndicator');
let playerIndicator = document.getElementById('playerIndicator');

//initialiaztion
playerIndicator.hidden = true;
playerIndicator.classList.remove('nameTittle');
nameIndicator.classList.remove('namesDiv');
p1Image.classList.remove('image1');
p2Image.classList.remove('image2');

//Creating variables needed in the game
let gamePlaying = true;
let healed = false;
let gottenPlayerNames = false

let player = [{
  name: '',
  health: 100,
  striked: false
}, {
    name: '',
    health: 100,
    striked: false
  }];

  let p1 = player[0];
  let p2 = player[1];
  

  //fighter images
  let p1Fighters = [
    "images/fighters/fighter3.gif",
    "images/fighters/fighter4.gif",
    "images/fighters/fighter5.gif",
    "images/fighters/fighter7.gif",
  ];

  let p2Fighters = [
    "images/fighters/fighter1.gif",
    "images/fighters/fighter2.gif",
    "images/fighters/fighter6.gif",
    "images/fighters/fighter8.gif",
  ];

  //background images
  let background = [
    "images/backgrounds/background1.gif",
    "images/backgrounds/background2.gif",
    "images/backgrounds/background3.gif",
    "images/backgrounds/background4.gif",
    "images/backgrounds/background5.gif",
    "images/backgrounds/background6.gif",
    "images/backgrounds/background7.gif",
    "images/backgrounds/background8.gif",
    "images/backgrounds/background9.gif"
  ];
  
  //Get player names, save and display them
  function getPlayerNames () {
    playerIndicator.hidden = false;
    playerIndicator.classList.add('nameTittle');
    nameIndicator.classList.add('namesDiv');
    
    if (nameHeader.innerText === 'Player One') {
      //get player one name
      p1.name = nameInp.value;

      if (nameInp.value === '') {
        p1.name = 'Player 1';
      }
      //get random image for player one and display it
      const randomValue = Math.floor(Math.random () * p1Fighters.length);
      p1Image.innerHTML = `<img src=${p1Fighters[randomValue]} alt="">`;
      p2Image.classList.add('image2');

      nameHeader.innerText = 'Player Two';
      p2.health = '';
    } else  {
      //get player two name, save and display it
      p2.name = nameInp.value

      if (p1.name !== 'Player 1' && nameInp.value === '') {
        p2.name = 'computer';
      } else if (p1.name === 'Player 1' && nameInp.value !== '') {
        p1.name = 'computer';
      } else if (nameInp.value === '') {
        p2.name = 'Player 2';
      }
      //get random image for player two and display it
      const randomValue = Math.floor(Math.random () * p2Fighters.length)
      p2Image.innerHTML = `<img src=${p2Fighters[randomValue]} alt="">`

      p2.health = 100
      nameHeader.innerHTML = 'Player One';

      //hid html elements used in getting player names after getting player two name
      setTimeout(() => {
        playerIndicator.hidden = true;
        playerIndicator.classList.remove('nameTittle');
      },1000)

      //start the game after collecting player names
      startGame ();
    }

    renderGame (p1, p2);
    nameInp.value = '';
  };

  //set background and all that's needed for the game to start playing
const startGame =  () => {
  
  if (p1.name !== '' && p2.name !== '') {
    nameSection.hidden = true;

    setTimeout (() => {
      document.getElementById('start').innerHTML = 'FIGHT!!!!!';

      setTimeout (() => {
        document.getElementById('start').innerHTML = '';

        //pick a fighting background at random
        let randNum = Math.floor(Math.random() * background.length);
        document.body.style.backgroundImage = `url(${background[randNum]})`;
        document.body.style.backgroundSize = "cover";
        gottenPlayerNames = true;
      }, 2000);
    }, 1000);
  }
}; 

//display updated action of the game at every point in the game
function renderGame (player1, player2) {
  p1Name.innerHTML = p1.name;
  p2Name.innerHTML = p2.name;
  p1Power.innerHTML = p1.health;
  p2Power.innerHTML = p2.health;

  //check if game is over
  if (player1.health === 0 || player2.health === 0) {
    gamePlaying = false;

    //declare winner
    if (player2.health < 1) {
      document.getElementById('start').innerHTML = `${player1.name} wins`;
    } else if  (player1.health < 1) {
      document.getElementById('start').innerHTML = `${player2.name} wins`;
    } else {
      document.getElementById('start').innerHTML = `TIE`;
    }
  }
};

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
      //make sure enemy's health never goes below zero
      if (enemy.health < 0) {
        enemy.health = 0;
      }
      
      /*if (p1 === enemy) {
        p1Power.style.color = "red"
      } else {
        p2Power.style.color = "red"
      }*/
      renderGame (p1,p2)
    }

  healed = false
  damaged = true;
  }
  return damaged;
};

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

      if (enemy.health < 0) {
        enemy.health = 0;
      }
      renderGame (p1, p2);
    }
  healed = false;
  superDamaged = true;
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
  } else if (defender.striked === true && superDamaged === true && healed === false) {
    //recover the last amount if defender was super striked
    defender.health += superDamageAmt;
    superDamaged = false;
    defender.striked = false;
  }
  renderGame (p1,p2);
};

//player recover a significant health after being striked
const heal = (player) => {

  let recoverAmt = Math.ceil(Math.random () * 8);
  //player recover an amount of health between  1-8
  player.health += recoverAmt;
  healed = true;
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
    defend (p2, p1);
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
    defend (p1, p2);
    p2Power.style.color = "green";
  }
});