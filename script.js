```javascript
let voices = [];
let voiceList = document.getElementById("voiceList");
let historyList = document.getElementById("historyList");

function loadVoices() {
    voices = speechSynthesis.getVoices();

    voiceList.innerHTML = "";

    voices.forEach((voice, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = voice.name + " (" + voice.lang + ")";
        voiceList.appendChild(option);
    });
}

speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

function speakText() {

    let text = document.getElementById("text").value;

    if (text === "") {
        alert("Please enter some text");
        return;
    }

    let speech = new SpeechSynthesisUtterance(text);

    speech.voice = voices[voiceList.value];

    speech.rate = document.getElementById("speed").value;

    speech.pitch = document.getElementById("pitch").value;

    speech.volume = document.getElementById("volume").value;

    speechSynthesis.speak(speech);

    saveHistory(text);
}

function pauseSpeech() {
    speechSynthesis.pause();
}

function resumeSpeech() {
    speechSynthesis.resume();
}

function stopSpeech() {
    speechSynthesis.cancel();
}

function copyText() {

    let text = document.getElementById("text");

    text.select();

    document.execCommand("copy");

    alert("Text copied");
}

function clearText() {

    document.getElementById("text").value = "";

    updateCount();
}

function toggleDarkMode() {

    document.body.classList.toggle("dark");
}

function downloadText() {

    let text = document.getElementById("text").value;

    let blob = new Blob([text], { type: "text/plain" });

    let a = document.createElement("a");

    a.href = URL.createObjectURL(blob);

    a.download = "text.txt";

    a.click();
}

document.getElementById("fileInput").addEventListener("change", function () {

    let file = this.files[0];

    if (!file) return;

    let reader = new FileReader();

    reader.onload = function (e) {

        document.getElementById("text").value = e.target.result;

        updateCount();
    };

    reader.readAsText(file);
});

function updateCount() {

    let text = document.getElementById("text").value;

    document.getElementById("charCount").innerText = text.length;

    let words = text.trim();

    if (words === "") {
        document.getElementById("wordCount").innerText = 0;
    }
    else {
        document.getElementById("wordCount").innerText =
            words.split(/\s+/).length;
    }
}

document.getElementById("text").addEventListener("input", updateCount);

function saveHistory(text) {

    let history = JSON.parse(localStorage.getItem("history")) || [];

    history.unshift(text);

    if (history.length > 5) {
        history.pop();
    }

    localStorage.setItem("history", JSON.stringify(history));

    showHistory();
}

function showHistory() {

    let history = JSON.parse(localStorage.getItem("history")) || [];

    historyList.innerHTML = "";

    history.forEach(item => {

        let li = document.createElement("li");

        li.innerText = item;

        historyList.appendChild(li);

    });
}

showHistory();
```
