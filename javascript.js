const newBook = document.querySelector('.new-book-button');
const newBookDialog = document.querySelector('.new-book-dialog');
const cancelButton = document.querySelector('.cancel-button');
const submitButton = document.querySelector('.submit-button');
const newBookForm = document.querySelector('#new-book-form');
const library = document.querySelector('.library');

newBook.addEventListener('click', () => {
  newBookDialog.showModal();
});

submitButton.addEventListener('click', (event) => {
  event.preventDefault();

  const formData = new FormData(newBookForm);
  let title, author, pages, read;
  for (const [key, value] of formData) {
    switch(key) {
      case 'title': 
        title = value;
        break;
      case 'author': 
        author = value;
        break;
      case 'pages': 
        pages = value;
        break;
      case 'read': 
        if (value === 'read') 
          read = 'Yes';
        else
          read = 'No';
        break;
    }
  }
  console.log('Submit button event listener activated.');

  const book = new Book(title, author, pages, read);
  addBookToLibrary(book);
  displayBooks();
  newBookDialog.close();
  newBookForm.reset();
});


const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function addBookToLibrary(book) {
  book.index = myLibrary.length;
  myLibrary.push(book);
}

function displayBooks() {
  removeLibraryChildNodes();
  myLibrary.forEach((book) => {
    createNewBook(book);
  });
}

function removeLibraryChildNodes() {
  console.log('Inside removeLibraryChildNodes()');

  while (library.firstChild) {
    library.removeChild(library.firstChild);
  }
}

function createNewBook(book) {
  const newBook = document.createElement('div');
  newBook.setAttribute('class', 'book');
  for (const key in book) {
    if (key === 'index') {
      continue;
    }
    const divLabel = document.createElement('div');
    divLabel.setAttribute('class', `${key} label`);
    divLabel.textContent = `${key[0].toUpperCase()}${key.slice(1)}:`;

    const divValue = document.createElement('div');
    divValue.setAttribute('class', `${key} value`);
    divValue.textContent = `${book[key]}`;

    newBook.appendChild(divLabel);
    newBook.appendChild(divValue);
  }

  const readButton = document.createElement('button');
  readButton.setAttribute('id', `r${book.index}`);
  readButton.setAttribute('class', 'read-button');
  readButton.textContent = newBook.lastChild.textContent;
  newBook.lastChild.textContent = '';
  newBook.lastChild.appendChild(readButton);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.setAttribute('class', 'delete-button');
  deleteButton.setAttribute('id', `${book.index}`);
  newBook.appendChild(deleteButton);

  library.appendChild(newBook);
}


const deleteButton = document.querySelector('.delete-button');

library.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-button')) {
    myLibrary.splice(Number(event.target.id), 1);
    reIndex();
    displayBooks();
  }
});

function reIndex() {
  for (let i = 0; i < myLibrary.length; i++) {
    myLibrary[i].index = i;
  }
}

library.addEventListener('click', (event) => {
  if (event.target.classList.contains('read-button')) {
    toggleReadValue(event.target.id); 
  }
});

function toggleReadValue(id) {
  const readButton = document.querySelector(`#${id}`);
  if (readButton.textContent === 'Yes') {
    readButton.textContent = 'No';
  } else {
    readButton.textContent = 'Yes';
  }
}