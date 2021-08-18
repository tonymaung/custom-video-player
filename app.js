const videoEl = document.querySelector("video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const fullscreenBtn = document.querySelector(".full-screen");
const fullscreenIcon = document.querySelector(".full-screen-btn")
const speed = document.querySelector(".player-speed");
const player = document.querySelector(".player")
    // Play & Pause
function showPlayIcon() {
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
}
// Toggle Playing Icon Pause Icon 
function togglePlay() {
    if (videoEl.paused) {
        videoEl.play()
        playBtn.classList.replace("fa-play", "fa-pause");
        playBtn.setAttribute("title", "Pause");
    } else {
        videoEl.pause();
        showPlayIcon();
    }
}


// Progress Bar & Width
// Calculate Display Time Format
function displayTime(Time) {
    const min = Math.floor(Time / 60);
    let sec = Math.floor(Time % 60);
    sec = (sec > 10) ? `${sec}` : `0${sec}`;
    return `${min}:${sec}`;
}
// Update Progress
function updateProgress() {
    // console.log("Current Time: ", videoEl.currentTime)
    progressBar.style.width = `${(videoEl.currentTime / videoEl.duration) *100}%`;
    currentTime.textContent = `${displayTime(videoEl.currentTime)} /`;
    duration.textContent = `${displayTime(videoEl.duration)}`;
}
// Set Progress
function setProgress(e) {
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime* 100}%`;
    videoEl.currentTime = newTime * videoEl.duration;
}
// Volume Controls
const openVolume = 1;
let lastVolume;
// Volume bar
function changeVolume(e) {
    let volume = e.offsetX / volumeRange.offsetWidth;
    if (volume < 0.1) {
        volume = 0
    } else if (volume > 0.9) {
        volume = 1;
    }
    volumeBar.style.width = `${volume * 100}%`;
    videoEl.volume = volume;
    volumeIcon.className = ""
    if (volume > 0.7) {
        volumeIcon.classList.add("fas", "fa-volume-up")
    } else if (volume > 0 && volume < 0.7) {
        volumeIcon.classList.add("fas", "fa-volume-down")
    } else if (volume == 0) {
        volumeIcon.classList.add("fas", "fa-volume-off");
    }
    lastVolume = volume;
}
// Mute / Unmute
function toggleMute() {
    volumeIcon.className = ""
    if (videoEl.volume) {
        lastVolume = videoEl.volume;
        videoEl.volume = 0;
        volumeBar.style.width = "0%"
        volumeIcon.classList.add("fas", "fa-volume-mute");
        volumeIcon.setAttribute("title", "mute");
    } else {
        videoEl.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;
        if (lastVolume > 0.7) {
            volumeIcon.classList.add("fas", "fa-volume-up")
        } else if (lastVolume > 0 && lastVolume < 0.7) {
            volumeIcon.classList.add("fas", "fa-volume-down")
        } else if (lastVolume == 0) {
            volumeIcon.classList.add("fas", "fa-volume-off");
        }
    }
}
// Playback Rate
function setSpeed() {
    videoEl.playbackRate = speed.value
}
// fullscreen
let fullscreen = false;
// Open fullscreen
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}
/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}
// Toggle Fullscreen
// <i class="fas fa-compress"></i>
function toggleFullscreen() {
    if (!fullscreen) {
        openFullscreen(player);
        fullscreenIcon.classList.replace("fa-expand", "fa-compress")
    } else {
        closeFullscreen();
        fullscreenIcon.classList.replace("fa-compress", "fa-expand")
    }
    fullscreen = !fullscreen
}

// Event Listener
playBtn.addEventListener("click", togglePlay);
videoEl.addEventListener("click", togglePlay);
videoEl.addEventListener("ended", showPlayIcon)
videoEl.addEventListener("timeupdate", updateProgress);
videoEl.addEventListener("canplay", updateProgress);
progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);
speed.addEventListener("change", setSpeed);
fullscreenBtn.addEventListener("click", toggleFullscreen)