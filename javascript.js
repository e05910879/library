const newBook = document.querySelector('.new-book-button');
const newBookDialog = document.querySelector('.new-book-dialog');
const submitButton = document.querySelector('.submit-button');

newBook.addEventListener('click', () => {
  newBookDialog.showModal();
});

submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  newBookDialog.close();
});

