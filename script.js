const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const userInput = document.getElementById("user-input");
const result = document.getElementById("results-div");
const keys = document.querySelectorAll(".keypad .keys");

// To validate the user input
function validator(trimmedInput) {
  const patterns = [
    /^1 \d{3}-\d{3}-\d{4}$/,
    /^1 \(\d{3}\) \d{3}-\d{4}$/,
    /^1\(\d{3}\)\d{3}-\d{4}$/,
    /^1 \d{3} \d{3} \d{4}$/,
    /^\d{10}$/,
    /^\d{3}-\d{3}-\d{4}$/,
    /^\(\d{3}\)\d{3}-\d{4}$/,
  ];

  const isValid = patterns.some((pattern) => pattern.test(trimmedInput));

  result.textContent = isValid
    ? `Valid US number: ${trimmedInput}`
    : `Invalid US number: ${trimmedInput}`;

  userInput.value = "";
}

// Event handler
function handleCheck() {
  const trimmedInput = userInput.value.trim();

  trimmedInput === ""
    ? alert("Please provide a phone number")
    : validator(trimmedInput);
}

// Check button
checkBtn.addEventListener("click", handleCheck);

// When using enter key
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleCheck();
  }
});

// Keypad
keys.forEach((key) => {
  key.addEventListener("click", () => {
    const value = key.textContent.trim();
    if (!value) return;
    userInput.value += value;
    userInput.focus();
    userInput.setSelectionRange(userInput.value.length, userInput.value.length);
    toggleClearBtn();
  });
});

// Show/hide clear button on input (spaces included)
const toggleClearBtn = () => {
  if (userInput.value === "") {
    clearBtn.style.opacity = "0";
    clearBtn.style.pointerEvents = "none";

    setTimeout(() => {
      clearBtn.hidden = true;
    }, 100);
  } else {
    clearBtn.hidden = false;

    setTimeout(() => {
      clearBtn.style.opacity = "1";
      clearBtn.style.pointerEvents = "auto";
    }, 10);
  }
};

// Listen for any input (including spaces)
userInput.addEventListener("input", toggleClearBtn);

// Clear button
clearBtn.addEventListener("click", () => {
  userInput.value = "";
  result.textContent = "";
  toggleClearBtn(); // Hide after clearing
});

// Prevent tab for aesthetic purposes
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    e.preventDefault();
  }
});

// Clock
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");

  hours = hours % 12;
  hours = hours ? hours : 12;

  document.getElementById("clock").textContent = `${hours}:${minutes}`;
}

// Update every minute
setInterval(updateClock, 60000);
updateClock();

// Press any key to focus
document.addEventListener("keydown", (e) => {
  const isInputFocused = document.activeElement === userInput;

  if (!isInputFocused && e.key.length === 1) {
    userInput.focus();

    userInput.setSelectionRange(userInput.value.length, userInput.value.length);
  }
});
