import express, { Response } from 'express';
import router from './route';
import path from 'path';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, './public/style.css'));
});

app.get('/script.js', (req, res) => {
  res.sendFile(path.join(__dirname, './public/script.js'));
});

app.get('/new-book', (req, res) => {
  res.sendFile(path.join(__dirname, './public/new-book/index.html'));
});

app.get('/genres', (req, res) => {
  res.sendFile(path.join(__dirname, './public/genres.html'));
});

app.get('/genre/:genre', (req, res) => {
  res.sendFile(path.join(__dirname, './public/genre.html'));
});

app.get('/book/:id', (req, res) => {
  res.sendFile(path.join(__dirname, './public/book.html'));
});

app.get('/edit-book/:id', (req, res) => {
  res.sendFile(path.join(__dirname, './public/edit-book.html'));
});

app.get('/author/:name', (req, res) => {
  res.sendFile(path.join(__dirname, './public/author.html'));
});

app.get('/authors', (req, res) => {
  res.sendFile(path.join(__dirname, './public/authors.html'));
});

app.use('/', router);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
