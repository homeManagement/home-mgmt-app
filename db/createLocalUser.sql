INSERT INTO users (first_name, last_name, email, password, phone_number)
SELECT $1, $2, $3, $4, $5;
