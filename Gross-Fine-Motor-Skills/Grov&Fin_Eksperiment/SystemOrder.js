//System der holder styr på den rigtige rækkefølge
//Hvis den rigtige værdi findes, gå videre i while løkken
//Hvis du rammer den forkerte

// Skal modtage værdien, som der registreres når man interagere med en boks
//Loopet er afhængig af funktionen, for at kunne køre videre.
let boksenDuRammer = 3;

let order = [3, 2, 4, 1, 2, 4, 1, 3];
//version 1
function checkOrder() {
  let counter = 0;
  console.log(boksenDuRammer);
  for (i = 0; i < order.length; i++) {
    if (boksenDuRammer != order[counter]) {
      break;
      //box blinker rødt
    }
    if ((boksenDuRammer = order[counter])) {
      counter++;
      console.log(counter);
      //box blinker grønt
    }
  }
}

window.addEventListener("event", checkOrder);
//Version 2
//Bruger variablen boksenDuRammer
function ifRightFunction() {
  let counter2 = 0;
  for (i = 0; i < order.length; i++)
    if (boksenDuRammer == order[counter2]) {
      counter2++;
      console.log("boksen du rammer blinker grøn");
    } else if (boksenDuRammer != order[counter2]) {
      break;
    }
}

//Version 3
//Modtager argument for den boks du er inde i.
function ifRightFunctionEvent(e) {
  let counter2 = 0;
  for (i = 0; i < order.length; i++)
    if (e == order[counter2]) {
      counter2++;
      console.log("boksen du rammer blinker grøn");
    } else if (e != order[counter2]) {
      break;
    }
}

function nordBlink() {}
function sydBlink() {}
function oestBlink() {}
function vestBlink() {}
