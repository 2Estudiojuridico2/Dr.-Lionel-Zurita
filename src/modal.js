function openModal(imgName) {
  const modal = document.getElementById("imgModal");
  const img = document.getElementById("modalImage");
  img.src = "img/correlatividades/" + imgName;
  modal.style.display = "block";
}
function closeModal() {
  document.getElementById("imgModal").style.display = "none";
}
window.onclick = function(event) {
  const modal = document.getElementById("imgModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
