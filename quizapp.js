let score = 0;
let index = 0;
let localindex = 0;
let timer;
let timeCount = 150;
let quizstarted = false;

const database = [{question:"2x + 4 = 0, x = ?", option1: -1, option2: -2, option3: 2, option4: 4, correctans: -2},
                  {question:"3x = 16 + x, x = ?", option1: 16, option2: -8, option3: 16, option4: 8, correctans: 8},
                  {question:"21 * 37 = ?", option1:777, option2: 877, option3: 527, option4: 1237, correctans: 777},
                  {question:"99 + 11 * 2 = ?", option1: 220, option2: 110, option3: 221, option4: 121, correctans: 121},
                  {question:"2 ^ 5 = ?", option1: 16, option2: 32, option3: 64, option4: 8, correctans: 32},

                  {question:"log 2(64) = ?", option1: 6, option2: 5, option3: 4, option4: 8, correctans: 6},
                  {question:"sin(90) = ?", option1: 0, option2: 1, option3: -1, option4: 0.5, correctans: 1},
                  {question:"21x = 42, x = ?", option1: 1, option2: 3, option3: 4, option4: 2, correctans: 2},
                  {question:"30% of 1250 = ?", option1:375, option2: 400, option3: 350, option4: 377, correctans: 375},
                  {question:"(12 * 15) - 20 * 4 = ?", option1:200, option2: 220, option3: 100, option4: 300, correctans: 100},

                  {question:"log 3(27) = ?", option1: 6, option2: 3, option3: 9, option4: 8, correctans: 3},
                  {question:"cos(90) = ?", option1: 0, option2: 1, option3: -1, option4: 0.5, correctans: 0},
                  {question:"sin(30) + cos(60) = ?", option1: 3, option2: 2, option3: 4, option4: 1, correctans: 1},
                  {question:"sqrt(49) = ?", option1: 7, option2: 8, option3: 5, option4: 6, correctans: 7},
                  {question:"d/dx 2x = ?", option1: 2, option2: 1, option3: -1, option4: -2, correctans: 2},
                  
                  {question:"x = x + y, y = ?", option1:1, option2: 0, option3: -1, option4: -2, correctans: 0},
                  {question:"sin ^ 2 + cos ^ 2 = ?", option1: 0, option2: 1, option3: -1, option4: 0.5, correctans: 1},
                  {question:"P(a) = 0.4, P(b) = ?", option1: 1, option2: 0.6, option3: 0.2, option4: 0, correctans: 0.6},
                  {question:"8 ^ 4", option1: 4096, option2: 2048, option3: 512, option4: 1024, correctans: 4096},
                  {question:"50% of 40% 0f 2480", option1: 992, option2: 496, option3: 788, option4: 1120, correctans: 496}
                 ]

const questionAsked = document.getElementById("qs");
const optionOne = document.getElementById("option-1");
const optionTwo = document.getElementById("option-2");
const optionThree = document.getElementById("option-3");
const optionFour = document.getElementById("option-4");
const nextButton = document.getElementById("next-btn");

const scoreh3 = document.getElementById("score-display");
const remark = document.getElementById("remark");

window.onload = function() {
    if (document.body.id === "math-quiz" && quizstarted == false) {
        quizStart();
        if(timeCount === 150){
            startTime();
        }
        quizstarted = true;
    }

    if (document.body.id === "results" && quizstarted == false) {
        showResult();
    }
}


function showResult(){
    let storedScore = localStorage.getItem("score");
    if(storedScore == null){
        storedScore = 0;
    }
    scoreh3.innerHTML = "Score: " + storedScore + " Out of 60";
    if(storedScore < 30){
        remark.innerHTML = "Better Luck Next Time!"
    }
    else if(storedScore <= 45){
        remark.innerHTML = "Good Going! You Passed!!"
    }
    else if(storedScore <= 59){
        remark.innerHTML = "Superb! Amazing Score!!"
    }
    else{
        remark.innerHTML = "Perfect Score! You're Awesome!!"
    }

}

function quizStart(){
    if(index < 20){
        console.log(database[index].correctans);

        optionOne.disabled = false;
        optionTwo.disabled = false;
        optionThree.disabled = false;
        optionFour.disabled = false;

        nextButton.hidden = true;
        nextButton.disabled = true;

        questionAsked.innerHTML = index + 1 + ")" + database[index].question;
        optionOne.innerHTML = "1) " + database[index].option1;
        optionTwo.innerHTML = "2) " + database[index].option2;
        optionThree.innerHTML = "3) " + database[index].option3;
        optionFour.innerHTML = "4) " + database[index].option4;

        optionOne.style.textAlign = "left";
        optionTwo.style.textAlign = "left";
        optionThree.style.textAlign = "left";
        optionFour.style.textAlign = "left";

        index++;

    }
    else{
        stopTime();
        localStorage.setItem("score", score);
        quizstarted = false;
        window.location.replace("scorepage.html");
    }
}

function answerCheck(button){

    optionOne.disabled = true;
    optionTwo.disabled = true;
    optionThree.disabled = true;
    optionFour.disabled = true;

    nextButton.hidden = false;
    nextButton.disabled = false;

    let chosenanswer = button.innerHTML;
    chosenanswer = chosenanswer.slice(3);
    console.log(chosenanswer);

    let correctanswer = database[localindex].correctans;
    if(chosenanswer == correctanswer){
        score += 3;
    }
    else{
        score --;
    }
    localindex++;
    console.log("score " + score);
}

function rulepageDisplay(){
    window.location.replace("rulepage.html");
}

function homepageDisplay() {
    window.location.replace("menu.html");
}

function quizpageDisplay(){
    window.location.replace("quizpage.html");
}

function startTime(){
    timer = setInterval(testTime, 1000);
}

function testTime(){
    timeCount--;
    document.getElementById("time").innerHTML = timeCount;

    if(timeCount <= 0){
        stopTime();
        localStorage.setItem("score", score);
        quizstarted = false;
        document.getElementById("timer").innerHTML = "Test Ended!";
        window.alert("The Test has ended!");
        window.location.replace("scorepage.html");
    }
}

function stopTime(){
    clearInterval(timer);
}
