let startX = 0,
  startY = 0,
  offsetX = 0,
  offsetY = 0,
  isDragging = false,
  initialX = 0, // Beginpositie X
  initialY = 0; // Beginpositie Y

const afbeelding = document.getElementById("mijnAfbeelding");

afbeelding.addEventListener("mousedown", (e) => {
  e.preventDefault(); // Voorkomt ongewenst browsergedrag
  isDragging = true;

  // Sla de beginpositie van de afbeelding op
  initialX = afbeelding.offsetLeft;
  initialY = afbeelding.offsetTop;

  // Bereken de afstand van de cursor tot de afbeelding
  offsetX = e.clientX - afbeelding.offsetLeft;
  offsetY = e.clientY - afbeelding.offsetTop;

  document.addEventListener("mousemove", mouseMove);
});

document.addEventListener("mouseup", () => {
  // Verplaats de afbeelding terug naar de beginpositie wanneer de muis wordt losgelaten
  if (isDragging) {
    afbeelding.style.left = initialX + "px";
    afbeelding.style.top = initialY + "px";
  }

  isDragging = false;
  document.removeEventListener("mousemove", mouseMove);
});

function mouseMove(e) {
  if (!isDragging) return;

  // Bereken de nieuwe positie van de afbeelding zodat deze onder de cursor blijft
  const newX = e.clientX - offsetX;
  const newY = e.clientY - offsetY;

  afbeelding.style.left = newX + "px";
  afbeelding.style.top = newY + "px";
}
