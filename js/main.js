let startX = 0,
  startY = 0,
  offsetX = 0,
  offsetY = 0,
  isDragging = false,
  initialX = 0, // Beginpositie X
  initialY = 0; // Beginpositie Y

const afbeelding1 = document.getElementById("mijnAfbeelding");
const afbeelding2 = document.getElementById("mijnAfbeelding2");

// Voeg de eventlistener toe voor de eerste afbeelding (potion1)
afbeelding1.addEventListener("mousedown", (e) => {
  e.preventDefault(); // Voorkomt ongewenst browsergedrag
  isDragging = true;

  // Sla de beginpositie van de afbeelding op
  initialX = afbeelding1.offsetLeft;
  initialY = afbeelding1.offsetTop;

  // Bereken de afstand van de cursor tot de afbeelding
  offsetX = e.clientX - afbeelding1.offsetLeft;
  offsetY = e.clientY - afbeelding1.offsetTop;

  document.addEventListener("mousemove", mouseMove);
});

document.addEventListener("mouseup", () => {
  // Verplaats de afbeelding terug naar de beginpositie wanneer de muis wordt losgelaten
  if (isDragging) {
    if (checkOverlap(afbeelding1, afbeelding2)) {
      console.log("Afbeeldingen overlappen!");
      alert(
        "Afbeeldingen overlappen! Potion1 gaat terug naar zijn startpositie."
      );
      afbeelding1.style.left = initialX + "px";
      afbeelding1.style.top = initialY + "px";
    } else {
      afbeelding1.style.left = initialX + "px";
      afbeelding1.style.top = initialY + "px";
    }
  }

  isDragging = false;
  document.removeEventListener("mousemove", mouseMove);
});

// De beweging van de afbeelding
function mouseMove(e) {
  if (!isDragging) return;

  // Bereken de nieuwe positie van de afbeelding zodat deze onder de cursor blijft
  const newX = e.clientX - offsetX;
  const newY = e.clientY - offsetY;

  afbeelding1.style.left = newX + "px";
  afbeelding1.style.top = newY + "px";
}

// Functie om te controleren of twee afbeeldingen overlappen
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
