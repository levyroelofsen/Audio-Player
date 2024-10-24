document.getElementById('audioFile').addEventListener('change', function() {
    const file = this.files[0];
    const audioPlayer = document.getElementById('audioPlayer');
    const playButton = document.getElementById('playButton');

    if (file) {
        const url = URL.createObjectURL(file);
        audioPlayer.src = url;
        playButton.disabled = false;

        // Clean up the URL when done
        audioPlayer.onended = () => URL.revokeObjectURL(url);
    }
});

document.getElementById('playButton').addEventListener('click', function() {
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.style.display = 'block';
    audioPlayer.play();
    startDecibelCounter(audioPlayer);
});

function startDecibelCounter(audioElement) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audioElement);
    const decibelDisplay = document.getElementById('decibelValue');

    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 256; // Defines the size of the FFT used for frequency analysis

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function updateDecibels() {
        analyser.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
        }
        const average = sum / bufferLength;

        // Convert the average value to decibels (approximation)
        const decibels = 20 * Math.log10(average / 255);
        decibelDisplay.textContent = decibels.toFixed(2);

        requestAnimationFrame(updateDecibels);
    }

    updateDecibels();
}
