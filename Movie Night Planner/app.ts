import express from 'express';
import routes from './src/routes';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/public/index.html');
});

app.get('/app.js', (req, res) => {
  res.sendFile(__dirname + '/src/public/app.js');
});

app.get('/app.css', (req, res) => {
  res.sendFile(__dirname + '/src/public/app.css');
});

app.use('/movies', routes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
