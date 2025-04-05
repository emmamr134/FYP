const container = document.getElementById("bookshelf-container");
const bookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];

if (bookshelf.length === 0) {
  container.innerHTML = "<p>Your bookshelf is empty. Go to the Shop to add books!</p>";
} else {
  bookshelf.forEach(book => {
    const bookCard = document.createElement("div");
    bookCard.className = "book";
    bookCard.innerHTML = `
      <img src="${book.image}" alt="${book.title}" />
      <h2>${book.title}</h2>
      <button onclick="readBook()">Read Book</button>
    `;
    container.appendChild(bookCard);
  });
}

function readBook() {
  window.location.href = "book.html";
}

function clearBookshelf() {
  if (confirm("Are you sure you want to clear your bookshelf?")) {
    localStorage.removeItem("bookshelf");
    location.reload();
  }
}
