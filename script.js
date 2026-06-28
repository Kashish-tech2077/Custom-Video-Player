console.log('Welcome to Custom Video Player');

// DOM Elements

const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const currentTimeStamp = document.getElementById('currentTimeStamp');
const video = document.getElementById('video');
const tenPrevious = document.getElementById('tenPrevious');
const tenNext = document.getElementById('tenNext');
const skipBackward = document.getElementById('skipBackward');
const skipForward = document.getElementById('skipForward');
const volumeContainer = document.getElementById('volumeContainer');
const volumeSlider = document.getElementById('volumeSlider');
const volumeHigh = document.getElementById('volumeHigh');
const volumeLow = document.getElementById('volumeLow');
const volumeMute = document.getElementById('volumeMute');
const playbackSpeedContainer = document.getElementById('playbackSpeedContainer');
const speedDropdown = document.getElementById('speedDropdown');
const videoTimeStamp = document.getElementById('videoTimeStamp');
const seekBar = document.getElementById('seekBar');


// All functions

// play/pause function

function playVideo() {

    if (video.paused) {
        video.play();
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'inline';
    }

}

function pauseVideo() {

    if (video.play) {
        video.pause();
        pauseBtn.style.display = 'none';
        playBtn.style.display = 'inline';
    }

}


playBtn.addEventListener('click', () => {

    playVideo();

})

pauseBtn.addEventListener('click', () => {

    pauseVideo();

})

// currentTimeStamp.textContent = video

seekBar.addEventListener('input', () => {

    seekBarEval();

})

function triggerFeedback(element) {
    element.classList.remove('active');

    void element.offsetWidth;

    element.classList.add('active');
}

tenPrevious.addEventListener('click', () => {
    video.currentTime = Math.max(0, video.currentTime - 10);

    triggerFeedback(skipBackward);

})

tenNext.addEventListener('click', () => {
    video.currentTime = Math.min(video.duration, video.currentTime + 10);


    triggerFeedback(skipForward);

})


function updateVolumeIcons() {

    [volumeMute, volumeHigh, volumeLow].forEach(el => el.style.display = 'none');

    if (video.muted || video.volume === 0) {
        volumeMute.style.display = 'block';
    }
    else if (video.volume > 0.5) {
        volumeHigh.style.display = 'block';
    }
    else {
        volumeLow.style.display = 'block';
    }

}

volumeSlider.addEventListener('input', (e) => {
    video.volume = e.target.value;

    if (video.volume > 0) {
        video.muted = false;
    }
})


video.addEventListener('volumechange', updateVolumeIcons);


speedDropdown.addEventListener('change', (e) => {
    video.playbackRate = parseFloat(e.target.value);
})


// Video total length

video.addEventListener('loadedmetadata', () => {
    const videoDurationMinutes = Math.floor(video.duration / 60);
    const videoDurationSeconds = Math.floor(video.duration % 60);
    const formattedSeconds = String(videoDurationSeconds).padStart(2, '0');

    videoTimeStamp.textContent = `${videoDurationMinutes}:${formattedSeconds}`;
})


// seekBar functionality

seekBar.max = 100;

video.addEventListener('timeupdate', () => {
    seekBar.value = (video.currentTime / video.duration) * 100 || 0;

    const videoDurationMinutes = Math.floor(video.currentTime / 60);
    const videoDurationSeconds = Math.floor(video.currentTime % 60);
    const formattedSeconds = String(videoDurationSeconds).padStart(2, '0');

    currentTimeStamp.textContent = `${videoDurationMinutes}:${formattedSeconds}`;

})

seekBar.addEventListener('input', () => {
    video.currentTime = (seekBar.value / 100) * video.duration;
})