let startX = 0,
  startY = 0,
  offsetX = 0,
  offsetY = 0,
  isDragging = false,
  initialX = 0,
  initialY = 0;

const afbeelding1 = document.getElementById("mijnAfbeelding1");
const afbeelding2 = document.getElementById("mijnAfbeelding5");

function startDrag(e) {
  e.preventDefault();
  isDragging = true;

  const touch = e.touches ? e.touches[0] : e; // Check of het een touch-event is

  initialX = afbeelding1.offsetLeft;
  initialY = afbeelding1.offsetTop;
  offsetX = touch.clientX - afbeelding1.offsetLeft;
  offsetY = touch.clientY - afbeelding1.offsetTop;

  document.addEventListener("mousemove", moveDrag);
  document.addEventListener("touchmove", moveDrag);
}

function moveDrag(e) {
  if (!isDragging) return;

  const touch = e.touches ? e.touches[0] : e;

  const newX = touch.clientX - offsetX;
  const newY = touch.clientY - offsetY;

  afbeelding1.style.left = newX + "px";
  afbeelding1.style.top = newY + "px";
}

function stopDrag() {
  if (isDragging) {
    if (checkOverlap(afbeelding1, afbeelding2)) {
      console.log("Afbeeldingen overlappen!");
      alert(
        "Afbeeldingen overlappen! Potion1 gaat terug naar zijn startpositie."
      );
    }
    afbeelding1.style.left = initialX + "px";
    afbeelding1.style.top = initialY + "px";
  }

  isDragging = false;
  document.removeEventListener("mousemove", moveDrag);
  document.removeEventListener("touchmove", moveDrag);
}

afbeelding1.addEventListener("mousedown", startDrag);
afbeelding1.addEventListener("touchstart", startDrag);
document.addEventListener("mouseup", stopDrag);
document.addEventListener("touchend", stopDrag);

// Overlap check functie blijft hetzelfde
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
