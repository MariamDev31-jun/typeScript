"use strict";
/* =====================================================
   Q1 - Base Class: User
===================================================== */
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    id;
    name;
    email;
    password;
    phone;
    age;
    // Q5: Aggregation - User can own multiple Notebooks
    notebooks = [];
    constructor(id, name, email, password, phone, age) {
        if (age < 18 || age > 60) {
            throw new Error("Age must be between 18 and 60");
        }
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.age = age;
    }
    // Q1: Display User Information
    displayInfo() {
        console.log("ID:", this.id);
        console.log("Name:", this.name);
        console.log("Email:", this.email);
        console.log("Phone:", this.phone);
        console.log("Age:", this.age);
    }
    // Q5: Add Notebook
    addNotebook(notebook) {
        this.notebooks.push(notebook);
    }
    // Q5: Get User Notebooks
    getNotebooks() {
        return [...this.notebooks];
    }
}
/* =====================================================
   Q2 - Inheritance: Admin
===================================================== */
class Admin extends User {
    // Admin manages Notes through a Notebook
    manageNotes(notebook) {
        console.log("Admin is managing notes:");
        notebook.getAllNotes().forEach(note => {
            console.log(note.preview());
        });
    }
}
/* =====================================================
   Q3 - Class: Note
===================================================== */
class Note {
    id;
    title;
    content;
    userId;
    // Q6: Association - Note has an author (User)
    author;
    // Private constructor
    constructor(id, title, content, author) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.userId = author.id;
    }
    // Create Note through factory method
    static create(id, title, content, author) {
        return new Note(id, title, content, author);
    }
    preview() {
        return this.content.substring(0, 20);
    }
}
/* =====================================================
   Q4 - Composition: NoteBook and Notes
===================================================== */
class NoteBook {
    id;
    name;
    // Composition: Notebook owns its Notes
    notes = [];
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    // Add Note
    addNote(id, title, content, author) {
        const note = Note.create(id, title, content, author);
        this.notes.push(note);
        return note;
    }
    // Q4: Remove Note
    removeNote(noteId) {
        this.notes = this.notes.filter(note => note.id !== noteId);
    }
    // Q4: Get All Notes
    getAllNotes() {
        return [...this.notes];
    }
}
/* =====================================================
   Q7 - Generics: Storage
===================================================== */
class Storage {
    items = [];
    // Q7: Add Item
    addItem(item) {
        this.items.push(item);
    }
    // Q7: Remove Item
    removeItem(item) {
        this.items = this.items.filter(current => current !== item);
    }
    // Q7: Get All Items
    getAllItems() {
        return [...this.items];
    }
}
/* =====================================================
   Test
===================================================== */
// Q1: Create User and Display Information
const user1 = new User(1, "Mariam", "mariam@gmail.com", "123456", "01000000000", 20);
user1.displayInfo();
// Q2: Create Admin
const admin1 = new Admin(2, "Admin", "admin@gmail.com", "admin123", "01011111111", 30);
// Q4: Create Notebook
const notebook1 = new NoteBook(1, "My Notebook");
// Q4: Notebook creates and adds its own Notes
const note1 = notebook1.addNote(1, "Study", "Learning TypeScript and OOP concepts", user1);
const note2 = notebook1.addNote(2, "Project", "Complete Notes Management System", user1);
console.log(notebook1.getAllNotes());
// Q4: Remove Note
notebook1.removeNote(1);
console.log(notebook1.getAllNotes());
// Q5: Aggregation - User owns Notebook
user1.addNotebook(notebook1);
console.log(user1.getNotebooks());
// Q6: Association - Note has an Author
console.log(note2.author.name);
console.log(note2.userId);
// Q2: Admin manages Notes through Notebook
admin1.manageNotes(notebook1);
// Q7: Generics - Storage
const noteStorage = new Storage();
noteStorage.addItem(note1);
noteStorage.addItem(note2);
console.log(noteStorage.getAllItems());
// Q7: Remove Item
noteStorage.removeItem(note1);
console.log(noteStorage.getAllItems());
