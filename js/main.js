/* Escalation demo: hand-written examples that illustrate the
   PROCEED / ESCALATE flow of the capstone project. These are not
   outputs of the real system and use no real thresholds. */

const examples = [
  {
    domain: "Food ordering",
    text: "Reorder the veg biryani I ordered last Friday.",
    checks: [
      { name: "Understanding confidence", pass: true, result: "High", why: "The intent (reorder) and the item are stated clearly." },
      { name: "Operation risk", pass: true, result: "Low", why: "Placing a repeat food order is routine and easy to correct." },
      { name: "Critical entities", pass: true, result: "Complete", why: "The item and the earlier order can both be identified." }
    ]
  },
  {
    domain: "Travel and airline",
    text: "Cancel my flight and refund it to a different card.",
    checks: [
      { name: "Understanding confidence", pass: true, result: "High", why: "Cancellation and refund are both stated clearly." },
      { name: "Operation risk", pass: false, result: "High", why: "Cancelling and redirecting a payment is hard to undo." },
      { name: "Critical entities", pass: false, result: "Missing", why: "Which flight, and which card?" }
    ]
  },
  {
    domain: "Appointment scheduling",
    text: "Move my appointment to sometime next week.",
    checks: [
      { name: "Understanding confidence", pass: true, result: "High", why: "The intent (reschedule) is clear." },
      { name: "Operation risk", pass: true, result: "Low", why: "Rescheduling can be changed again later." },
      { name: "Critical entities", pass: false, result: "Missing", why: "No specific date or time was given." }
    ]
  },
  {
    domain: "E-commerce",
    text: "the thing i got last time, do the return thing",
    checks: [
      { name: "Understanding confidence", pass: false, result: "Low", why: "The request is vague about what to return." },
      { name: "Operation risk", pass: true, result: "Moderate", why: "A return can usually be reviewed before it is processed." },
      { name: "Critical entities", pass: false, result: "Missing", why: "No product or order is named." }
    ]
  }
];

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const requestsEl = document.getElementById("demo-requests");
const requestEl = document.getElementById("demo-request");
const checksEl = document.getElementById("demo-checks");
const outcomeEl = document.getElementById("demo-outcome");

let timers = [];

function clearTimers() {
  timers.forEach(clearTimeout);
  timers = [];
}

function revealLater(el, delay) {
  if (reduceMotion) {
    el.classList.add("in");
    return;
  }
  timers.push(setTimeout(() => el.classList.add("in"), delay));
}

function render(index, animate) {
  clearTimers();
  const ex = examples[index];

  requestsEl.querySelectorAll(".req").forEach((btn, i) => {
    const selected = i === index;
    btn.setAttribute("aria-checked", String(selected));
    btn.tabIndex = selected ? 0 : -1;
  });

  requestEl.textContent = ex.text;
  checksEl.innerHTML = "";
  outcomeEl.className = "demo-outcome";
  outcomeEl.innerHTML = "";

  ex.checks.forEach((c, i) => {
    const li = document.createElement("li");
    li.className = `check ${c.pass ? "pass" : "fail"}${animate ? " reveal" : ""}`;
    li.innerHTML = `
      <span class="check-name">${c.name}</span>
      <span class="check-result">${c.result}</span>
      <span class="check-why">${c.why}</span>`;
    checksEl.appendChild(li);
    if (animate) revealLater(li, 140 * (i + 1));
  });

  const failed = ex.checks.filter((c) => !c.pass);
  const proceed = failed.length === 0;

  outcomeEl.classList.add(proceed ? "proceed" : "escalate");
  if (animate) outcomeEl.classList.add("reveal");
  outcomeEl.innerHTML = proceed
    ? `<strong>PROCEED</strong><span>Every check passed, so the request is processed automatically.</span>`
    : `<strong>ESCALATE</strong><span>Sent to a human reviewer because of: ${failed
        .map((c) => c.name.toLowerCase())
        .join(" and ")}.</span>`;
  if (animate) revealLater(outcomeEl, 140 * (ex.checks.length + 1));
}

examples.forEach((ex, i) => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "req";
  btn.setAttribute("role", "radio");
  btn.innerHTML = `<span class="req-domain">${ex.domain}</span>${ex.text}`;
  btn.addEventListener("click", () => render(i, true));
  requestsEl.appendChild(btn);
});

/* Arrow-key support for the radio group */
requestsEl.addEventListener("keydown", (e) => {
  const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"];
  if (!keys.includes(e.key)) return;
  e.preventDefault();
  const buttons = [...requestsEl.querySelectorAll(".req")];
  const current = buttons.findIndex((b) => b.getAttribute("aria-checked") === "true");
  const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1;
  const next = (current + step + buttons.length) % buttons.length;
  render(next, true);
  buttons[next].focus();
});

render(1, false);

/* Footer year */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
