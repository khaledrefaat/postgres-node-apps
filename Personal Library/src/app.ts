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

app.use('/', router);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
