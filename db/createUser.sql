INSERT INTO users (facebookid, first_name, last_name, email, photo)
SELECT $1, $2, $3, $4, $5;
