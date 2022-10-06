CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    price integer NOT NULL,
    description text,
    category VARCHAR(100) NOT NULL
);