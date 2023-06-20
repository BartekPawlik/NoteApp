import NotesApi from "./NotesApi.js";

export default class NotesView {
    constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        
        this.root.innerHTML = `
        <div class="notes-sidebar">
        <button class="notes-add" type="button">Add Note</button>
        <div class="notes-list"></div>
    </div>
    <div class="notes-preview">
        <input class="notes-title" type="text" placeholder="New Note...">
         <textarea class="notes-body">Take Note...</textarea>

    </div>
        `
        const btnAddNote = this.root.querySelector('.notes-add');
        const inputTitle = this.root.querySelector(".notes-title");
        const inpBody = this.root.querySelector(".notes-body")

        btnAddNote.addEventListener("click", () =>{
            onNoteAdd()
        });

        [inputTitle, inpBody].forEach(inputField => {
            inputField.addEventListener("blur", () => {
                const updatedTitle = inputTitle.value.trim();
                const updatedBody = inpBody.value.trim();

                this.onNoteEdit(updatedTitle, updatedBody);
            });
        });

       this.updateNotePreviewVisibility(false)

    }

     _createListItemHTML(id, title, body, updated) {
        const MAX_BODY_LENGHT = 60;

        return`
        <div class="noteslist-item" data-note-id="${id}">
        <div class="notes-small-title">${title}</div>
        <div class="notes-small-body">
        ${body.substring(0, MAX_BODY_LENGHT)}
        ${body.lenght > MAX_BODY_LENGHT ? "..." : ""}
        </div>
        <div class="notes-small-updated>${title}"
          ${updated.toLocaleString(undefined, {dateStyle: "full", TimeStyle: "short"})}
        </div>
           </div>
        `;
     }

updateNoteList(notes) {
    const notesListContainer = this.root.querySelector(".notes-list");

    // Empty List
    notesListContainer.innerHTML = "";



for(const note of notes) {
    const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated));
     
    
    notesListContainer.insertAdjacentHTML('beforeend', html)

}

    
notesListContainer.querySelectorAll(".noteslist-item").forEach(noteListItem =>{
    noteListItem.addEventListener("click", () =>{
        this.onNoteSelect(noteListItem.dataset.noteId);
    });


    noteListItem.addEventListener("dblclick", () =>{
        const doDelete = confirm('do you sure you want to delete this note?')

        if(doDelete) {
            this.onNoteDelete(noteListItem.dataset.noteId)
        }
    })
});


}


updateActiveNote(note) {
    this.root.querySelector(".notes-title").value = note.title;
    this.root.querySelector(".notes-body").value = note.body;

this.root.querySelectorAll(".noteslist-item").forEach(noteListItem =>{
noteListItem.classList.remove("notes__list-item--selected")
});
this.root.querySelector(`.noteslist-item[data-note-id="${note.id}"]`).classList.add("notes__list-item--selected")

}


updateNotePreviewVisibility(visible) {
    this.root.querySelector('.notes-preview').style.visibility = visible ? "visible" : "hidden"
}

}

