document.addEventListener("DOMContentLoaded", function() {
    var notes = JSON.parse(localStorage.getItem("notes")) || [];
    renderNotes(notes);
});

function addNote() {
    var noteInput = document.getElementById("note-input");
    var noteText = noteInput.value.trim();

    // Regular expression to check if the input contains only alphabetic characters
    var alphabeticRegex = /^[a-zA-Z\s]+$/;

    if (noteText === "") {
        alert("Please enter a note");
        return;
    }

    if (!alphabeticRegex.test(noteText)) {
        alert("Note should contain only alphabetic characters");
        return;
    }

    var notes = JSON.parse(localStorage.getItem("notes")) || [];

    // Check if there are already 5 notes
    if (notes.length >= 5) {
        alert("You can only have 5 notes at a time");
        return;
    }

    notes.push({ text: noteText, attachment: null });
    localStorage.setItem("notes", JSON.stringify(notes));

    renderNotes(notes);

    noteInput.value = "";
}

function renderNotes(notes) {
    var noteList = document.getElementById("note-list");
    noteList.innerHTML = "";

    notes.forEach(function(note, index) {
        var noteItem = document.createElement("li");
        noteItem.innerHTML = note.text;
        noteList.appendChild(noteItem);

        // Add edit button
        var editButton = document.createElement("button");
        editButton.innerHTML = "Edit";
        editButton.onclick = function() {
            var updatedNote = prompt("Edit note:", note.text);
            if (updatedNote !== null) {
                notes[index].text = updatedNote;
                localStorage.setItem("notes", JSON.stringify(notes));
                renderNotes(notes);
            }
        };
        noteItem.appendChild(editButton);

        // Add delete button
        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.onclick = function() {
            notes.splice(index, 1);
            localStorage.setItem("notes", JSON.stringify(notes));
            renderNotes(notes);
        };
        noteItem.appendChild(deleteButton);

        // Add attachment button
        var attachmentButton = document.createElement("button");
        attachmentButton.innerHTML = "Attach File";
        attachmentButton.onclick = function() {
            var fileInput = document.getElementById("attachment-input");
            fileInput.click();
            fileInput.onchange = function() {
                var file = fileInput.files[0];
                if (file) {
                    notes[index].attachment = file.name;
                    localStorage.setItem("notes", JSON.stringify(notes));
                    renderNotes(notes);
                }
            };
        };
        noteItem.appendChild(attachmentButton);

        // Display attachment if exists
        if (note.attachment) {
            var attachmentLink = document.createElement("a");
            attachmentLink.href = "#"; // Replace "#" with attachment URL
            attachmentLink.innerHTML = note.attachment;
            noteItem.appendChild(attachmentLink);
        }
    });
}
