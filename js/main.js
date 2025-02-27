let startX = 0,
  startY = 0,
  currentX = 0,
  currentY = 0,
  isDragging = false;

const afbeelding = document.getElementById("mijnAfbeelding");

afbeelding.addEventListener("mousedown", (e) => {
  e.preventDefault(); // Voorkomt ongewenst browsergedrag
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;

  // Bepaal de huidige positie van de afbeelding
  const rect = afbeelding.getBoundingClientRect();
  currentX = rect.left;
  currentY = rect.top;

  document.addEventListener("mousemove", mouseMove);
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  document.removeEventListener("mousemove", mouseMove);
});

function mouseMove(e) {
  if (!isDragging) return;

  const newX = e.clientX - startX;
  const newY = e.clientY - startY;

  afbeelding.style.transform = `translate(${currentX + newX}px, ${
    currentY + newY
  }px)`;
}
