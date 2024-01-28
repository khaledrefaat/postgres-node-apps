import { Request, Response } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
});

async function writeFile() {
  const sqlData = await pool.query('SELECT * FROM books ORDER BY id DESC');
  const { rows } = sqlData;
  const jsonData = JSON.stringify(rows);

  fs.writeFile('data.json', jsonData, err => {
    if (err) throw err;
    console.log('Data written to file');
  });
}

export async function getBooks(req: Request, res: Response) {
  const { page, term } = req.params;

  try {
    const params: [number, string?] = [(+page | 0) * 10];

    if (term) {
      params.push(`%${term}%`);
      const { rows } = await pool.query(
        'SELECT *, COUNT(*) OVER()::INT AS total_count FROM books WHERE CONCAT(title, genre, author) ILIKE $2 OFFSET $1 LIMIT 10',
        params
      );
      return res.json(rows);
    }

    const { rows } = await pool.query(
      'SELECT *, COUNT(*) OVER()::INT AS total_count FROM books OFFSET $1 LIMIT 10',
      params
    );
    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

export async function postBook(req: Request, res: Response) {
  const { title, genre, author, publishDate, rating, notes } = req.body;
  try {
    await pool.query(
      'INSERT INTO books (title, genre, author, publication_date, rating, notes) VALUES ($1, $2, $3, $4, $5, $6)',
      [title, genre, author, publishDate, rating, notes]
    );

    await writeFile();

    res.json({ message: 'Book added successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

export async function updateBook(req: Request, res: Response) {
  const { id } = req.params;
  const { title, genre, author, publishDate, rating, notes } = req.body;

  try {
    await pool.query(
      'UPDATE books SET title = $1, genre = $2, author = $3, publication_date = $4, rating = $5, notes = $6 WHERE id = $7',
      [title, genre, author, publishDate, rating, notes, id]
    );
    res.json({ message: 'Book updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

export async function deleteBook(req: Request, res: Response) {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM books WHERE id = $1', [id]);

    await writeFile();

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

export async function downloadBooks(req: Request, res: Response) {
  fs.readFile('data.json', (err, data) => {
    if (err) throw err;
    res.setHeader('Content-disposition', 'attachment; filename=books.json');
    res.setHeader('Content-type', 'application/json');
    res.send(data);
  });
}
