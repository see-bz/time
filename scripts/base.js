function getTime(date = new Date()) {
  // Update clock
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return { hours, minutes, seconds };
}

function getWeekNumber(date = new Date()) {
  // Get the week number
  const startDate = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil((days + startDate.getDay() + 1) / 7);

  return weekNumber;
}

function updateDate(date = new Date()) {
  const weekNumber = getWeekNumber(date);

  // Format the date
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);
  const timeZone = date
    .toLocaleString("en-US", { timeZoneName: "short" })
    .split(" ")
    .pop();

  const dateString = `${formattedDate}, Week ${weekNumber} [${timeZone}]`;
  $dom.date.innerHTML = dateString;
}

function updateTitle(hours, minutes) {
  document.title = `${$constants.title.prefix}${hours}:${minutes}${$constants.title.suffix}`;
}

function setGradientBasedOnTime(hour) {
  hour = hour ?? new Date().getHours();

  const body = $dom.body;

  if (hour >= 5 && hour < 12) {
    body.className = "morning";
  } else if (hour >= 12 && hour < 17) {
    body.className = "afternoon";
  } else if (hour >= 17 && hour < 20) {
    body.className = "evening";
  } else {
    body.className = "night";
  }
}

function toggleFullScreen(elem) {
  window.isFullScreen = window.isFullScreen ?? false;

  if (isFullScreen) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  } else {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  }
  isFullScreen = !isFullScreen;
}
