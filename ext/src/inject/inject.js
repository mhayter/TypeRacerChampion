alert("hello");

keypress.combo("ctrl shift !", function() {
		var text = document.getElementById(idCurrent).innerText + " " + document.getElementById(idNext).innerText;
		var wordsArray = text.split(" ");
		var input = document.getElementsByClassName(inputClass)[0];
		var length = wordsArray.length,
		element = null;
		document.onkeypress = function(){
			element = wordsArray.shift();
			input.value = element + " ";	
		}
});
keypress.combo("ctrl shift @", function() {
		testTextField = document.getElementsByClassName("challengeTextArea")[0];
		recognition.start();
});


var testTextField = null;
var idNext = 'nhwRightgwt-uid-10';
var idCurrent = 'nhwMiddlegwt-uid-8';
var inputClass = 'txtInput';
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

recognition.onstart = function() {
}

recognition.onerror = function(event) {
	alert(event.error);
};

recognition.onend = function() {
	alert("END");
	return;
};

recognition.onresult = function(event) {
	var interim_transcript = '';
	if (typeof(event.results) == 'undefined') {
		recognition.onend = null;
		recognition.stop();
		return;
	}
	for (var i = event.resultIndex; i < event.results.length; ++i) {
		if (event.results[i].isFinal) {
			testTextField.value += event.results[i][0].transcript;
		}
	}
};