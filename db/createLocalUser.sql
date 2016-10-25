INSERT INTO users (first_name, last_name, email, password)
SELECT $1, $2, $3, $4;
