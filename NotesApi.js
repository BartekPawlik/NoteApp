export default class NotesApi {

static getAllNotes() {
 const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

 return notes.sort((a, b) => {
    return new Date(a.updated) > new Date(b.updated) ? -1 :1;
 })
}

static saveNote(noteToSave) {
const notes = NotesApi.getAllNotes()
const exisiting = notes.find(note => note.id == noteToSave.id)

if(exisiting){
    exisiting.title = noteToSave.title;
    exisiting.body = noteToSave.body;
    exisiting.update = new Date().toDateString()
}else{

    noteToSave.id = Math.floor(Math.random() * 1000000)
    noteToSave.updated = new Date().toDateString();
    
    notes.push(noteToSave);
}




localStorage.setItem("notesapp-notes", JSON.stringify(notes))



}

static deleteNote(id){
const notes = NotesApi.getAllNotes();
const newNotes = notes.filter(note => note.id != id)

localStorage.setItem('notesapp-notes', JSON.stringify(newNotes))

}
    
}

