CREATE TABLE movies(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL,
    year INTEGER NOT NULL DEFAULT EXTRACT(
        YEAR
        FROM CURRENT_DATE
    ),
    director_id INTEGER NOT NULL REFERENCES directors (id) ON DELETE CASCADE,
    actor_id INTEGER[] NOT NULL REFERENCES actor (id),
    genre_id INTEGER[] NOT NULL REFERENCES genre (id),
    rating INTEGER NOT NULL CHECK (
        rating >= 0
        AND rating <= 5
    ),
    watched BOOLEAN NOT NULL DEFAULT FALSE
);