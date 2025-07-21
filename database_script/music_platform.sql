#drop database music_platform;
create database music_platform;
use music_platform;

create table subscriber (
	subscriber_id int primary key auto_increment,
	username varchar(255) unique not null,
	name varchar(255) not null,
	dob date not null,
	country varchar(255) not null,
	passwordHash varchar(255) not null
);

create table subscription (
	subscription_id int primary key auto_increment,
	subscriber_id int not null,
	plan_name varchar(255) not null,
	description text, 
	duration_in_days int not null,
	price decimal (5, 2) not null,
	foreign key (subscriber_id) references subscriber(subscriber_id) on delete cascade 
);

create table subscription_history (
	history_id int primary key auto_increment,
	subscriber_id int not null,
	subscription_id int not null, 
	start_date date not null,
	end_date date not null,
	foreign key (subscriber_id) references subscriber(subscriber_id) on delete cascade ,
	foreign key (subscription_id) references subscription(subscription_id) on delete cascade 
);

create table song (
	song_id int primary key auto_increment,
	title varchar(255) not null,
	duration_in_sec int not null,
	album_id int not null,
	release_date date not null
);

create table play_history (
	history_id int primary key auto_increment,
	subscriber_id int not null,
	song_id int not null,
	played_at date not null,
	foreign key (subscriber_id) references subscriber(subscriber_id) on delete cascade,
	foreign key (song_id) references song(song_id) on delete cascade 
);

create table playlist (
	playlist_id int primary key auto_increment,
	title varchar(255) not null,
	description text,
	created_at date not null,
	is_public boolean default false,
	subscriber_id int not null,
	foreign key (subscriber_id) references subscriber(subscriber_id) on delete cascade 
);

create table playlist_song (
	playlist_id int,
	song_id int,
	added_at date not null,
	primary key (playlist_id, song_id),
	foreign key (playlist_id) references playlist(playlist_id) on delete cascade,
	foreign key (song_id) references song(song_id) on delete cascade 
);

create table artist (
	artist_id int primary key auto_increment,
	name varchar(255) not null,
	bio text,
	country varchar(255) not null
);

create table album (
	album_id int primary key auto_increment,
	title varchar(255) not null,
	release_date date not null,
	artist_id int not null,
	foreign key (artist_id) references artist(artist_id) on delete cascade 
);

alter table song add foreign key (album_id) references album(album_id);

create table song_artist (
	artist_id int,
	song_id int,
	primary key (artist_id, song_id),
	foreign key (artist_id) references artist(artist_id) on delete cascade,
	foreign key (song_id) references song(song_id) on delete cascade 
);

create table subscriber_artist (
	subscriber_id int,
	artist_id int,
	primary key (subscriber_id, artist_id),
	foreign key (subscriber_id) references subscriber(subscriber_id) on delete cascade,
	foreign key (artist_id) references artist(artist_id) on delete cascade 
);



-- table for user and role management
create table roles (
	role_id int primary key auto_increment,
	name varchar(255) unique not null
);

create table role_privilege (
	id int primary key auto_increment,
	role_id int not null,
	privilege varchar(255) not null,
	foreign key (role_id) references roles(role_id) on delete cascade
);

create table users (
	user_id int primary key auto_increment,
	username varchar(255) unique not null,
	password varchar(255) not null,
	role_id int not null,
	foreign key (role_id) references roles(role_id) on delete cascade
);


