var interval;
var minutes = document.getElementById('studyTime').value;
var seconds = document.getElementById('secondsTime').value;
var completedCycles = 0;
var isPaused = false;
var isBreak = false;

function isValidNumber(num) {
    return !isNaN(num) && num >= 0;
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('restart').addEventListener('click', restartTimer);

function startTimer() {
    minutes = document.getElementById('studyTime').value;
    seconds = document.getElementById('secondsTime').value;
    if (!isValidNumber(minutes) || !isValidNumber(seconds)) {
        alert('Please pick a valid number for work time and seconds');
        return;
    }
    this.style.display = 'none';
    document.getElementById('pause').style.display = 'inline-block';
    interval = setInterval(timer, 1000);
}

function pauseTimer() {
    clearInterval(interval);
    this.style.display = 'none';
    document.getElementById('start').style.display = 'inline-block';
}

function restartTimer() {
    clearInterval(interval);
    minutes = document.getElementById('studyTime').value;
    seconds = document.getElementById('secondsTime').value;
    if (!isValidNumber(minutes) || !isValidNumber(seconds)) {
        alert('Please pick a valid number for work time and seconds');
        return;
    }
    document.getElementById('pause').style.display = 'none';
    document.getElementById('start').style.display = 'inline-block';
    interval = setInterval(timer, 1000);
}

function timer() {
    if (seconds > 0) {
        seconds--;
    } else if (minutes > 0) {
        minutes--;
        seconds = 59;
    } else {
        clearInterval(interval);
        if (isBreak) {
            completedCycles++;
            document.getElementById('completedCycles').innerText = completedCycles;
            minutes = document.getElementById('studyTime').value;
            seconds = document.getElementById('secondsTime').value;
            if (!isValidNumber(minutes) || !isValidNumber(seconds)) {
                alert('Please pick a valid number for work time');
                return;
            }
            isBreak = false;
        } else {
            minutes = document.getElementById('breakTime').value;
            seconds = document.getElementById('secondsbreak').value;
            if (!isValidNumber(minutes) || !isValidNumber(seconds)) {
                alert('Please pick a valid number for break time');
                return;
            }
            isBreak = true;
        }
        interval = setInterval(timer, 1000);
    }
    document.getElementById('timer').innerText = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}



// Settings icon popup, lai manitu laiku

var modal = document.getElementById("settingsModal");
var btn = document.getElementById("settings");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.style.display = "block";
    setTimeout(function () {
        modal.style.opacity = "1";
        modal.querySelector(".modal-content").style.transform = "scale(1)";
    }, 100);
}

span.onclick = function () {
    modal.style.opacity = "0";
    modal.querySelector(".modal-content").style.transform = "scale(0)";
    setTimeout(function () {
        modal.style.display = "none";
    }, 500);
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.opacity = "0";
        modal.querySelector(".modal-content").style.transform = "scale(0)";
        setTimeout(function () {
            modal.style.display = "none";
        }, 500);
    }
}

// cursor

const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", function (e) {

    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.style.left = `${posX}px`;
    cursorOutline.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// translations

var translations = {
    lv: {
        SMTH: "SamOvens",
        pmt: "PomoLaiks",
    },
    en: {
        SMTH: "SamOvens",
        pmt: "PomoTime",
    },
    ru: {
        SMTH: "SamOvens",
        pmt:  "PomoTime",
    },
};

function translatePage(lang) {
    var translatableElements = document.querySelectorAll('[data-translate]');

    translatableElements.forEach(function (element) {
        var key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            var translation = translations[lang][key];
            translation = translation.replace(/\n/g, "<br>");
            element.innerHTML = translation;
        }
    });
}

var buttons = document.querySelectorAll('.language');

buttons.forEach(function (button) {
    button.addEventListener('click', function () {
        var lang = this.getAttribute('data-lang');
        translatePage(lang);
    });
});

var userLang = navigator.language || navigator.userLanguage;
userLang = userLang.substr(0, 2);

translatePage(userLang);