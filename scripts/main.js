let isInitial = true;

const $constants = Object.freeze({
  title: {
    prefix: "Time: ",
    suffix: "",
  },
});

const $dom = {
  body: document.body,
  clockContainer: document.querySelector("#clock-container"),
  clock: document.querySelector("#digital-clock"),
  date: document.querySelector("#date-container"),
};

function registerEvents() {
  $dom.body.addEventListener("dblclick", (e) => {
    e.preventDefault();
    const elem = $dom.body;
    toggleFullScreen(elem);
  });
}

function render() {
  const now = new Date();
  const { hours, minutes, seconds } = getTime(now);

  $dom.clock.textContent = `${hours}:${minutes}:${seconds}`;

  // Every minute or initial
  if (isInitial || Number(seconds) == 0) {
    console.log("[X1] Every Minute Updating");
    updateDate(now);
    updateTitle(hours, minutes);
  }
  // Every hour or initial
  if (isInitial || Number(minutes) == 0) {
    console.log("[X2] Hourly Updating");

    setGradientBasedOnTime(Number(hours));
  }

  // Only initial
  if (isInitial) {
    console.log("[X3] Initial");

    setInterval(render, 1000);
    registerEvents();

    // Initialised
    isInitial = false;
  }
}

render();
