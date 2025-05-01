let isHighlighting = false;
let lastHighlightedText = "";
let lastHighlightedSpan = null;
let lastHighlightedHTML = null;



document.addEventListener("DOMContentLoaded", () => {
 
  function loadBookText(filename) {
    fetch(filename)
      .then(response => response.text())
      .then(raw => {

        let text = raw.replace(/\r\n?/g, "\n");
        text = text.replace(/"(?=\s)/g, '"\n\n');

        const paragraphs = text
          .split(/\n{2,}/)
          .map(p => `<p>${p.trim()}</p>`)
          .join("");

        const container = document.getElementById("book-text");
        if (container) container.innerHTML = paragraphs;
      })
      .catch(err => {
        console.error("Failed to load book text:", err);
        const container = document.getElementById("book-text");
        if (container) container.textContent = "Failed to load book text.";
      });
  }


  document.getElementById("book-text").addEventListener("mouseup", () => {
    if (isHighlighting) return; 
  
    const selection = window.getSelection().toString().trim();
if (selection && selection.split(/\s+/).length === 1) {
  fetchDefinition(selection);
}
});
   
  
  (function initBookView() {
    const bookData = JSON.parse(localStorage.getItem("currentBook"));
    const titleEl = document.getElementById("book-title");
    const imgEl = document.getElementById("book-image");

    if (!bookData) {
      if (titleEl) titleEl.textContent = "No book selected.";
      return;
    }

    if (titleEl) titleEl.textContent = bookData.title;
    if (imgEl) imgEl.src = bookData.image;

    const bookFiles = {
      "Romeo and Juliet": "romeoandjuliet.txt",
      "Sense and Sensibility": "senseandsensibility.txt"
    };

    const filename = bookFiles[bookData.title];
    if (filename) loadBookText(filename);
    else if (titleEl) titleEl.textContent = "No book text available.";
  })();

  const reader = document.getElementById("book-text");


  let touchStartX = 0;
  const swipeThreshold = 50;
  if (reader) {
    reader.addEventListener("touchstart", e => {
      touchStartX = e.changedTouches[0].screenX;
    });
    reader.addEventListener("touchend", e => {
      const dx = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(dx) < swipeThreshold) return;

      
      const nav = document.querySelector("nav");
      const main = document.querySelector("main");
      if (nav && main) {
        const navHeight = nav.getBoundingClientRect().height;
        main.style.paddingTop = `${navHeight}px`;
      }
     });
  }
  
  function showDefinition(message) {
    const popup = document.getElementById("dictionary-popup");
    const defText = document.getElementById("definition-text");
    if (defText) defText.textContent = message;
    if (popup) popup.classList.remove("hidden");
  }

  function closeDefinition() {
    const popup = document.getElementById("dictionary-popup");
    if (popup) popup.classList.add("hidden");
  }

  document.getElementById("close-dict").addEventListener("click", closeDefinition);

  function fetchDefinition(word) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then(res => res.json())
      .then(data => {
        const def = data[0]?.meanings[0]?.definitions[0]?.definition;
        showDefinition(def ? `${word}: ${def}` : `${word}: No definition found.`);
      })
      .catch(err => {
        console.error("Dictionary fetch error:", err);
        showDefinition(`${word}: No definition found.`);
      });
  }

  document.getElementById("book-text").addEventListener("mouseup", () => {
    if (isHighlighting) return;
  
    const selection = window.getSelection();
    const word = selection.toString().trim();
  
    const isSingleWord = /^[a-zA-Z]+$/.test(word);
  
    if (word && isSingleWord) {
      fetchDefinition(word);
    }
  });

  const closeBtn = document.getElementById("close-dict");
  if (closeBtn) closeBtn.addEventListener("click", closeDefinition);

  //Notes Feature
  const notesTextArea = document.getElementById("book-note");
  const saveNoteBtn = document.getElementById("save-note-btn");
  const notesList = document.getElementById("notes-list");
  let currentBookTitle = ''; 

  function getNotesKey(title) {
    const sanitizedTitle = title.replace(/[^a-zA-Z0-9 -]/g, "").replace(/\s+/g, "_");
    return `notes_${sanitizedTitle}`;
  }

  function loadNotes(bookTitle) {
    if (!bookTitle || !notesList) return;
    const notesKey = getNotesKey(bookTitle);
    const savedNotes = JSON.parse(localStorage.getItem(notesKey) || "[]");

    notesList.innerHTML = ''; // Clear existing notes
    savedNotes.forEach(note => {
      const li = document.createElement("li");
      li.textContent = note;
      notesList.appendChild(li);
    });
  }

  function saveNote(bookTitle) {
    if (!bookTitle || !notesTextArea) return;
    const noteText = notesTextArea.value.trim();
    if (noteText) {
      const notesKey = getNotesKey(bookTitle);
      const savedNotes = JSON.parse(localStorage.getItem(notesKey) || "[]");
      savedNotes.push(noteText);
      localStorage.setItem(notesKey, JSON.stringify(savedNotes));
      notesTextArea.value = ''; 
      loadNotes(bookTitle); // Refresh the list
    }
  }

  (function initBookView() {
    const bookData = JSON.parse(localStorage.getItem("currentBook"));
    const titleEl = document.getElementById("book-title");
    const imgEl = document.getElementById("book-image"); 

    if (!bookData) {
      if (titleEl) titleEl.textContent = "No book selected.";
      return;
    }

    currentBookTitle = bookData.title; 
    if (titleEl) titleEl.textContent = currentBookTitle;
    if (imgEl) imgEl.src = bookData.image;

    const bookFiles = {
      "Romeo and Juliet": "romeoandjuliet.txt",
      "Sense and Sensibility": "senseandsensibility.txt"
    };

    const filename = bookFiles[currentBookTitle];
    if (filename) {
        loadBookText(filename);
    } else if (titleEl) {
        console.warn("No text file mapping found for:", currentBookTitle);
        const container = document.getElementById("book-text");
        if (container) container.textContent = "Book text content not available.";
    }

    loadNotes(currentBookTitle);

  })(); 

  if (saveNoteBtn) {
    saveNoteBtn.addEventListener("click", () => {
      saveNote(currentBookTitle);
    });
  }


  const toggleNotesBtn = document.getElementById("toggle-notes-btn");
  const closeNotesBtn = document.getElementById("close-notes-btn");
  const notesPopup = document.getElementById("notes-popup");
  const notesPopupTitle = document.getElementById("notes-popup-title");

  function openNotesPopup() {
      if (notesPopup && notesPopupTitle && currentBookTitle) {
          notesPopupTitle.textContent = currentBookTitle; 
          notesPopup.classList.remove("hidden");
      }
  }

  function closeNotesPopup() {
      if (notesPopup) {
          notesPopup.classList.add("hidden"); 
      }
  }

  if (toggleNotesBtn) {
    toggleNotesBtn.addEventListener("click", openNotesPopup);
  }

  if (closeNotesBtn) {
    closeNotesBtn.addEventListener("click", closeNotesPopup);
  }

  const navNotesLink = document.querySelector('nav ul.items a[href="notes.html"]');
  if (navNotesLink) { 
      navNotesLink.addEventListener('click', (event) => {
          event.preventDefault();
          openNotesPopup();
      });
  }
  //Notes Feature Ends


  const dictCloseBtn = document.getElementById("close-dict"); 
  if (dictCloseBtn) {
    dictCloseBtn.addEventListener("click", () => { 
        closeDefinition(); 
    });
  }


}); 

function highlightSelectedWord() {
  const selection = window.getSelection();
  const selectedText = selection.toString().trim();

  if (!selectedText && justHighlighted && lastHighlightedSpan && lastHighlightedSpan.parentNode) {
    const parent = lastHighlightedSpan.parentNode;
    const textNode = document.createTextNode(lastHighlightedSpan.textContent);
    parent.replaceChild(textNode, lastHighlightedSpan);

    lastHighlightedSpan = null;
    lastHighlightedHTML = null;
    justHighlighted = false;
    return;
  }

  if (!selection || !selectedText || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  const span = document.createElement("span");
  span.className = "highlighted";
  span.textContent = selectedText;


  lastHighlightedSpan = span;
  lastHighlightedHTML = range.cloneContents();
  justHighlighted = true;

  range.deleteContents();
  range.insertNode(span);
  selection.removeAllRanges();
}
