-- Sample SQL to add cover_image_url to existing albums and songs
-- You can run this in your database to test the new image functionality

-- Add some placeholder cover images to albums
UPDATE album SET cover_image_url = 'https://via.placeholder.com/300x300/ff7675/ffffff?text=Album+1' WHERE album_id = 1;
UPDATE album SET cover_image_url = 'https://via.placeholder.com/300x300/74b9ff/ffffff?text=Album+2' WHERE album_id = 2;
UPDATE album SET cover_image_url = 'https://via.placeholder.com/300x300/00b894/ffffff?text=Album+3' WHERE album_id = 3;

-- Add some placeholder cover images to songs (using same as album or individual)
UPDATE song SET cover_image_url = 'https://via.placeholder.com/300x300/ff7675/ffffff?text=Song+1' WHERE song_id = 1;
UPDATE song SET cover_image_url = 'https://via.placeholder.com/300x300/74b9ff/ffffff?text=Song+2' WHERE song_id = 2;
UPDATE song SET cover_image_url = 'https://via.placeholder.com/300x300/00b894/ffffff?text=Song+3' WHERE song_id = 3;

-- Alternative: Use actual placeholder service images
-- UPDATE album SET cover_image_url = 'https://picsum.photos/300?random=1' WHERE album_id = 1;
-- UPDATE album SET cover_image_url = 'https://picsum.photos/300?random=2' WHERE album_id = 2;
