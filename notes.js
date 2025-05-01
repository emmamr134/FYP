document.addEventListener("DOMContentLoaded", () => {
    const notesContentSection = document.getElementById("all-notes-content");

    if (!notesContentSection) {
        console.error("Notes content section not found!");
        return;
    }

    let notesFound = false;

    function getOriginalTitleFromKey(key) {

        let titlePart = key.substring(6); 
  
        titlePart = titlePart.replace(/_/g, ' ');
        return titlePart; 
    }

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);


        if (key && key.startsWith("notes_")) {
            const bookTitle = getOriginalTitleFromKey(key); 
            const notes = JSON.parse(localStorage.getItem(key) || "[]");

            if (notes.length > 0) {
                notesFound = true;

                const bookNotesContainer = document.createElement("div");
                bookNotesContainer.classList.add("book-notes-group");

                const titleHeading = document.createElement("h2");
                titleHeading.textContent = bookTitle; 

                const notesList = document.createElement("ul");

                notes.forEach(noteText => {
                    const listItem = document.createElement("li");
                    listItem.textContent = noteText;
                    notesList.appendChild(listItem);
                });

                bookNotesContainer.appendChild(titleHeading);
                bookNotesContainer.appendChild(notesList);
                notesContentSection.appendChild(bookNotesContainer);
            }
        }
    }

    if (!notesFound) {
        const noNotesMessage = document.createElement("p");
        noNotesMessage.textContent = "No notes saved yet. Go to a book page to add some!";
        notesContentSection.appendChild(noNotesMessage);
    }
});
