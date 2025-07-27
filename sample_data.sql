-- Music Platform Sample Data Script
-- Run this script after your database is created and synced

-- Insert sample artists
INSERT INTO artist (name, bio, country) VALUES
('The Beatles', 'Legendary British rock band formed in Liverpool in 1960', 'UK'),
('Queen', 'British rock band formed in London in 1970', 'UK'),
('Michael Jackson', 'King of Pop, American singer, songwriter, and dancer', 'USA'),
('Pink Floyd', 'English rock band formed in London in 1965', 'UK'),
('Led Zeppelin', 'English rock band formed in London in 1968', 'UK'),
('Madonna', 'American singer, songwriter, and actress', 'USA'),
('Elvis Presley', 'American singer and cultural icon', 'USA'),
('Adele', 'English singer-songwriter known for her powerful vocals', 'UK');

-- Insert sample albums
INSERT INTO album (title, release_date, artist_id) VALUES
('Abbey Road', '1969-09-26', 1),
('A Night at the Opera', '1975-11-21', 2),
('Thriller', '1982-11-30', 3),
('The Dark Side of the Moon', '1973-03-01', 4),
('Led Zeppelin IV', '1971-11-08', 5),
('Like a Virgin', '1984-11-12', 6),
('Elvis Presley', '1956-03-23', 7),
('21', '2011-01-24', 8),
('Sgt. Pepper\'s Lonely Hearts Club Band', '1967-06-01', 1),
('Bohemian Rhapsody', '1975-10-31', 2);

-- Insert sample songs
INSERT INTO song (title, duration_in_sec, album_id, artist_id, release_date) VALUES
-- Abbey Road songs
('Come Together', 259, 1, 1, '1969-09-26'),
('Something', 183, 1, 1, '1969-09-26'),
('Maxwell\'s Silver Hammer', 207, 1, 1, '1969-09-26'),
('Oh! Darling', 206, 1, 1, '1969-09-26'),
('Here Comes the Sun', 185, 1, 1, '1969-09-26'),

-- A Night at the Opera songs
('Bohemian Rhapsody', 355, 2, 2, '1975-11-21'),
('You\'re My Best Friend', 172, 2, 2, '1975-11-21'),
('\'39', 210, 2, 2, '1975-11-21'),
('Sweet Lady', 240, 2, 2, '1975-11-21'),
('Seaside Rendezvous', 126, 2, 2, '1975-11-21'),

-- Thriller songs
('Wanna Be Startin\' Somethin\'', 363, 3, 3, '1982-11-30'),
('Baby Be Mine', 260, 3, 3, '1982-11-30'),
('The Girl Is Mine', 242, 3, 3, '1982-11-30'),
('Thriller', 357, 3, 3, '1982-11-30'),
('Beat It', 258, 3, 3, '1982-11-30'),
('Billie Jean', 294, 3, 3, '1982-11-30'),

-- The Dark Side of the Moon songs
('Speak to Me', 90, 4, 4, '1973-03-01'),
('Breathe', 163, 4, 4, '1973-03-01'),
('On the Run', 216, 4, 4, '1973-03-01'),
('Time', 421, 4, 4, '1973-03-01'),
('Money', 382, 4, 4, '1973-03-01'),

-- Led Zeppelin IV songs
('Black Dog', 296, 5, 5, '1971-11-08'),
('Rock and Roll', 220, 5, 5, '1971-11-08'),
('The Battle of Evermore', 351, 5, 5, '1971-11-08'),
('Stairway to Heaven', 482, 5, 5, '1971-11-08'),
('Misty Mountain Hop', 278, 5, 5, '1971-11-08'),

-- Like a Virgin songs
('Material Girl', 240, 6, 6, '1984-11-12'),
('Angel', 246, 6, 6, '1984-11-12'),
('Like a Virgin', 218, 6, 6, '1984-11-12'),
('Over and Over', 267, 6, 6, '1984-11-12'),
('Love Don\'t Live Here Anymore', 285, 6, 6, '1984-11-12'),

-- Elvis Presley songs
('Blue Suede Shoes', 120, 7, 7, '1956-03-23'),
('I\'m Counting on You', 145, 7, 7, '1956-03-23'),
('I Got a Woman', 135, 7, 7, '1956-03-23'),
('One-Sided Love Affair', 127, 7, 7, '1956-03-23'),
('I Love You Because', 163, 7, 7, '1956-03-23'),

-- 21 songs
('Rolling in the Deep', 228, 8, 8, '2011-01-24'),
('Rumour Has It', 223, 8, 8, '2011-01-24'),
('Turning Tables', 250, 8, 8, '2011-01-24'),
('Don\'t You Remember', 228, 8, 8, '2011-01-24'),
('Set Fire to the Rain', 242, 8, 8, '2011-01-24'),
('Someone Like You', 285, 8, 8, '2011-01-24'),

-- Sgt. Pepper's songs
('Sgt. Pepper\'s Lonely Hearts Club Band', 122, 9, 1, '1967-06-01'),
('With a Little Help from My Friends', 164, 9, 1, '1967-06-01'),
('Lucy in the Sky with Diamonds', 208, 9, 1, '1967-06-01'),
('Getting By', 167, 9, 1, '1967-06-01'),
('Fixing a Hole', 156, 9, 1, '1967-06-01'),

-- Bohemian Rhapsody album songs
('Death on Two Legs', 223, 10, 2, '1975-10-31'),
('Lazing on a Sunday Afternoon', 67, 10, 2, '1975-10-31'),
('I\'m in Love with My Car', 183, 10, 2, '1975-10-31'),
('You\'re My Best Friend', 172, 10, 2, '1975-10-31'),
('\'39', 210, 10, 2, '1975-10-31');

-- Insert sample subscribers (users)
INSERT INTO subscriber (username, name, dob, country, passwordHash, email) VALUES
('john_doe', 'John Doe', '1990-05-15', 'USA', '$2b$10$example_hash_1', 'john@example.com'),
('jane_smith', 'Jane Smith', '1985-08-22', 'Canada', '$2b$10$example_hash_2', 'jane@example.com'),
('music_lover', 'Alex Johnson', '1992-12-03', 'UK', '$2b$10$example_hash_3', 'alex@example.com'),
('rock_fan', 'Sarah Wilson', '1988-03-17', 'Australia', '$2b$10$example_hash_4', 'sarah@example.com');

-- Insert sample playlists
INSERT INTO playlist (title, description, created_at, is_public, subscriber_id) VALUES
('My Favorites', 'Collection of my all-time favorite songs', '2024-01-15', true, 1),
('Rock Classics', 'Classic rock songs from the 70s and 80s', '2024-01-20', true, 2),
('Chill Vibes', 'Relaxing songs for studying', '2024-02-01', false, 3),
('Workout Mix', 'High energy songs for the gym', '2024-02-10', true, 4),
('Beatles Best', 'Best Beatles songs ever', '2024-02-15', true, 1);

-- Insert sample playlist songs
INSERT INTO playlist_song (playlist_id, song_id, added_at) VALUES
-- My Favorites playlist
(1, 1, '2024-01-15 10:00:00'),  -- Come Together
(1, 6, '2024-01-15 10:05:00'),  -- Bohemian Rhapsody
(1, 14, '2024-01-15 10:10:00'), -- Thriller
(1, 24, '2024-01-15 10:15:00'), -- Stairway to Heaven
(1, 37, '2024-01-15 10:20:00'), -- Rolling in the Deep

-- Rock Classics playlist
(2, 21, '2024-01-20 14:00:00'), -- Black Dog
(2, 22, '2024-01-20 14:05:00'), -- Rock and Roll
(2, 24, '2024-01-20 14:10:00'), -- Stairway to Heaven
(2, 6, '2024-01-20 14:15:00'),  -- Bohemian Rhapsody
(2, 20, '2024-01-20 14:20:00'), -- Money

-- Chill Vibes playlist
(3, 5, '2024-02-01 16:00:00'),  -- Here Comes the Sun
(3, 39, '2024-02-01 16:05:00'), -- Turning Tables
(3, 41, '2024-02-01 16:10:00'), -- Someone Like You
(3, 8, '2024-02-01 16:15:00'),  -- '39

-- Workout Mix playlist
(4, 15, '2024-02-10 18:00:00'), -- Beat It
(4, 16, '2024-02-10 18:05:00'), -- Billie Jean
(4, 22, '2024-02-10 18:10:00'), -- Rock and Roll
(4, 37, '2024-02-10 18:15:00'), -- Rolling in the Deep

-- Beatles Best playlist
(5, 1, '2024-02-15 12:00:00'),  -- Come Together
(5, 2, '2024-02-15 12:05:00'),  -- Something
(5, 5, '2024-02-15 12:10:00'),  -- Here Comes the Sun
(5, 43, '2024-02-15 12:15:00'), -- Sgt. Pepper's Lonely Hearts Club Band
(5, 45, '2024-02-15 12:20:00'); -- Lucy in the Sky with Diamonds

-- Verify the data
SELECT 'Artists' as Table_Name, COUNT(*) as Count FROM artist
UNION ALL
SELECT 'Albums', COUNT(*) FROM album
UNION ALL
SELECT 'Songs', COUNT(*) FROM song
UNION ALL
SELECT 'Subscribers', COUNT(*) FROM subscriber
UNION ALL
SELECT 'Playlists', COUNT(*) FROM playlist
UNION ALL
SELECT 'Playlist Songs', COUNT(*) FROM playlist_song;
