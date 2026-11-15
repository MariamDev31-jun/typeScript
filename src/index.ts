
/* =====================================================
   Q1 - Base Class: User
===================================================== */

class User {
    public id: number;
    public name: string;
    public email: string;

    private password: string;
    protected phone: string;
    private age: number;

    // Q5: Aggregation - User can own multiple Notebooks
    public notebooks: NoteBook[] = [];

    constructor(
        id: number,
        name: string,
        email: string,
        password: string,
        phone: string,
        age: number
    ) {
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
    public displayInfo(): void {
        console.log("ID:", this.id);
        console.log("Name:", this.name);
        console.log("Email:", this.email);
        console.log("Phone:", this.phone);
        console.log("Age:", this.age);
    }

    // Q5: Add Notebook
    public addNotebook(notebook: NoteBook): void {
        this.notebooks.push(notebook);
    }

    // Q5: Get User Notebooks
    public getNotebooks(): NoteBook[] {
        return [...this.notebooks];
    }
}


/* =====================================================
   Q2 - Inheritance: Admin
===================================================== */

class Admin extends User {

    // Admin manages Notes through a Notebook
    public manageNotes(notebook: NoteBook): void {
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
    public id: number;
    public title: string;
    public content: string;
    public userId: number;

    // Q6: Association - Note has an author (User)
    public author: User;

    // Private constructor
    private constructor(
        id: number,
        title: string,
        content: string,
        author: User
    ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.userId = author.id;
    }

    // Create Note through factory method
    public static create(
        id: number,
        title: string,
        content: string,
        author: User
    ): Note {
        return new Note(id, title, content, author);
    }

    public preview(): string {
        return this.content.substring(0, 20);
    }
}


/* =====================================================
   Q4 - Composition: NoteBook and Notes
===================================================== */

class NoteBook {
    public id: number;
    public name: string;

    // Composition: Notebook owns its Notes
    private notes: Note[] = [];

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    // Add Note
    public addNote(
        id: number,
        title: string,
        content: string,
        author: User
    ): Note {

        const note = Note.create(
            id,
            title,
            content,
            author
        );

        this.notes.push(note);

        return note;
    }

    // Q4: Remove Note
    public removeNote(noteId: number): void {
        this.notes = this.notes.filter(
            note => note.id !== noteId
        );
    }

    // Q4: Get All Notes
    public getAllNotes(): Note[] {
        return [...this.notes];
    }
}


/* =====================================================
   Q7 - Generics: Storage
===================================================== */

class Storage<T> {
    private items: T[] = [];

    // Q7: Add Item
    public addItem(item: T): void {
        this.items.push(item);
    }

    // Q7: Remove Item
    public removeItem(item: T): void {
        this.items = this.items.filter(
            current => current !== item
        );
    }

    // Q7: Get All Items
    public getAllItems(): T[] {
        return [...this.items];
    }
}


/* =====================================================
   Test
===================================================== */
// Q1: Create User and Display Information

const user1 = new User(
    1,
    "Mariam",
    "mariam@gmail.com",
    "123456",
    "01000000000",
    20
);

user1.displayInfo();


// Q2: Create Admin

const admin1 = new Admin(
    2,
    "Admin",
    "admin@gmail.com",
    "admin123",
    "01011111111",
    30
);


// Q4: Create Notebook

const notebook1 = new NoteBook(1, "My Notebook");


// Q4: Notebook creates and adds its own Notes

const note1 = notebook1.addNote(
    1,
    "Study",
    "Learning TypeScript and OOP concepts",
    user1
);

const note2 = notebook1.addNote(
    2,
    "Project",
    "Complete Notes Management System",
    user1
);

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

const noteStorage = new Storage<Note>();

noteStorage.addItem(note1);
noteStorage.addItem(note2);

console.log(noteStorage.getAllItems());


// Q7: Remove Item

noteStorage.removeItem(note1);

console.log(noteStorage.getAllItems());
