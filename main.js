document.querySelector("button").addEventListener("click", function() {
    var context = new AudioContext();


    // Get a reference to the database service
});



//TODO: only one array is needed! DUH
//TODO: create Tone notation generator
//TODO: add miliseconds



let synth = new Tone.MonoSynth().toDestination();
let pressedArray = [];
let levelSelected;
let globalTimer = setInterval(setTime, 1000);

let gameStats = {};
gameStats.time = "";
gameStats.tries = "";
gameStats.score = "";

let startBtn = document.getElementById("splash");
let levelSelect = document.getElementById("selectLevel");
let board = document.getElementById("board");
let timer = document.getElementById("time");
let allScreens = document.getElementsByClassName("wdw");
let gameGrid = document.getElementById("gameGrid");
let buttons = document.getElementsByClassName("button");
let levelLabel = document.getElementById("level-label");

let showScore = document.getElementById("show-score");
let gameTime = document.getElementById("gameTime");
let gameTries = document.getElementById("gameTries");
let gameScore = document.getElementById("gameScore");

startBtn.classList.toggle("visible");

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;




let toneArrayEasy = ["C2", "D2", "E2", "F2", "G2", "A2"];
let toneArrayMedium = [
    "C3",
    "D3",
    "E3",
    "F3",
    "G3",
    "A3",
    "B3",
    "C2",
    "D2",
    "E2",
    "F2",
    "G2",
];
let toneArrayHard = [
    "A2",
    "A#2",
    "B2",
    "C2",
    "C#2",
    "D2",
    "D#2",
    "E2",
    "F2",
    "F#2",
    "G2",
    "A3",
    "A#3",
    "B3",
    "C3",
    "C#3",
    "D3",
    "D#3",
    "E3",
    "F3",
    "F#3",
    "G3",
    "G#3",
    "A4",
];

// TIMER FUNCTIONS
function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    // console.log(totalSeconds);
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

// ARRAY GENERATION

/// Doubles array elements
function generateArray(array) {
    b = [];
    for (var i = 0; i < array.length; ++i) {
        b.push(array[i]);
        b.push(array[i]);
    }
    array = b;
    return b;
}
/// Shuffle array elements
function shuffle(arra1) {
    let ctr = arra1.length,
        temp,
        index;

    // While there are elements in the array
    while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}
/// Render array
function showContent(toneArray) {
    board.classList.add("visible");
    gameGrid.classList.add("visible");

    toneArray = generateArray(toneArray);
    shuffle(toneArray);

    // initialize timer
    totalSeconds = 0;

    let temp, item, a, i, main;
    main = document.getElementsByTagName("main")[0];
    //get the template element:
    temp = document.getElementsByTagName("template")[0];
    //get the DIV element from the template:
    item = temp.content.querySelector("button");
    //for each item in the array:
    for (i = 0; i < toneArray.length; i++) {
        //Create a new node, based on the template:
        a = document.importNode(item, true);
        //Add data from the array:
        // a.textContent += toneArray[i];
        a.setAttribute("data", toneArray[i]);
        a.setAttribute("id", "uid" + i);
        //append the new node wherever you like:
        main.appendChild(a);
    }
}

function showLevels() {
    levelSelect.classList.toggle("visible");
}

function selectLevel(difficulty) {
    showLevels();

    switch (difficulty) {
        case 1:
            gameGrid.classList.add("easy-grid");
            levelSelected = toneArrayEasy;
            showContent(levelSelected);
            levelLabel.textContent = "Wimpy";
            break;
        case 2:
            gameGrid.classList.add("medium-grid");
            levelSelected = toneArrayMedium;
            showContent(levelSelected);
            levelLabel.textContent = "Average";

            break;
        case 3:
            gameGrid.classList.add("hard-grid");
            levelSelected = toneArrayHard;
            showContent(levelSelected);
            levelLabel.textContent = "Awesome";
            break;
    }
}

function buttonPressed(data) {
    let tone = data.getAttribute("data");
    data.classList.add("pressed");

    //play a middle 'C' for the duration of an 8th note
    synth.triggerAttackRelease(tone, "16n");

    pressedArray.unshift({
        tone: tone,
        id: data.id,
    });

    checkForMatch(pressedArray);
    checkGameEnded(levelSelected);
}

function startGame() {
    let splash = document.getElementById("splash");
    splash.classList.remove("visible");
    showScore.classList.remove("visible");
    gameGrid.classList.remove("visible");
    showLevels();
}

function checkForMatch(array) {

    for (let index = 0; index < 1; index++) {
        document.getElementById(array[0].id).classList.add("selected");
        if (array.length > 2) {
            document.getElementById(array[2].id).classList.remove("selected");
        }
        if (array[0].id != array[1].id) {
            if (array[0].tone == array[1].tone) {
                console.log("match");
                document
                    .getElementById(array[1].id)
                    .classList.remove("selected");
                document
                    .getElementById(array[0].id)
                    .classList.remove("selected");
                document.getElementById(array[1].id).style.visibility =
                    "hidden";
                document.getElementById(array[0].id).style.visibility =
                    "hidden";
                document.getElementById(array[1].id).classList.add("matched");
                document.getElementById(array[0].id).classList.add("matched");
            } else {
                console.log("no macho");
            }
        } else {
            console.log("same button");
        }
    }
}

function calcScore(gameStats, levelSelected) {
    let tempScore;
    let maxScore = levelSelected.length * 5000;

    tempScore = gameStats.tries + gameStats.time;
    console.log(tempScore);

    gameStats.score = maxScore / tempScore
    gameStats.score = Math.floor(gameStats.score);
    return gameStats.score;
}

function emptyGrid(gameGrid) {

    while (gameGrid.firstChild) {
        gameGrid.removeChild(gameGrid.firstChild);
    }
    gameGrid.className = "";
}


function checkGameEnded(levelArray) {
    let matched = document.getElementsByClassName("matched").length;
    levelArray = levelArray.length;
    if (matched == levelArray * 2) {
        console.log("Game over");
        gameStats.time = totalSeconds;
        gameStats.tries = pressedArray.length;

        document.getElementsByTagName("main").remove;
        gameGrid.classList.remove("visible");
        board.classList.toggle("visible");

        calcScore(gameStats, levelSelected);
        gameScore.innerHTML = "Total score: " + gameStats.score;
        gameTime.innerHTML = "Total time: " + gameStats.time;
        gameTries.innerHTML = "Total tries: " + gameStats.tries;

        showScore.classList.add("visible");
        emptyGrid(gameGrid);
    }
}
console.info('Copyright by Manuel Sotomayor Thomsen 2019');
