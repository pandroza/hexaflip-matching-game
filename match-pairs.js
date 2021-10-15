/*This is a Hexaflip Based matching pairs game using Font Awesome Icons.*/

/*The Hexaflip JS code has been modified so it accepts Font Awesome icons. If text values given to hexes have the letters "fas fa" or "far fa" in it, it is treated as a Font Awesome icon and becomes a class inside a <i> element inside hex. 
*/
/*In CSS "pointer-events: none" added to "hexaflip-cube" class. This disables drag ability from Hexaflip code*/

/*Find Hexaflip at: https://oxism.com/hexaflip/ */

/*Note: Today's date: 4/30/21. If downloading Hexaflip plugin at oxism.com, download from the github source provided. The other source provided in the codrops article is out of date*/

//Code for matching game

//Icons for Main game
var iconArr = [
  "fas fa-atom",
  "fas fa-dragon",
  "fas fa-kiwi-bird",
  "fas fa-flask",
  "fas fa-ghost",
  "fas fa-eye",
  "fas fa-meteor",
  "fas fa-yin-yang ",
  "fas fa-pastafarianism",
  "fas fa-dungeon",
  "fas fa-virus"
];
//Icons for Start screen
var iconArr2 = ["C","L","I","C","K","fas fa-ghost","A","T","O","M","fas fa-ghost","T","O","fas fa-ghost","S","T","A","R","T","fas fa-ghost"];
//Goes into selectedHex. this.status controls if hex flippable or not. 1 = flippable 2 = unflippable 3 = paired and unflippable
var hexInfo = function (name, status) {
  (this.name = name), (this.status = status);
};
//Array of Objects built in icon shuffle function
var selectedHex = [];
//Counts if hex flipped is the 1st or 2nd
var hexCount = 0;
//Stores index of clicked hexes
var hexVals = [];
//Stores names of clicked hexes
var flippedVals = [];
//Counts how many pairs found
var pairCount = 10;
//Counts how many tries
var triesCount = 0;
//Array for building Hexaflips
var hexes = [];
//Stores string version of hex names
var nameStr;
//Change of color vars
var r = document.querySelector(':root');
var myColors = ["hotpink","mediumspringgreen","orange","yellow","turquoise"];
var newColor = false;
var nc = 3;
var hexEls = document.getElementsByClassName("hexClass");
var startIcon = document.getElementById("iconStart");
var tries = document.getElementById("tries");
//var for intro screen
var intro = true;
//Creates Array of Objects of icons and shuffles it
function iconShuffle() {
  var icons = [];
  for (var i = 1; i < 11; i++) {
    icons.push(iconArr[i]);
  }
  var possibleFaces = icons.slice(0);
  for (var i = 0; i < 20 / 2; i++) {
    var randomInd = Math.floor(Math.random(possibleFaces.length));
    var face = possibleFaces[randomInd];
    // Push twice onto array
    selectedHex.push(new hexInfo(face, 2));
    selectedHex.push(new hexInfo(face, 2));
    possibleFaces.splice(randomInd, 1);
  }
  var shuffleArray = function (array) {
    var counter = array.length;
    while (counter > 0) {
      var ind = Math.floor(Math.random() * counter);
      counter--;
      var temp = array[counter];
      array[counter] = array[ind];
      array[ind] = temp;
    }
  };
  shuffleArray(selectedHex);
  console.log(selectedHex);
}
//Start Screen
function introduction(){
  var introVar = setInterval(myintro, 2000);
    function myintro() {
    if(intro === true){  
    hexes[5].flipBack();
    hexes[10].flipBack();
    hexes[13].flipBack();
    hexes[19].flipBack();}
  else if(intro === false){clearInterval(myintro);
           }
}}
//Builds Hexes on load
document.addEventListener('DOMContentLoaded', function(){
  iconShuffle();
   for (i=0; i < hexEls.length; i++){
     if(i === 5||i===10||i===13||i===19){
     hexes[i] = new HexaFlip(hexEls[i], {set: iconArr},{
        size: 66,
        fontSize: 44
     });
     }else{  
     hexes[i] = new HexaFlip(hexEls[i], {set: [iconArr2[i], iconArr[0]]},{
        size: 66,
        fontSize: 44
     });
     }
     
   }
  introduction()
});
//Start new game by clicking atom icon
var hc = 0;
startIcon.addEventListener("click", function () {
  if (pairCount === 10 && intro === true) {
    intro = false;
    console.log(intro);
    hexes[5].setValue({set: iconArr[0]});
    hexes[10].setValue({set: iconArr[0]});
    hexes[13].setValue({set: iconArr[0]});
    hexes[19].setValue({set: iconArr[0]});
    setTimeout(function(){
   for (i=0; i < 16; i++){
     hexes[hc].setValue({set: iconArr[0]});
     hc ++
     if(i === 4||i===8||i===10){
     hc ++  
     }
   }
       }, 1000);
    setTimeout(function(){
     
  document.getElementById("tries").innerHTML = "TRIES: 0";
  console.log(selectedHex);
      
      pairCount = 0;
  for (i = 0; i < hexEls.length; i++) {
    $('#my-cube'+i+'').empty();
    selectedHex[i].status = 1;
    hexes[i] = new HexaFlip(
      hexEls[i],
      { set: iconArr },
      {
        size: 66,
        fontSize: 44
      }
    );
  }
      
       }, 2000);
  }else if (pairCount === 10 && intro === false) {
    triesCount = 0;
    newColor = false;
    nc ++;
    if(nc > 4){
      nc = 0;
    }
    document.getElementById("tries").innerHTML = "TRIES: 0";
    pairCount = 0;
    selectedHex = [];
    iconShuffle();
    statusChange(2, 1);
    console.log(selectedHex);
    for (j = 0; j < hexEls.length; j++) {
      hexes[j].setValue({ set: iconArr[0] });
    }
  }
});
//Function for changing hex status
function statusChange(s, t) {
  for (var j = 0; j < hexEls.length; j++) {
    if (selectedHex[j].status === s) {
      selectedHex[j].status = t;
    }
  }
}
//Flips hexes back if not a pair
function hexUnflip(x, y, z, a) {
  setTimeout(function () {
    hexes[x].setValue({ set: iconArr[0] });
    hexes[y].setValue({ set: iconArr[0] });
    statusChange(z, a);
    hexCount = 0;
  }, 1500);
}
//Checks if hexes are pairs
function hexMatch(a, b, c, d) {
  if (a === b) {
    selectedHex[c].status = 3;
    selectedHex[d].status = 3;
    statusChange(2, 1);
    hexCount = 0;
    pairCount++;
    if (pairCount > 9) {
      document.getElementById("tries").innerHTML =
        "YOU DID IT IN " + triesCount + " TRIES! CLICK ATOM TO TRY AGAIN";
    }
    console.log("match!");
  } else {
    console.log("no match!");
    hexUnflip(c, d, 2, 1);
  }
}

//Click functions for each hex
for (let i = 0; i < hexEls.length; i++) {
  hexEls[i].addEventListener("click", function () {
    if (selectedHex[i].status === 1) {
      if (pairCount === 0 && newColor === false) {
        r.style.setProperty('--my-color2', myColors[nc]);
        newColor = true;
      }
      
      hexCount++;
      console.log(pairCount);
      nameStr = String(selectedHex[i].name);
      hexes[i].setValue({ set: nameStr });
      //hexes[i].flip();
      hexVals[hexCount - 1] = i;
      flippedVals[hexCount - 1] = hexes[i].getValue();
      flippedVals[hexCount - 1] = String(flippedVals[hexCount - 1]);
      selectedHex[i].status = 2;
      if (hexCount > 1) {
        triesCount++;
        document.getElementById("tries").innerHTML = "TRIES: " + triesCount;
        statusChange(1, 2);
        hexMatch(flippedVals[0], flippedVals[1], hexVals[0], hexVals[1]);
      }
    }
  });

}
