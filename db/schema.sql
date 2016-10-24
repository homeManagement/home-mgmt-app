CREATE TABLE users(
ID serial Primary Key,
username varchar(100) ,
password varchar(100) ,
facebookID varchar(400) ,
email varchar(100) ,
first_name varchar(100) ,
last_name varchar(100) ,
phone_number int ,
photo text ,
timezone varchar(100)
);

CREATE TABLE user_settings(

ID serial Primary Key,
user_id int ,
Global_receive_text boolean ,
Global_receive_email boolean ,
Global_receive_weather boolean
);

CREATE TABLE property(

ID serial Primary Key,
user_id int ,
name varchar(100) ,
zipcode varchar(11) ,
type_id int
);

CREATE TABLE property_settings(

ID serial Primary Key,
property_id int ,
receive_text boolean ,
receive_email boolean ,
receive_weather boolean
);

CREATE TABLE default_maintenance(

ID serial Primary Key,
name varchar(100) ,
type_id int ,
interval decimal(5) ,
last_date date ,
season varchar(50) ,
outdoor boolean
);

CREATE TABLE property_maintenance(

ID serial Primary Key,
property_id int ,
name varchar(100) ,
type_id int ,
interval float8 ,
specific date ,
next_date date ,
last_date date ,
season varchar(50) ,
outdoor boolean ,
notes text ,
One_time boolean ,
inactive boolean
);

CREATE TABLE alert(

ID serial Primary Key,
property_id int ,
user_id int ,
due_date date ,
create_date date ,
url text
);

CREATE TABLE type(

create_date date ,
url text
);
