document.getElementById('audioFile').addEventListener('change', function() {
    const file = this.files[0];
    const audioPlayer = document.getElementById('audioPlayer');

    if (file) {
        const url = URL.createObjectURL(file);
        audioPlayer.src = url;
        document.getElementById('playButton').disabled = false;

        // Clean up the URL when done
        audioPlayer.onended = () => URL.revokeObjectURL(url);
    }
});

document.getElementById('playButton').addEventListener('click', function() {
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.style.display = 'block';
    audioPlayer.play();
});
