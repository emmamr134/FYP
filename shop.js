function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hidden");
  }, 2500);
}

function addToBookshelf(title, image) {
  let bookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];

  const alreadyAdded = bookshelf.some(book => book.title === title);
  if (alreadyAdded) {
    showToast(`${title} is already in your bookshelf!`);
    return;
  }

  bookshelf.push({ title, image });
  localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
  showToast(`${title} added to your bookshelf!`);
}
