/* 
1 => focus to the input when i start => done
2 => when i generate the upcoming words delete the current word
3 => add feature: chose the level

*/
// catch selectors
let levelName = document.querySelector(".lvl");
let levelTime = document.querySelector(".seconds");
let startTimer = document.querySelector(".start");
let wordContain = document.querySelector(".the-word");
let wordInput = document.querySelector(".input");
let pendingWordsContain = document.querySelector(".upcoming-words");
let time = document.querySelector(".time span");
let got = document.querySelector(".got");
let total = document.querySelector(".total");
let finish = document.querySelector(".finish");
const words = [
  "innovation",
  "creative",
  "technology",
  "development",
  "progress",
  "sustainable",
  "efficiency",
  "solution",
  "productivity",
  "future",
  "dynamic",
  "growth",
  "strategy",
  "design",
  "network",
  "platform",
  "interface",
  "connectivity",
  "impact",
  "collaborate",
  "structure",
  "knowledge",
  "framework",
  "analytics",
  "interactive",
  "responsive",
  "scalable",
  "vision",
  "optimize",
  "synergy",
];
// settings levels
let levels = {
  easy: 8,
  normal: 5,
  hard: 2,
};
// default level
let defaultLevel = "normal"; // change Level From Here
let select = document.querySelector("select");
select.onblur = () => {
  pendingWordsContain.innerHTML = "";
  levelName.innerHTML = "";
  levelTime.innerHTML = "";
  time.innerHTML = "";
  pendingWordsContain.innerHTML = "";
  wordContain.innerHTML = "";
  finish.innerHTML = "";
  defaultLevel = select.value;
  let defaultLevelTime = levels[`${defaultLevel}`];
  let defaultLvlTime = defaultLevelTime;
  // add level Name to the page
  levelName.append(defaultLevel);
  // add The Time to the Page
  levelTime.append(defaultLevelTime);
  // now start game
  time.append(defaultLevelTime);
  // generate random word
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // add words to word contain
  words.splice(words.indexOf(randomWord), 1);
  words.forEach((ele) => {
    let word = document.createElement("div");
    word.innerText = ele;
    pendingWordsContain.append(word);
  });
  // add the random word to word contain
  wordContain.appendChild(document.createTextNode(randomWord));
  // disabled input
  let focus;
  startTimer.addEventListener("click", () => {
    focus = setInterval(() => {
      wordInput.focus();
    }, 0);
  });
  startTimer.onclick = function (e) {
    let timer = setInterval(() => {
      wordInput.removeAttribute("disabled");
      defaultLevelTime--;
      time.innerText = defaultLevelTime;
      if (wordInput.value == randomWord || defaultLevelTime == 0) {
        clearInterval(timer);
        clearInterval(focus);
        got.innerText = defaultLevelTime;
        total.innerText = defaultLvlTime;
        wordInput.blur();
        wordInput.setAttribute("disabled", "");
        wordInput.value = "";
        defaultLevelTime = levels.normal;
      }
      wordInput.onblur = function () {
        if (wordInput.value == randomWord) {
          finish.innerHTML = "";
          wordInput.blur();
          let good = document.createElement("div");
          good.className = "good";
          good.innerText = "You Are Awesome";
          finish.append(good);
          wordInput.setAttribute("disabled", "");
        } else {
          finish.innerHTML = "";
          let bad = document.createElement("div");
          bad.className = "bad";
          bad.innerText = "Game Over";
          finish.append(bad);
          wordInput.setAttribute("disabled", "");
        }
      };
    }, 1000);
  };
};
