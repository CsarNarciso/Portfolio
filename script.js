const language = "en-US";

var phrases = [
	"So, just say the phrases.",
	"This is a test.",
	"And pronunciate as good as you can."
];

var points = 0;

var outputElement = document.getElementById('output');
var phraseElement = document.getElementById('phrase');
var phraseTimeElement = document.getElementById('phraseTime');
var pointsElement = document.getElementById('points');
var remainElement = document.getElementById('remain');
var finalScoreElement = document.getElementById('finalScore');

var phraseResultsElement = document.getElementById('phraseResults').querySelector('tbody');
var currentPhraseResultElement;

var spoken;
var currentPhrase;
var currentPhraseAsWords;
var cleanAndFormatCurrentPhraseAsWords;
var phraseIndex = 0;
var phraseCompleted = true;
var remain;
var processedWordIndexs = [];
var phraseTime;
var checkingResults = false;

var nextPhraseDelayTimer = null;
var countDownTimer = null;

// Configure recognizer
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

const recognizer = new SpeechRecognition();
recognizer.lang = language;
recognizer.continuous = true;
recognizer.interimResults = true;

var recognizerStarted = false;


// Configure voice speaker 
const synth = window.speechSynthesis;
var utterance = new SpeechSynthesisUtterance();
utterance.lang = language;



//Audios
var startRoomSound = new Audio('./sound/startRoom.mp3');
var assertSound = new Audio('./sound/assert.mp3');
var celebrateSound = new Audio('./sound/victory.mp3');
var defeatSound = new Audio('./sound/defeat.mp3');

//On start room
document.getElementById('startRoom').onclick = function(){
	
	recognizer.start();
		
	recognizer.onstart = function(){
		
		recognizerStarted = true;
		
		points = 0;
		pointsElement.textContent = points;
		finalScoreElement.textContent = points;
		
		remain = phrases.length;
		remainElement.textContent = remain;
		
		phraseResultsElement.innerHTML = "";
			
		//Play start room sound effect
		startRoomSound.play();
		
		newPhrase();
	}
	
	recognizer.onerror = function(){
		stopRoom();
	}
}

function stopRoom(){
	
	clearInterval(nextPhraseDelayTimer);
	clearInterval(countDownTimer);
	
	//Clear display
	phraseElement.textContent = "";
	phraseTimeElement.textContent = "";
	outputElement.innerHTML = "";
	
	remain = 0;
	remainElement.textContent = remain;
	
	phraseIndex = 0;
	
	//Stop speaker
	recognizerStarted = false;
	recognizer.stop();
	
	//Display results
	finalScoreElement.textContent = points;
	
	if(points > 0){
		celebrateSound.play();
	}
	else{
		defeatSound.play();
	}
}

function newPhrase(){
	
	//Get new phrase
	currentPhrase = phrases[phraseIndex];
	currentPhraseAsWords = currentPhrase.trim().split(/\s+/);
	cleanAndFormatCurrentPhraseAsWords = clearAndFormatAsWordsArray(currentPhrase);
	processedWordIndexs = [];

	outputElement.innerHTML = "";
	phraseElement.textContent = currentPhrase;

	clearInterval(nextPhraseDelayTimer);

	if(recognizerStarted){
		
		//And keep track of phrase's elapsed time
		phraseTime = Math.floor(clearAndFormatAsWordsArray(currentPhrase).length);
		phraseTimeElement.textContent = phraseTime;
		
		let row = document.createElement('tr');
		
		let expectedPhaseElement = document.createElement('td');
		expectedPhaseElement.textContent = currentPhrase;
		
		let phraseResultElement = document.createElement('td');
		phraseResultElement.innerHTML = `<span style="color: black;">Waiting...</span>`;
		currentPhraseResultElement = phraseResultElement;
		
		//Attach read aloud icon to table's expected phrase
		let readAloudIcon = document.createElement('span');
		readAloudIcon.innerHTML = "🔊";
		readAloudIcon.style.cursor = "pointer";
		
		let currentPhraseToRead = phrases[phraseIndex];
		readAloudIcon.addEventListener('click', () => {
			
			//Read phrase aloud
			utterance.text = currentPhraseToRead;
			synth.speak(utterance);
		});
		expectedPhaseElement.appendChild(readAloudIcon);
		
		row.appendChild(expectedPhaseElement);
		row.appendChild(phraseResultElement);
		phraseResultsElement.appendChild(row);
		
		countDownTimer = setInterval(() => {
			
			phraseTime--;
			
			if(phraseTime <= 0){
				
				clearInterval(nextPhraseDelayTimer);
				clearInterval(countDownTimer);
				
				if(phraseResultElement.innerHTML === '<span style="color: black;">Waiting...</span>'){
					phraseResultElement.innerHTML = `<span style="color: black;">${currentPhrase}</span>`;
				}
				skipToNextPhrase();
			}
			//Display current phrase time second
			phraseTimeElement.textContent = phraseTime;
		}, 1000);
	}
	nextPhraseDelayTimer = setInterval(newPhrase, phraseTime*1000);
}



//On each speach recognition
recognizer.onresult = function(event) {
		
	if(!checkingResults){
		
		outputElement.innerHTML = "";
		currentPhraseResultElement.innerHTML = "";
		
		phraseCompleted = true; 
		
		spoken = event.results[event.resultIndex][0].transcript;
		let spokenWords = clearAndFormatAsWordsArray(spoken);
		
		let htmlResultReference = generateSpokenHTMLReference(cleanAndFormatCurrentPhraseAsWords, spokenWords);
		outputElement.innerHTML = htmlResultReference;
		currentPhraseResultElement.innerHTML = htmlResultReference;
		
		//Verify if phrase has been already spoken
		if(phraseCompleted){
			//First, wait a seconds to process the last results
			waitToCheckResultsBeforeNextPhrase();
		}
	}
}


function skipToNextPhrase(){
	
	phraseIndex++;
	
	//If room still has phrases to show
	if(phraseIndex < phrases.length){
		
		//Update remaining phrases number
		remain--;
		remainElement.textContent = remain;
		
		newPhrase();
	}else{
		//Room finished
		stopRoom();
	}
}

function waitToCheckResultsBeforeNextPhrase(){
	
	clearInterval(nextPhraseDelayTimer);
	clearInterval(countDownTimer);
	
	checkingResults = true;
	let time = 0;
	let timerBeforeSkipToNextPhrase = setInterval(() => {
			
		time++;	
		if(time > 1){
			
			clearInterval(timerBeforeSkipToNextPhrase);
			checkingResults = false;
			skipToNextPhrase();
		}
	}, 1000);
}

function generateSpokenHTMLReference(expectedPhrase, spoken){
	
	let htmlResult = "";
	let newWord;
	let color;
	
	expectedPhrase.forEach( (word, index) => {
		if(spoken[index] !== undefined){
			
			if(spoken[index] === word){
				//The word matchs
				newWord = currentPhraseAsWords[index];
				color = "green";
				
				//If resutl is not repeated
				if(!processedWordIndexs.includes(index)){
					
					//Increase points
					points++;
					pointsElement.textContent = points;
					assertSound.play();
					
					processedWordIndexs.push(index);
				}
			}
			else{
				//, doesn't match
				newWord = spoken[index];
				color = "red";
			}
		}else{
			//The word has not been spoken (or detected)
			phraseCompleted = false;
			
			newWord = currentPhraseAsWords[index];
			color = "black";
		}
		htmlResult += `<span style="color: ${color};">${newWord} </span>`;
	});
	return htmlResult;
}


function clearAndFormatAsWordsArray(text){
	return text.trim().replace(/[.,\/#!$%\^&\*;:{}=\-_~()]/g, "").toLowerCase().split(/\s+/);
}