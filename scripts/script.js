let p1Attack = document.getElementById('p1Attack');
let p2Attack = document.getElementById('p2Attack');
let p1Heal = document.getElementById('p1Heal');
let p2Heal = document.getElementById('p2Heal');
let p1Super = document.getElementById('p1Super');
let p2Super = document.getElementById('p2Super');
let p1Power = document.getElementById('p1Power');
let p2Power = document.getElementById('p2Power');
let names = document.getElementById('nameInput');
let nameEnter = document.getElementById('nameBtn');
let nameHeader = document.getElementById('nameHeader');
let p1Name = document.getElementById('p1Name');
let p2Name = document.getElementById('p2Name');


function getNames () {

  if (nameHeader.innerText === 'Player One Name') {
    p1Name.innerHTML = names.value
    nameHeader.innerHTML = 'Player Two Name'
  } else if (nameHeader.innerText === 'Player Two Name') {
    p2Name.innerHTML = names.value
    nameHeader.innerHTML = 'Player One Name'
  } 
  names.value = ''
}

nameEnter.addEventListener('click', () => {
  getNames ();
})
