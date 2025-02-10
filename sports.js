document.addEventListener('DOMContentLoaded', function() {
    // Accessibility Features
    const increaseTextBtn = document.getElementById('increaseTextSize');
    const decreaseTextBtn = document.getElementById('decreaseTextSize');
    const textToSpeechBtn = document.getElementById('textToSpeech');
    const stopSpeechBtn = document.getElementById('stopSpeech');
    const voiceCommandBtn = document.getElementById('voiceCommand');
    const emergencyBtn = document.getElementById('emergencyButton');

    let currentFontSize = 16;
    let speechSynthesis = window.speechSynthesis;
    let speaking = false;

    // Text Size Controls
    increaseTextBtn.addEventListener('click', () => {
        if (currentFontSize < 24) {
            currentFontSize += 2;
            document.body.style.fontSize = currentFontSize + 'px';
        }
    });

    decreaseTextBtn.addEventListener('click', () => {
        if (currentFontSize > 12) {
            currentFontSize -= 2;
            document.body.style.fontSize = currentFontSize + 'px';
        }
    });

    // Text to Speech
    textToSpeechBtn.addEventListener('click', () => {
        if (!speaking) {
            const text = document.querySelector('main').textContent;
            const utterance = new SpeechSynthesisUtterance(text);
            speechSynthesis.speak(utterance);
            speaking = true;
        }
    });

    stopSpeechBtn.addEventListener('click', () => {
        if (speaking) {
            speechSynthesis.cancel();
            speaking = false;
        }
    });

    // Emergency Button
    emergencyBtn.addEventListener('click', () => {
        const confirmCall = confirm('Do you want to call emergency services?');
        if (confirmCall) {
            window.location.href = 'tel:112';
        }
    });

    // Voice Commands (if browser supports)
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        voiceCommandBtn.addEventListener('click', () => {
            recognition.start();
        });

        recognition.onresult = function(event) {
            const command = event.results[0][0].transcript.toLowerCase();
            if (command.includes('increase')) {
                increaseTextBtn.click();
            } else if (command.includes('decrease')) {
                decreaseTextBtn.click();
            } else if (command.includes('read')) {
                textToSpeechBtn.click();
            } else if (command.includes('stop')) {
                stopSpeechBtn.click();
            }
        };
    } else {
        voiceCommandBtn.style.display = 'none';
    }
});