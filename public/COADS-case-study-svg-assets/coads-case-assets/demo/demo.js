const root = document.documentElement;
const replay = document.querySelector("#replay");

function play() {
  root.classList.remove("play");
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add("play")));
}

replay.addEventListener("click", play);
play();
