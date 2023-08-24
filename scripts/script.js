//Divs needed for the entire game
let p1Power = document.getElementById('p1Power');
let p2Power = document.getElementById('p2Power');
let nameInput = document.getElementById('nameInput');
let nameEnter = document.getElementById('nameBtn');
let nameHeader = document.getElementById('nameHeader');
let p1Name = document.getElementById('p1Name');
let p2Name = document.getElementById('p2Name');
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

let playerInfo = [{
  name: '',
  health: 100,
  striked: false
}, {
    name: '',
    health: 100,
    striked: false
}];

let p1 = playerInfo[0];
let p2 = playerInfo[1];

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

const rules = () => {
  let rules = [ 
    "Game cannot be accessed without player names",
    "Users can click to enter dafualt names for both players",
    "Game ends when either of the player's health hits zero(0)",
    "Users can also use the keys/alphabet on their keyboard to play the game",
    "Strike inflicts damage of 1-10 on enemy's health",
    "Super Strike(sStrike) inflicts damage of 1-10 on enemy's health",
    "Heal allows player to recover an amount between 1-8",
    "Defend allows only the player to take a hit to recover the their last health",
    "Players can only defend once and can't defend after healing",
    "Reset can be used at any point in the game to reset the game"
  ];

  if (document.getElementById('rules').innerHTML === '') {
    rules.forEach((rule) => {
      document.getElementById('rules').innerHTML += `
       <li>${rule} <li> `
    })
  } else {
    document.getElementById('rules').innerHTML = ''
  }
  
}
//Get player names, save and display them
function getPlayerNames () {
  playerIndicator.hidden = false;
  playerIndicator.classList.add('nameTittle');
  nameIndicator.classList.add('namesDiv');
  
  if (nameHeader.innerText === 'Player One') {
    //get player one name
    p1.name = nameInput.value;

    if (nameInput.value === '') {
      p1.name = 'Player 1';
    }
    //get random image for player one and display it
    const ImageValue = Math.floor(Math.random () * p1Fighters.length);
    p1Image.innerHTML = `<img src=${p1Fighters[ImageValue]} alt="">`;
    p2Image.classList.add('image2');

    nameHeader.innerText = 'Player Two';
    p2.health = '';
  } else  {
    //get player two name, save and display it
    p2.name = nameInput.value

    if (p1.name !== 'Player 1' && nameInput.value === '') {
      p2.name = 'computer';
    } else if (p1.name === 'Player 1' && nameInput.value !== '') {
      p1.name = 'computer';
    } else if (nameInput.value === '') {
      p2.name = 'Player 2';
    }
    //get random image for player two and display it
    const ImageValue = Math.floor(Math.random () * p2Fighters.length)
    p2Image.innerHTML = `<img src=${p2Fighters[ImageValue]} alt="">`
    p1Image.classList.add('image1');

    p2.health = 100;
    nameHeader.innerHTML = 'Player One';

    //hide html elements used in getting player names after getting player two name
    setTimeout(() => {
      playerIndicator.hidden = true;
      playerIndicator.classList.remove('nameTittle');
    },1000);

    //start the game after collecting player names
    startGame ();
  };

  renderGame (p1, p2);
  nameInput.value = '';
};


//set background and all that's needed for the game to start playing
const startGame =  () => {

  nameSection.hidden = true;
  document.getElementById('rules').innerHTML = '';
  document.getElementById('ruleSec').hidden = true;
  setTimeout (() => {
    document.getElementById('start').innerHTML = 'FIGHT!!!!!';
    document.getElementById('start').style.color ="#dd2b2b"
    document.getElementById('startSound').play();

    //pick a fighting background at random
    let backgroundValue = Math.floor(Math.random() * background.length);
    document.body.style.backgroundImage = `url(${background[backgroundValue]})`;
    document.body.style.backgroundSize = "cover";
    gottenPlayerNames = true;

    setTimeout (() => {
      document.getElementById('start').innerHTML = '';
    }, 2000);
  }, 1000);
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

    //declare winner if game is not playing
    if (player2.health < 1) {
      document.getElementById('start').innerHTML = `${player1.name} wins`;
      document.getElementById('start').style.color = "#1db91d";
      document.getElementById('victorySound').play();
    } else if  (player1.health < 1) {
      document.getElementById('start').innerHTML = `${player2.name} wins`;
      document.getElementById('start').style.color = "#1db91d";
      document.getElementById('victorySound').play();
    } else {
      document.getElementById('start').innerHTML = `TIE`;
      document.getElementById('start').style.color = "#1db91d"
      document.getElementById('victorySound').play();
    }
  }
};