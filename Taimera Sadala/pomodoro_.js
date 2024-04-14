let focusButton = document.getElementById("focus");
let buttons = document.querySelectorAll(".btn");
let shortBreakButton = document.getElementById("shortbreak");
let longBreakButton = document.getElementById("longbreak");
let startBtn = document.getElementById("btn-start");
let reset = document.getElementById("btn-reset");
let pause = document.getElementById("btn-pause");
let time = document.getElementById("time");
let focusTimeInput = document.getElementById("focus-time");
let breakTimeInput = document.getElementById("break-time");
let updateTimerButton = document.getElementById("update-timer");
let cycleCount = 0;
let cycleCountDisplay = document.getElementById("cycle-count");
let isFocusTimeCompleted = false;
let userSetFocusTime = focusTimeInput.value || "25";
let userSetBreakTime = breakTimeInput.value || "5";
let startTime;
let endTime;

let set;
let active = "focus";
let count = 0;
let paused = true;
let minCount = 24;
let userSetLongBreakTime = 15;
time.textContent = `${minCount + 1}:00`;

focusButton.classList.add("btn-active");

const setActiveButton = (activeButton) => {
  buttons.forEach((button) => {
    button.classList.remove("btn-active");
  });
  activeButton.classList.add("btn-active");
};

const appendZero = (value) => {
  value = value < 10 ? `0${value}` : value;
  return value;
};

const resetTimer = () => {
  clearInterval(set);
  paused = true;
  if (active === "focus") {
    minCount = userSetFocusTime;
  } else if (active === "short") {
    minCount = userSetBreakTime;
  }
  count = 0;
  time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
  startBtn.classList.remove("hide");
  pause.classList.remove("show");
  reset.classList.remove("show");
};

reset.addEventListener(
  "click",
  (resetTime = () => {
    pauseTimer();
    if (active === "focus") {
      minCount = userSetFocusTime;
    } else if (active === "short") {
      minCount = userSetBreakTime;
    }
    count = 0;
    time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
    startBtn.classList.remove("hide");
    pause.classList.remove("show");
    reset.classList.remove("show");
  })
);

const removeFocus = () => {
  buttons.forEach((btn) => {
    btn.classList.remove("btn-focus");
  });
};

focusButton.addEventListener("click", () => {
  removeFocus();
  focusButton.classList.add("btn-focus");
  pauseTimer();
  active = "focus";
  minCount = focusTimeInput.value;
  count = 0;
  time.textContent = `${minCount}:${appendZero(count)}`;
});

shortBreakButton.addEventListener("click", () => {
  active = "short";
  removeFocus();
  shortBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = breakTimeInput.value;
  count = 0;
  time.textContent = `${minCount}:${appendZero(count)}`;
});

longBreakButton.addEventListener("click", () => {
  setActiveButton(longBreakButton);
  active = "long";
  minCount = userSetLongBreakTime;
  removeFocus();
  longBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 14;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

updateTimerButton.addEventListener("click", () => {
  const focusTime = parseInt(focusTimeInput.value);
  const breakTime = parseInt(breakTimeInput.value);
  const longBreakTime = parseInt(longBreakTimeInput.value); // New long break time input field

  if (focusTime > 0 && breakTime > 0 && longBreakTime > 0) {
    userSetFocusTime = focusTime;
    userSetBreakTime = breakTime;
    userSetLongBreakTime = longBreakTime; // Update the userSetLongBreakTime variable
    active = "focus";
    minCount = userSetFocusTime;
    count = 0;
    cycleCount = 0;
    isFocusTimeCompleted = false;
    cycleCountDisplay.textContent = `Completed cycles: ${cycleCount}`;
    time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
    focusButton.classList.add("btn-active");
    shortBreakButton.classList.remove("btn-active");
    longBreakButton.classList.remove("btn-active");
  } else {
    alert(
      "Focus time, short break time, and long break time must be greater than 0."
    );
  }
});

longBreakButton.addEventListener("click", () => {
  active = "long";
  removeFocus();
  longBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 14;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

pause.addEventListener(
  "click",
  (pauseTimer = () => {
    paused = true;
    clearInterval(set);
    startBtn.classList.remove("hide");
    pause.classList.remove("show");
    reset.classList.remove("show");
  })
);

startBtn.addEventListener("click", () => {
  reset.classList.add("show");
  pause.classList.add("show");
  startBtn.classList.add("hide");
  startBtn.classList.remove("show");
  if (paused) {
    paused = false;
    time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
    setTimeout(() => {
      set = setInterval(() => {
        if (count == 0) {
          if (minCount == 0) {
            if (active === "focus") {
              isFocusTimeCompleted = true;
              active = "short";
              minCount = userSetBreakTime;
              focusButton.classList.remove("btn-active");
              shortBreakButton.classList.add("btn-active");
            } else if (active === "short") {
              if (isFocusTimeCompleted) {
                cycleCount++;
                cycleCountDisplay.textContent = `Completed cycles: ${cycleCount}`;
                isFocusTimeCompleted = false;
              }
              if (cycleCount == 2) {
                active = "long";
                minCount = userSetLongBreakTime;
                cycleCount = 0;
                shortBreakButton.classList.remove("btn-active");
                longBreakButton.classList.add("btn-active");
              } else {
                active = "focus";
                minCount = userSetFocusTime;
                shortBreakButton.classList.remove("btn-active");
                focusButton.classList.add("btn-active");
              }
            } else if (active === "long") {
              active = "focus";
              minCount = userSetFocusTime;
              longBreakButton.classList.remove("btn-active");
              focusButton.classList.add("btn-active");
            }
            count = 0;
            time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
          } else {
            minCount--;
            count = 59;
          }
        } else {
          count--;
        }
        time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
      }, 1000);
      time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
    }, 1000);
  }
});

// modal

var modal = document.getElementById("settings-modal");
var btn = document.getElementById("settings-btn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};


var translations = {
    lv: {
      STRT: "Sākt",
      Fcs: "Fokusēties",
      LB: "Garā Atpūta",
      SB: "Īsā atpūta",
      CCL: "Pabeigtie Cikli: 0",
      PSE: "Pauze",
    },
    en: {
      STRT: "Start",
      Fcs: "Focus",
      LB: "Long Break",
      SB: "Short Break",
      CCL: "Completed Cycles: 0",
      PSE: "Pause",
    },
    ru: {
      STRT: "Sākt",
      Fcs: "Fokusēties",
      LB: "",
      SB: "",
      CCL: "Pabeigtie Cikli: 0",
      PSE: "",
    },
  };
  
  function translatePage(lang) {
    var translatableElements = document.querySelectorAll("[data-translate]");
  
    translatableElements.forEach(function (element) {
      var key = element.getAttribute("data-translate");
      if (translations[lang] && translations[lang][key]) {
        var translation = translations[lang][key];
        translation = translation.replace(/\n/g, "<br>"); // Replace \n with <br>
        element.innerHTML = translation;
      }
    });
  }
  
  var languageButtons = document.querySelectorAll(".language");

  languageButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var lang = this.getAttribute("data-lang");
      translatePage(lang);
    });
  });
  
  var userLang = navigator.language || navigator.userLanguage;
  userLang = userLang.substr(0, 2);
  
  translatePage(userLang);


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