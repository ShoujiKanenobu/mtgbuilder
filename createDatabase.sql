  
create table decks (
	user_id serial not null primary key,
	name text not null unique,
	list text not null
);

