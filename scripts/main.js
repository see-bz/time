let isInitial = true,
  is12hTimeFormat = true;

const $constants = Object.freeze({
  title: {
    prefix: "Time: ",
    suffix: "",
  },
  date: {
    datePrefix: "",
    dateSuffix: "",
    weekPrefix: "Week ",
    weekSuffix: "",
    tzPrefix: "[",
    tzSuffix: "]",
  },
});

const $dom = {
  body: document.body,
  clockContainer: document.querySelector("#clock-container"),
  clock: document.querySelector("#digital-clock"),
  cHours: document.querySelector("#hours"),
  cMinutes: document.querySelector("#minutes"),
  cSeconds: document.querySelector("#seconds"),
  cPeriod: document.querySelector("#period"),
  date: document.querySelector("#date"),
  week: document.querySelector("#week"),
  timezone: document.querySelector("#timezone"),
};

function registerEvents() {
  $dom.body.addEventListener("dblclick", (e) => {
    e.preventDefault();
    const elem = $dom.body;
    toggleFullScreen(elem);
  });
  $dom.body.addEventListener("click", (e) => {
    e.preventDefault();
    is12hTimeFormat = !is12hTimeFormat;
  });
}

function updatePageTitle(hours, minutes) {
  document.title = `${$constants.title.prefix}${hours}:${minutes}${$constants.title.suffix}`;
}

function updateDate(now) {
  const { date, week, timeZone } = getDate(now);
  const { datePrefix, dateSuffix, tzPrefix, tzSuffix, weekPrefix, weekSuffix } =
    $constants.date;

  $dom.date.innerHTML = `${datePrefix}${date}${dateSuffix}`;
  $dom.week.innerHTML = `${weekPrefix}${week}${weekSuffix}`;
  $dom.timezone.innerHTML = `${tzPrefix}${timeZone}${tzSuffix}`;
}

function render() {
  const now = new Date();
  const { hours24, hours12, period, minutes, seconds } = getTime(now);

  const hours = is12hTimeFormat ? hours12 : hours24;

  if (is12hTimeFormat) {
    $dom.cPeriod.textContent = period;
  } else {
    $dom.cPeriod.textContent = "";
  }

  $dom.cHours.textContent = hours;
  $dom.cMinutes.textContent = minutes;
  $dom.cSeconds.textContent = seconds;

  // Every minute or initial
  if (isInitial || Number(seconds) == 0) {
    console.log("[X1] Every Minute Updating");

    updateDate(now);
    updatePageTitle(hours, minutes);
  }
  // Every hour or initial
  if (isInitial || Number(minutes) == 0) {
    console.log("[X2] Hourly Updating");

    setGradientBasedOnTime(Number(hours24));
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
