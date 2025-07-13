function openModal(imgName, title, desc) {
  const modal = document.getElementById("imgModal");
  const img = document.getElementById("modalImage");
  const tit = document.getElementById("modalTitle");
  const des = document.getElementById("modalDesc");
  img.src = "img/" + imgName;
  tit.textContent = title;
  des.textContent = desc;
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
