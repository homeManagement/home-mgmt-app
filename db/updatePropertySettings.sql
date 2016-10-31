UPDATE property_settings
SET receive_text = $1, receive_email = $2, receive_weather = $3
WHERE property_id = $4;
