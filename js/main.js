// main.js - Estudio Jurídico Dr. Lionel Zurita

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const closeBtn = document.querySelector(".modal-close");

  window.openModal = function (img, title, desc) {
    modal.style.display = "flex";
    modalImg.src = `./img/${img}`;
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    document.body.style.overflow = "hidden";
  };

  window.closeModal = function () {
    modal.style.display = "none";
    modalImg.src = "";
    modalTitle.textContent = "";
    modalDesc.textContent = "";
    document.body.style.overflow = "auto";
  };

  // Cierra el modal al hacer clic fuera del contenido
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Escape para cerrar modal
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "flex") {
      closeModal();
    }
  });
});
