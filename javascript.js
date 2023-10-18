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
        read = value;
        break;
    }
  }

  console.log('Submit button event listener activated.');

  addBookToLibrary(title, author, pages, read);
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

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);

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
    const divLabel = document.createElement('div');
    divLabel.setAttribute('class', `${key} label`);
    divLabel.textContent = `${key[0].toUpperCase()}${key.slice(1)}:`;

    const divValue = document.createElement('div');
    divValue.setAttribute('class', `${key} value`);
    divValue.textContent = `${book[key]}`;

    newBook.appendChild(divLabel);
    newBook.appendChild(divValue);
  }
  library.appendChild(newBook);
}