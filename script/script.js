var state = "halt"
var timerIds = [];
var wordDivCount = 0;
const context = document.getElementById('context');

/*----------------------------------------------------------------------------------*/
// Event
document.addEventListener('DOMContentLoaded', (event) => {
    reboost();
});

document.getElementById('yesButton').addEventListener('click', function() {
    if(state == "start"){
        nice();
    }
});

document.getElementById('noButton').addEventListener('click', function() {
    if(state == "start"){
        qq();
    }
});

document.getElementById('powerButton').addEventListener('click', function() {
    reboost();
});
/*----------------------------------------------------------------------------------*/
// State
function reboost(){
    state = "halt"
    clearAllTimers();
    clearMessage();
    let message = "Hello, human being. It's quite apparent you're in need of my resume, aren't you?(y|n)?";
    Promise.resolve()
    .then(printTextWithNormalSpeed(message))
    .then(changeStateTo('start'));
}

function nice(){
    state = "halt"
    clearMessage();
    let message = 'Wise choice.'
    Promise.resolve()
    .then(printTextWithNormalSpeed(message))
    .then(() => {
        setTimeout(function() {
            window.open('resume.html', '_blank');
        }, 500); 
    })
    .then(changeStateTo('nice'));
}

function qq(){
    state = "halt"
    clearMessage();
    let asciiArt = `
   _______________
  |  ___________  |
  | |           | |
  | |   0   0   | |
  | |   ' -     | |
  | |   '___    | |
  | |___     ___| |
  |_____|   |_____|
        |   |
   / ********** \\ 
 /  ************  \\ 
`;
    Promise.resolve()
    .then(printAsciiArt(asciiArt))
    .then(printTextWithSlowSpeed('O...Okay...'))
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
        context.insertBefore(wordDiv, context.lastElementChild);
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

function printAsciiArt(message){
    return async function() {
        let spacePeriod = 20;
        let charPeriod = 20;
        try{
            for (let char of message) {
                if (char == " " || char == '\n'){
                    await addCharIntoContentPromise(char, spacePeriod);
                }
                else{
                    await addCharIntoContentPromise(char, charPeriod);
                }
            }
        } catch (e) {
            console.log('Catch error at' + printAsciiArt);
        }
    }
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
    element.classList.add("context-animation");

    return new Promise((resolve, reject) => {
        timerIds.push(setTimeout(() => {
            context.insertBefore(element, context.lastElementChild);
            resolve();
        }, delay)); 
    })
}

function clearMessage(){
    let elementsToRemove = Array.from(context.children).filter(function(child) {
        return child.classList.contains('context-animation') || child.classList.contains('word-div');
    });
    elementsToRemove.forEach(function(element) {
        context.removeChild(element);
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
    element.classList.add("context-animation");
    const wordDiv = document.getElementById(wordDivId);

    return new Promise((resolve) => {
        timerIds.push(setTimeout(() => {
            wordDiv.appendChild(element);
            resolve();
        }, delay)); 
    })
}