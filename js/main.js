// ---------------------RESIZE CONTAINER NAAR BREEDTE ACHTERGROND

function adjustContainerWidth() {
  const background = document.getElementById("background");
  const container = document.getElementById("container");

  if (background && container) {
    container.style.width = background.clientWidth + "px";
  }
}

// Pas de breedte aan bij het laden en wanneer het scherm verandert
window.addEventListener("load", adjustContainerWidth);
window.addEventListener("resize", adjustContainerWidth);

// ---------------------AFBEELDINGEN SLEPEN EN OVERLAP TRIGGEREN

let startX = 0,
  startY = 0,
  offsetX = 0,
  offsetY = 0,
  isDragging = false,
  initialX = 0,
  initialY = 0,
  currentDragged = null; // Houd bij welk element wordt versleept

// Variabelen voor wachtwoordinstellingen
let includeLowercase = false;
let includeUppercase = false;
let includeNumbers = false;
let includeSymbols = false;

var glitter1 = document.getElementById("glitter1");
var glitter2 = document.getElementById("glitter2");
var glitter3 = document.getElementById("glitter3");
var glitter4 = document.getElementById("glitter4");

const draggables = document.querySelectorAll(
  "#mijnAfbeelding1, #mijnAfbeelding2, #mijnAfbeelding3, #mijnAfbeelding4"
);
const dropZone = document.getElementById("mijnAfbeelding5");

function startDrag(e) {
  e.preventDefault();
  isDragging = true;

  currentDragged = e.target; // Het element dat versleept wordt opslaan
  const touch = e.touches ? e.touches[0] : e;

  initialX = currentDragged.offsetLeft;
  initialY = currentDragged.offsetTop;
  offsetX = touch.clientX - currentDragged.offsetLeft;
  offsetY = touch.clientY - currentDragged.offsetTop;

  document.addEventListener("mousemove", moveDrag);
  document.addEventListener("touchmove", moveDrag);
}

function moveDrag(e) {
  if (!isDragging || !currentDragged) return;

  const touch = e.touches ? e.touches[0] : e;
  const newX = touch.clientX - offsetX;
  const newY = touch.clientY - offsetY;

  currentDragged.style.left = newX + "px";
  currentDragged.style.top = newY + "px";
}

function stopDrag() {
  if (isDragging && currentDragged) {
    if (checkOverlap(currentDragged, dropZone)) {
      // Verander specifieke instellingen op basis van de afbeelding
      if (currentDragged.id === "mijnAfbeelding1") {
        includeLowercase = !includeLowercase; // Verander de lowercase instelling
      } else if (currentDragged.id === "mijnAfbeelding2") {
        includeUppercase = !includeUppercase; // Verander de uppercase instelling
      } else if (currentDragged.id === "mijnAfbeelding3") {
        includeNumbers = !includeNumbers; // Verander de cijfers instelling
      } else if (currentDragged.id === "mijnAfbeelding4") {
        includeSymbols = !includeSymbols; // Verander de symbolen instelling
      }

      // Verander de zichtbaarheid van de glitters op basis van de instellingen
      // Verander de lowercase instelling
      if (includeLowercase) {
        glitter1.style.visibility = "visible";
      } else {
        glitter1.style.visibility = "hidden";
      }

      // Verander de uppercase instelling
      if (includeUppercase) {
        glitter2.style.visibility = "visible";
      } else {
        glitter2.style.visibility = "hidden";
      }

      // Verander de cijfers instelling
      if (includeNumbers) {
        glitter3.style.visibility = "visible";
      } else {
        glitter3.style.visibility = "hidden";
      }

      // Verander de symbolen instelling
      if (includeSymbols) {
        glitter4.style.visibility = "visible";
      } else {
        glitter4.style.visibility = "hidden";
      }

      // Optioneel: log de veranderingen voor debugging
      console.log(
        "Wachtwoordinstellingen veranderd door overlap met " + currentDragged.id
      );
    }
    currentDragged.style.left = initialX + "px";
    currentDragged.style.top = initialY + "px";
  }

  isDragging = false;
  currentDragged = null;
  document.removeEventListener("mousemove", moveDrag);
  document.removeEventListener("touchmove", moveDrag);
}

draggables.forEach((el) => {
  el.addEventListener("mousedown", startDrag);
  el.addEventListener("touchstart", startDrag);
});

document.addEventListener("mouseup", stopDrag);
document.addEventListener("touchend", stopDrag);

function checkOverlap(img1, img2) {
  const rect1 = img1.getBoundingClientRect();
  const rect2 = img2.getBoundingClientRect();

  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}
// ---------------------INDICATIE VAN AANWEZIGHEID CATEGORIE DMV GLITTER

// ---------------------RANDOM PASSWORD GENERATOR

function generatePassword(
  length,
  includeLowercase,
  includeUppercase,
  includeNumbers,
  includeSymbols
) {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+-=";

  let allowedChars = "";
  let password = "";

  allowedChars += includeLowercase ? lowercaseChars : "";
  allowedChars += includeUppercase ? uppercaseChars : "";
  allowedChars += includeNumbers ? numberChars : "";
  allowedChars += includeSymbols ? symbolChars : "";

  if (length <= 0) {
    return `(password length must be at least 1)`;
  }
  if (allowedChars.length === 0) {
    return `(At least 1 set of character needs to be selected)`;
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    password += allowedChars[randomIndex];
  }

  return password;
}

// Functie om het wachtwoord in de HTML te tonen na een klik op de knop
function generateAndDisplayPassword() {
  // Haal de lengte van het wachtwoord op uit het inputveld
  const passwordLength = document.getElementById("numberInput").value || 10; // Default naar 10 als leeg is

  // Gebruik de actuele waarden van de wachtwoordinstellingen
  const password = generatePassword(
    passwordLength,
    includeLowercase,
    includeUppercase,
    includeNumbers,
    includeSymbols
  );

  // Wachtwoord in de HTML zetten
  document.getElementById("passwordOutput").textContent = password;

  // Roep de functie aan om de sterkte te controleren
  checkPasswordStrength(password);

  // Maak de sterkte-div zichtbaar
  document.getElementById("passwordstrengthdiv").style.visibility = "visible";
}

// PASSWORD STRENGTH

function checkPasswordStrength(password) {
  let score = 0;
  let maxScore = 6; // Max score als alle criteria behaald worden

  if (password.length >= 8) score++; // Minimaal 8 tekens
  if (password.length >= 12) score++; // Minimaal 12 tekens
  if (/[a-z]/.test(password)) score++; // Kleine letters
  if (/[A-Z]/.test(password)) score++; // Hoofdletters
  if (/[0-9]/.test(password)) score++; // Cijfers
  if (/[^a-zA-Z0-9]/.test(password)) score++; // Speciale tekens

  // Bereken percentage
  let percentage = Math.round((score / maxScore) * 100);

  let strengthText = "";
  let strengthClass = "";

  if (percentage < 40) {
    strengthText = "Zwak";
    strengthClass = "weak";
  } else if (percentage < 70) {
    strengthText = "Gemiddeld";
    strengthClass = "medium";
  } else {
    strengthText = "Sterk";
    strengthClass = "strong";
  }

  // Update de UI
  const strengthElement = document.getElementById("passwordStrength");
  strengthElement.textContent = strengthText;
  strengthElement.className = strengthClass; // Pas de kleur aan op basis van sterkte

  document.getElementById("passwordPercentage").textContent = percentage; // Toon percentage
}
