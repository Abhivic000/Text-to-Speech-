const textArea = document.querySelector("#text");
const voiceSelect = document.querySelector("#voiceSelect");
const slider = document.querySelector("#slider");
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");
const modeToggle = document.querySelector("#mode-toggle");

const defaultVoice = window.speechSynthesis.getVoices().filter(voice => voice.default)[0];

let voices = [];
function populateVoiceList() {
  voices = window.speechSynthesis.getVoices();
  voices.forEach(voice => {
    const option = document.createElement("option");
    option.textContent = voice.name + " (" + voice.lang + ")";
    
    if(voice.default) {
      option.textContent += " -- DEFAULT";
    }

    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelect.appendChild(option);
  });
}

function speak() {
  if(speechSynthesis.speaking) {
    console.error("Already speaking...");
    return;
  }

  let text = textArea.value;
  if(!text) {
    console.error("Text area is empty");
    return;
  }

  let voice = voiceSelect.selectedOptions[0].getAttribute("data-name");
  voice = voices.filter(v => v.name === voice)[0];

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voice;
  utterance.rate = slider.value;
  window.speechSynthesis.speak(utterance);
}

function stop() {
  window.speechSynthesis.cancel();
}

function toggleLightDarkMode() {
  document.body.classList.toggle("light-mode");
  if(modeToggle.textContent === "Light/Dark Mode") {
    modeToggle.textContent = "Dark/Light Mode";
  } else {
    modeToggle.textContent = "Light/Dark Mode";
  }
}

speechSynthesis.addEventListener("voiceschanged", populateVoiceList);
speakButton.addEventListener("click", speak);
stopButton.addEventListener("click", stop);
modeToggle.addEventListener("click", toggleLightDarkMode);