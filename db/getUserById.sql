SELECT id, first_name as firstname, last_name, phone_number, photo, password
FROM users WHERE id = $1;

------------- for user settings page ------------
