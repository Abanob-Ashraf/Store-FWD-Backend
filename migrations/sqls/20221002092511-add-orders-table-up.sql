CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(30) NOT NULL,
    user_id integer REFERENCES users(id) NOT NULL,
    order_time TIMESTAMP NOT NULL
);