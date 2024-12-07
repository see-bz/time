const calendar = document.querySelector("body.page-calendar");
const elMonth = calendar.querySelector("#month");
const elYear = calendar.querySelector("#year");
const elStartDay = calendar.querySelector("#start-day");
const elForm = calendar.querySelector("form");
const elGenerateBtn = calendar.querySelector("#generate");
const calendarGrid = calendar.querySelector("#calendar-grid");
const calendarHeader = calendar.querySelector("#calendar-header");

elMonth.addEventListener("change", (evt) => {
  evt.preventDefault();

  evt.target.value = evt.target.value % 13;
  if (evt.target.value <= 0) evt.target.value = 1;
});

function generateCalendar(year, month, startDay) {
  calendarGrid.innerHTML = "";

  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = new Date(year, month - 1, 1).getDay();

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Adjust the day names based on the start day
  const reorderedDayNames = [
    ...dayNames.slice(startDay),
    ...dayNames.slice(0, startDay),
  ];

  // Set header
  const monthName = new Date(year, month - 1).toLocaleString("en-US", {
    month: "long",
  });
  calendarHeader.textContent = `${monthName} ${year}`;

  // Add day names
  reorderedDayNames.forEach((day) => {
    const div = document.createElement("div");
    div.textContent = day;
    div.classList.add("day-name");
    calendarGrid.appendChild(div);
  });

  // Add empty cells for days before the first day
  let offset = (firstDay - startDay + 7) % 7; // Adjust based on selected start day
  for (let i = 0; i < offset; i++) {
    const div = document.createElement("div");
    div.classList.add("empty");
    calendarGrid.appendChild(div);
  }

  // Add day numbers
  for (let day = 1; day <= daysInMonth; day++) {
    const div = document.createElement("div");
    div.textContent = day;
    calendarGrid.appendChild(div);
  }
}

async function render(e = null) {
  if (e?.preventDefault) e.preventDefault();

  const month = parseInt(elMonth.value);
  const year = parseInt(elYear.value);
  const startDay = parseInt(elStartDay.value);

  generateCalendar(year, month, startDay);
  loadTheme();
}

async function initialise() {
  const now = new Date();

  elMonth.value = now.getMonth() + 1;
  elYear.value = now.getFullYear();

  elGenerateBtn.addEventListener("click", render);
  elForm.addEventListener("submit", render);
  render();
}

async function loadTheme() {
  await loadComponent("header-nav", "header");
}

initialise();
