
function getText() {
	var spans = document.getElementsByTagName("span");
	for(var i = 0;i < spans.length;i++) {
		//console.log(spans[i].outerHTML); 
		if ((spans[i].outerHTML + "").indexOf("text-decoration: underline") != -1) { 
			//console.log(spans[i].innerText); 
			var inputs = document.getElementsByClassName("txtInput"); 
			//console.log(inputs.length);
			for(var j=0;j<inputs.length;j++) { 
				//console.log("inner = #" + inputs[j].value+"#");
				if (inputs[j].innerText =="") {
					//console.log("write it");
					inputs[j].value = spans[i].innerText+spans[i+1].innerText;
				}
			}
		}
	}
}

keypress.combo("ctrl shift !", function() {
	console.log("Get text activated");
	setInterval(getText, 200);	
});
keypress.combo("ctrl shift @", function() {
	console.log('speech recognition activated');
	recognition.start();
});


var testTextField = null;
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

recognition.onstart = function() {
	console.log("speech activated");
}

recognition.onerror = function(event) {
	alert(event.error);
};

recognition.onend = function() {
	alert("speech end");
	return;
};

recognition.onresult = function(event) {
	testTextField = document.getElementsByClassName("challengeTextArea")[0];
	var interim_transcript = '';
	if (typeof(event.results) == 'undefined') {
		recognition.onend = null;
		recognition.stop();
		return;
	}
	var final_transcript="";
	for (var i = event.resultIndex; i < event.results.length; ++i) {
		if (event.results[i].isFinal) {
			console.log("final");
			console.log(event.results[i][0].transcript)
			final_transcript += event.results[i][0].transcript;
		}
		//capitalize first letter
		final_transcript = final_transcript[0].toUpperCase()+final_transcript.slice(1);
		testTextField.value = final_transcript;

		//auto submit works!
		var submitButton = document.getElementsByClassName("gwt-Button")[0];
		submitButton.click();
	}
};