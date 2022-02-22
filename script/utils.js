export function openPopup(popup) {
  popup.classList.add("popup_display");
  document.addEventListener("mousedown", closeByClickOutside);
  document.addEventListener("keydown", closeByEscape);
}

export function closePopup(popup) {
  popup.classList.remove("popup_display");
  document.removeEventListener("mousedown", closeByClickOutside);
  document.removeEventListener("keydown", closeByEscape);
}

function closeByClickOutside(evt) {
  if (evt.target.classList.contains("popup_display")) {
    closePopup(evt.target);
  }
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_display"));
  }
}

const closeButtons = document.querySelectorAll(".popup__close");
closeButtons.forEach((closeButton) =>
  closeButton.addEventListener("click", () => {
    const popup = closeButton.closest(".popup");
    closePopup(popup);
  })
);
