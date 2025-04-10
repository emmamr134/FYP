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

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
} 
