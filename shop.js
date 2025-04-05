function addToBookshelf(title, image) {
    let bookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
  
    const alreadyAdded = bookshelf.some(book => book.title === title);
    if (alreadyAdded) {
      alert(`${title} is already in your bookshelf!`);
      return;
    }
  
    bookshelf.push({ title, image });
    localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
    alert(`${title} added to your bookshelf!`);
  }
  