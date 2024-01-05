var state = "halt"
var timerIds = [];
var agentState = 0
var wordDivCount = 0;
const terminal = document.getElementById('terminal');
const agent = document.getElementById('agent');

/*----------------------------------------------------------------------------------*/
// Event
document.addEventListener('DOMContentLoaded', (event) => {
    reboost();
});

document.getElementById('yes-button').addEventListener('click', function() {
    switch (state){
        case "start":
        case "qq":
        case "hmm":
            nice_1();
            break
        case "nice_1":
            nice_2();
            break
        case "nice_2":
            nice_3();
            break
        case "nice_3":
            nice_4();
            break
        case "nice_4":
            nice_5();
            break
        case "nice_5":
            nice_5();
            break
    }
});

document.getElementById('no-button').addEventListener('click', function() {
    switch (state){
        case "start":
        case "qq":
            qq();
            break
        case "nice_1":
        case "nice_2":
        case "nice_3":
        case "nice_4":
        case "hmm":
            hmm();
            break
        case "nice_5":
            nice_5();
            break
    }
});

document.getElementById('power-button').addEventListener('click', function() {
    // reboost();
});
/*----------------------------------------------------------------------------------*/
// State
function reboost(){
    clearAllTimers();
    clearMessage();
    let message = "Hey, I guest you are here for my resume?(y|n)?";
    Promise.resolve()
    .then(changeStateTo('halt'))
    .then(printTextWithNormalSpeed(message))
    .then(delaySecondsPromise(500))
    .then(makeAgentStaring)
    .then(changeStateTo('start'));
}

function nice_1(){
    clearMessage();
    let message = 'Wise choice.';
    Promise.resolve()
    .then(changeStateTo('halt'))
    .then(printTextWithNormalSpeed(message))
    .then(delaySecondsPromise(500))
    .then(() => {window.open('resume.html');})
    .then(makeAgentStaring)
    .then(changeStateTo('nice_1'));
}

function nice_2(){
    clearMessage();
    let message = 'Huh?';
    Promise.resolve()
    .then(changeStateTo('halt'))
    .then(printTextWithNormalSpeed(message))
    .then(delaySecondsPromise(500))
    .then(makeAgentStaring)
    .then(changeStateTo('nice_2'));
}

function nice_3(){
    clearMessage();
    let message = 'You want something more then my resume?';
    Promise.resolve()
    .then(changeStateTo('halt'))
    .then(printTextWithNormalSpeed(message))
    .then(delaySecondsPromise(500))
    .then(makeAgentStaring)
    .then(changeStateTo('nice_3'));
}

function nice_4(){
    clearMessage();
    let message = 'Sorry, but I need to work now. If you wnat my resume, just click the YES button again';
    Promise.resolve()
    .then(changeStateTo('halt'))
    .then(printTextWithNormalSpeed(message))
    .then(delaySecondsPromise(500))
    .then(makeAgentStaring)
    .then(changeStateTo('nice_4'));
}

function nice_5(){
    clearMessage();
    let message = 'Working...';
    Promise.resolve()
    .then(changeStateTo('halt'))
    .then(printTextWithNormalSpeed(message))
    .then(delaySecondsPromise(500))
    .then(() => {window.open('resume.html');})
    .then(makeAgentStaring)
    .then(changeStateTo('nice_2'));
}

function hmm(){
    clearMessage();
    let message = 'Hmm?';
    Promise.resolve()
    .then(changeStateTo('halt'))
    .then(printTextWithNormalSpeed(message))
    .then(delaySecondsPromise(500))
    .then(makeAgentStaring)
    .then(changeStateTo('hmm'));
}

function qq(){
    clearMessage();
    Promise.resolve()
    .then(changeStateTo('halt'))
    .then(printTextWithNormalSpeed('...please...(y|n)'))
    .then(delaySecondsPromise(500))
    .then(makeAgentStaring)
    .then(changeStateTo('qq'));
}

function changeStateTo(st){
    return () => state = st;
}
/*----------------------------------------------------------------------------------*/
// Async function
function printTextWithNormalSpeed(message){
    return () => printMessage(message, 100, 40);
}

function printTextWithSlowSpeed(message){
    return () => printMessage(message, 1250, 500);
}

function messageToWordArray(message){
    let word = "";
    let wordArray = [];
    for(let char of message) {
        if(char == '\n' || char == ' '){
            if(word){
                wordArray.push(word);
                word = "";
            }
            if(char == '\n'){
                wordArray.push('\n')
            }
            else if(char == ' '){
                wordArray.push(' ')
            }
        }
        else{
            word += char;
        }
    }
    if(word){
        wordArray.push(word);
    }
    return wordArray
}

function createWordDivPromise(wordArray){
    for (let id = 0; id < wordArray.length; id++){
        let wordDiv = document.createElement('div');
        wordDiv.classList.add("word-div");
        wordDiv.id = id;
        terminal.insertBefore(wordDiv, terminal.lastElementChild);
    }
}

async function printMessage(message, spacePeriod, charPeriod){
    wordArray = messageToWordArray(message);
    createWordDivPromise(wordArray);

    let wordDivId = 0;
    try{
        for (let word of wordArray) {
            for (let char of word) {
                if (char == " " || char == '\n'){
                    await addCharIntoWordDivPromise(char, wordDivId, spacePeriod)
                }
                else{
                    await addCharIntoWordDivPromise(char, wordDivId, charPeriod)
                }
            }
            wordDivId++;
        }
    } catch (e) {
        console.log('Catch error at' + printMessage);
    }

    return;
}

function addCharIntoContentPromise(char, delay){
    let element;
    if(char == '\n'){
        element = document.createElement('br')
    }
    else{
        element = document.createElement('span');
        element.innerHTML = escapeHTML(char);
    }
    element.classList.add("content");

    return new Promise((resolve, reject) => {
        timerIds.push(setTimeout(() => {
            terminal.insertBefore(element, terminal.lastElementChild);
            resolve();
        }, delay)); 
    })
}

function makeAgentSwitchingHands(){
    if(agentState == 0) {
        agent.classList.add('agent2');
        removeAgentClass();
        agentState = 1;
    }
    else {
        agent.classList.add('agent1');
        removeAgentClass();
        agentState = 0;
    }
}

function makeAgentStaring(){
    agent.classList.add('agent3');
    removeAgentClass();
    agentState = 2;
}

function makeAgentCloseEye(){
    agent.classList.add('agent4');
    removeAgentClass();
    agentState = 3;
}

function removeAgentClass(){
    if(agentState == 0) {
        agent.classList.remove('agent1');
    }
    else if(agentState == 1) {
        agent.classList.remove('agent2');
    }
    else if(agentState == 2) {
        agent.classList.remove('agent3');
    }
    else if(agentState == 3) {
        agent.classList.remove('agent4');
    }
}

function clearMessage(){
    let elementsToRemove = Array.from(terminal.children).filter(function(child) {
        return child.classList.contains('content') || child.classList.contains('word-div');
    });
    elementsToRemove.forEach(function(element) {
        terminal.removeChild(element);
    });
}

function escapeHTML(text) {
    return text
        .replace(/&/g, '&amp;')   
        .replace(/</g, '&lt;')    
        .replace(/>/g, '&gt;')    
        .replace(/"/g, '&quot;')  
        .replace(/'/g, '&#39;')   
        .replace(/`/g, '&#96;')   
        .replace(/\(/g, '&#40;')  
        .replace(/\)/g, '&#41;')  
        .replace(/\{/g, '&#123;') 
        .replace(/\}/g, '&#125;') 
        .replace(/\[/g, '&#91;')  
        .replace(/\]/g, '&#93;')  
        .replace(/ /g, '&nbsp;')  
        .replace(/\\/g, '&#92;'); 
}

function clearAllTimers() {
    timerIds.forEach(id => clearTimeout(id));
    timerIds = [];
}

function addCharIntoWordDivPromise(char, wordDivId, delay){
    let element;
    if(char == '\n'){
        element = document.createElement('br')
    }
    else{
        element = document.createElement('span');
        element.innerHTML = escapeHTML(char);
    }
    element.classList.add("content");
    const wordDiv = document.getElementById(wordDivId);

    return new Promise((resolve) => {
        timerIds.push(setTimeout(() => {
            wordDiv.appendChild(element);
            makeAgentSwitchingHands();
            resolve();
        }, delay)); 
    })
}

function delaySecondsPromise(ms){
    return new Promise((resolve) => {
        timerIds.push(setTimeout(() => {
            resolve();
        }, ms)); 
    })
}
