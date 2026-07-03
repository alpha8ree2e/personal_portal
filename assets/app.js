const TOOLBOX_ITEMS = [
  {
    title: "Check Before Load",
    url: "https://checkbeforeload.streamlit.app/",
    note: "Checks whether PFF packages are in pickup-ready status, a prerequisite before loading.",
  },
  {
    title: "Daily Issue Reminder",
    url: "https://dailyissuereminder.streamlit.app/",
    note: "Generates the daily issue-package table for group chats so DSP managers can review the day's problem packages.",
  },
  {
    title: "Pickup Rate Dashboard",
    url: "https://pickup-data.pages.dev/",
    note: "Supplies the data needed to build the daily pickup-rate report.",
  },
  {
    title: "Missort Tool",
    url: "https://misapprttool.streamlit.app/",
    note: "Helps build the daily report by identifying each missorted package's original DSP and counting out-of-city packages received by our site.",
  },
  {
    title: "Issue Package Generator",
    url: "https://issuepackages.streamlit.app/",
    note: "Creates the issue-package table for the daily report.",
  },
  {
    title: "Return List Maker",
    url: "https://return-list.streamlit.app/",
    note: "Generates the package list for returns from the station back to the HUB.",
  },
  {
    title: "Double Scan Checker",
    url: "https://scan-record-export-plus.pages.dev/",
    note: "Checks whether each DSP repeated package scans as required by the station.",
  },
  {
    title: "CXK&PFF to be Signed",
    url: "https://cxk-pff-daily-operation.streamlit.app/",
    note: "Quickly compiles the CXK and PFF package list that the station needs to sign for.",
  },
  {
    title: "Operation Log Plus",
    url: "https://operation-log-plus.pages.dev/",
    note: "An upgraded DMS operation-log viewer with more features and a better user experience.",
  },
  {
    title: "DNR Interruption Dashboard",
    url: "https://dnr-interruption-dashboard.pages.dev/",
    note: "A powerful all-in-one dashboard for understanding issue packages.",
  },
];

const list = document.querySelector("#toolList");
const searchInput = document.querySelector("#toolboxSearch");
const emptyState = document.querySelector("#emptyState");
const counter = document.querySelector("#counter");
const clock = document.querySelector("#clock");

function normalize(value) {
  return value.trim().toLowerCase();
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function renderTools(items) {
  list.innerHTML = "";

  items.forEach((item) => {
    const tool = document.createElement("li");

    tool.className = "tool";
    tool.dataset.search = normalize(`${item.title} ${item.note}`);
    tool.innerHTML = `
      <button class="tool-toggle" type="button" aria-label="Show note for ${item.title}" aria-pressed="false"></button>
      <div class="tool-main">
        <div class="tool-flip">
          <a class="tool-link tool-face tool-front" href="${item.url}" target="_blank" rel="noopener noreferrer" ${item.url === "#" ? 'aria-disabled="true"' : ""}>
            ${item.title}
          </a>
          <a class="tool-link tool-face tool-back" href="${item.url}" target="_blank" rel="noopener noreferrer" ${item.url === "#" ? 'aria-disabled="true"' : ""}>
            ${item.note}
          </a>
        </div>
      </div>
    `;

    const toggle = tool.querySelector(".tool-toggle");
    toggle.addEventListener("click", () => {
      const isFlipped = tool.classList.toggle("is-flipped");
      toggle.setAttribute("aria-pressed", String(isFlipped));
      toggle.setAttribute("aria-label", `${isFlipped ? "Show title for" : "Show note for"} ${item.title}`);
    });

    list.appendChild(tool);
  });
}

function updateCounter(visibleCount) {
  counter.textContent = `${pad(visibleCount)}/${pad(TOOLBOX_ITEMS.length)}`;
}

function applySearch() {
  const query = normalize(searchInput.value);
  const tools = [...document.querySelectorAll(".tool")];
  let visibleCount = 0;

  tools.forEach((tool) => {
    const isVisible = !query || tool.dataset.search.includes(query);
    tool.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  emptyState.hidden = visibleCount > 0;
  updateCounter(visibleCount);
}

function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && document.activeElement !== searchInput) {
    event.preventDefault();
    searchInput.focus();
  }
});

searchInput.addEventListener("input", applySearch);

renderTools(TOOLBOX_ITEMS);
applySearch();
updateClock();
window.setInterval(updateClock, 1000);
