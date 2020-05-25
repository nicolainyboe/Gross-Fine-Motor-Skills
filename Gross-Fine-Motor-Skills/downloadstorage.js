let data = [];
var nameInput = document.getElementById("name");
var timeSpent = document.getElementById("tid");
var timeSpent2 = document.getElementById("tid2");
var fejl = document.getElementById("fejl");
var sekvens = document.getElementById("sekvens");
var dinsekvens = document.getElementById("dinsekvens");
var forkerte = document.getElementById("forkerte");

function exportData() {
  var name = localStorage.getItem("Testperson_Name");
  var finalTime = localStorage.getItem("FinalTime");
  var orderTime = localStorage.getItem("TidGetOrder");
  var sequence = localStorage.getItem("TheSequenceIs");
  var whatyouthink = localStorage.getItem("WhatYouThinkIsTheOrder");
  var wrongs = localStorage.getItem("HowManyWrongs");
  var checkSequence = JSON.parse(sequence);
  var yourSequence = JSON.parse(whatyouthink);
  let notRight = 0;
  for (i = 0; i < checkSequence.length; i++) {
    if (checkSequence[i] != yourSequence[i]) {
      notRight++;
    }
  }
  nameInput.innerHTML = "Hej " + name + "</br >";
  timeSpent.innerHTML =
    "Du brugte " +
    orderTime +
    " sekunder på at finde den <b>rigtige</b> rækkefølge.";
  timeSpent2.innerHTML =
    finalTime +
    " sekunder på at <b>gengive</b> hvad du troede var den rigtige rækkefølge.";
  fejl.innerHTML =
    "Du brugte " +
    wrongs +
    " forsøg, på at <b>finde</b> den rigtige rækkefølge.";

  data.push(
    name,
    orderTime,
    sequence,
    whatyouthink,
    wrongs,
    finalTime,
    notRight
  );

  forkerte.innerHTML =
    " Du havde " + " <b>" + notRight + " </b>" + "  forkert(e).";

  var blob = new Blob([data], {
    type: "text/csv",
  });
  console.log(blob);

  var url = URL.createObjectURL(blob);
  var a = document.querySelector("#results");
  a.href = url;
  a.download = name + " file.csv";
}
