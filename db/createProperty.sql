INSERT INTO property (user_id, name, zipcode, type_id)
VALUES ($1, $2, $3, $4)
RETURNING id;
