const tableBody = document.querySelector('.table tbody');
const pageList = document.querySelector('.pagination');
const searchInput = document.querySelector('.form-control');

window.app = {
  books: [],
  currentPage: 0,
  currentTerm: '',
};

async function getBooks(page = 0, term = '') {
  try {
    const data = await fetch(`/books/${page}/${term}`);
    window.app.books = await data.json();
  } catch (err) {
    console.error(err);
  }
}

async function deleteBook(id) {
  try {
    const data = await fetch(`/books/${id}`, {
      method: 'DELETE',
    });
    await data.json(window.app.currentPage);
    await getBooks(window.app.currentPage, window.app.currentTerm);
    updateBooks();
  } catch (err) {
    console.error(err);
  }
}

function updateBooks() {
  tableBody.innerHTML = '';
  window.app.books.forEach(book => {
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
          <td><a class="text-dark" href="/book/${book.id}">${
      book.title
    }</a></td>
          <td><a class="text-dark" href="/author/${book.author
            .toLowerCase()
            .replace(' ', '-')}">${book.author}</a></td>
          <td><a class="text-dark" href="/genre/${book.genre
            .toLowerCase()
            .replace(' ', '-')}">${book.genre}</a></td>
          <td>${book.rating}</td>
          <td>${new Date(book.publication_date).toLocaleDateString()}</td>
          <td>
          <a href="/edit-book/${book.id}" class="btn btn-primary">Edit</a>
          <button class="btn btn-danger" onclick={deleteBook(${
            book.id
          })}>Delete</button>
          </td>
      `;
    tableBody.appendChild(tableRow);
  });
}

function updatePagination() {
  pageList.innerHTML = '';
  for (let i = 0; i < window.app.books[0].total_count; i += 10) {
    pageList.innerHTML += `
      <li class="page-item"><a class="page-link text-secondary" href="#">${Math.ceil(
        i / 10 + 1
      )}</a></li>
    `;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await getBooks();

    updateBooks();
    updatePagination();
  } catch (err) {
    console.error(err);
  }

  try {
    pageList.addEventListener('click', async e => {
      try {
        const pageNumber = e.target.textContent - 1;
        window.app.currentPage = pageNumber;
        await getBooks(pageNumber);
        updateBooks();
      } catch (err) {
        console.error(err);
      }
    });
  } catch (err) {
    console.error(err);
  }

  try {
    searchInput.addEventListener('input', async e => {
      setTimeout(async () => {
        console.log('working');
        try {
          window.app.currentTerm = e.target.value;
          await getBooks(0, e.target.value);
          updateBooks();
          updatePagination();
        } catch (err) {
          console.error(err);
        }
      }, 500);
    });
  } catch (err) {
    console.error(err);
  }
});
