let users = [];
let currentUser = null;

// Simulate user database and notes
function showSignUpForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        currentUser = user;
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('signup-form').style.display = 'none';
        document.getElementById('notes-page').style.display = 'block';
        document.getElementById('user-name').textContent = user.email;
        loadNotes();
    } else {
        alert('Invalid credentials!');
    }
}

function signUpUser(event) {
    event.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (users.some(user => user.email === email)) {
        alert('User already exists!');
        return;
    }

    const newUser = { email, password, notes: [] };
    users.push(newUser);
    alert('Sign-up successful! You can now log in.');
    showLoginForm();
}

function logout() {
    currentUser = null;
    document.getElementById('notes-page').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

function loadNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';
    currentUser.notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.innerHTML = `
            <p>${note}</p>
            <button onclick="editNote(${index})">Edit</button>
            <button onclick="deleteNote(${index})">Delete</button>
        `;
        notesList.appendChild(noteElement);
    });
}

function showCreateNoteForm() {
    document.getElementById('create-note-form').style.display = 'block';
    document.getElementById('notes-page').style.display = 'none';
}

function saveNote() {
    const noteContent = document.getElementById('note-content').value;
    if (noteContent) {
        currentUser.notes.push(noteContent);
        alert('Note saved!');
        document.getElementById('note-content').value = '';
        loadNotes();
        document.getElementById('create-note-form').style.display = 'none';
        document.getElementById('notes-page').style.display = 'block';
    }
}

function cancelCreateNote() {
    document.getElementById('create-note-form').style.display = 'none';
    document.getElementById('notes-page').style.display = 'block';
}

function editNote(index) {
    document.getElementById('edit-note-form').style.display = 'block';
    document.getElementById('notes-page').style.display = 'none';
    document.getElementById('edit-note-content').value = currentUser.notes[index];
    document.getElementById('edit-note-content').setAttribute('data-index', index);
}

function updateNote() {
    const noteIndex = document.getElementById('edit-note-content').getAttribute('data-index');
    const updatedContent = document.getElementById('edit-note-content').value;

    if (updatedContent) {
        currentUser.notes[noteIndex] = updatedContent;
        loadNotes();
        document.getElementById('edit-note-form').style.display = 'none';
        document.getElementById('notes-page').style.display = 'block';
    }
}

function cancelEditNote() {
    document.getElementById('edit-note-form').style.display = 'none';
    document.getElementById('notes-page').style.display = 'block';
}

function deleteNote(index) {
    currentUser.notes.splice(index, 1);
    loadNotes();
}