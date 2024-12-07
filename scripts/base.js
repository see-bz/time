function getTime(date = new Date()) {
  // Update clock
  const hours24Val = date.getHours();
  const hours24 = hours24Val.toString().padStart(2, "0");
  const hours12Val = hours24 % 12 || 12;
  const hours12 = hours12Val.toString().padStart(2, "0");

  const period = hours24 < 12 ? "AM" : "PM";

  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return { hours24, hours12, period, minutes, seconds };
}

function getWeekNumber(date = new Date()) {
  // Get the week number
  const startDate = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil((days + startDate.getDay() + 1) / 7);

  return weekNumber;
}

function getDate(date = new Date()) {
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

  return {
    date: formattedDate,
    week: weekNumber,
    timeZone,
  };
}

function setGradientBasedOnTime(hour) {
  hour = hour ?? new Date().getHours();

  const body = document.body;

  if (hour >= 5 && hour < 12) {
    body.dataset.theme = "morning";
  } else if (hour >= 12 && hour < 17) {
    body.dataset.theme = "afternoon";
  } else if (hour >= 17 && hour < 20) {
    body.dataset.theme = "evening";
  } else {
    body.dataset.theme = "night";
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

async function fetchComponent(name) {
  return new Promise((resolve, reject) => {
    return fetch(`/components/${name}.html`)
      .then((response) => {
        if (!response.ok) throw new Error("Something went wrong");

        return response.text();
      })
      .then(resolve)
      .catch((error) => {
        console.error("Failed to fetch component: ", error);
        return reject(error);
      });
  });
}

async function loadComponent(name, selector) {
  const parent = document.querySelector(selector);

  if (!parent) {
    console.log("Selector provided is invalid");
    return;
  }

  try {
    const html = await fetchComponent(name);
    parent.innerHTML = html;
  } catch (error) {
    console.log(error);
  }
}
