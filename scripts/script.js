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



let gamePlaying = true;
let player = [{
  name: 'computer1',
  health: 100
}, {
    name: 'computer2',
    health: 100,
  }];

  let p1 = player[0]
  let p2 = player[1]

  renderGame ()

function renderGame () {
p1Name.innerHTML = p1.name
p2Name.innerHTML = p2.name
p1Power.innerHTML = p1.health
p2Power.innerHTML = p2.health

//if (player1 <= 0 || player2 <= 0) {
  //gamePlaying = false
  //winner ();
//}
}


const attack = (attacker, enemy) => {
  let damage = Math.ceil(Math.random() * 10)
  console.log(damage)
  
  if (attacker > 0 && enemy > 0) {
    enemy -= damage
    console.log(enemy)
    renderGame ()
  }
}

attack (p1.health, p2.health)


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