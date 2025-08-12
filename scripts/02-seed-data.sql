-- Insert sample DJ users
INSERT INTO users (email, username, display_name, bio, avatar_url, cover_image_url, location, website_url, social_links, follower_count, is_verified, is_dj) VALUES
('djmike@example.com', 'djmike', 'DJ Mike', 'Electronic music producer and DJ from Los Angeles', '/placeholder.svg?height=100&width=100', '/placeholder.svg?height=400&width=800', 'Los Angeles, CA', 'https://djmike.com', '{"instagram": "@djmike", "twitter": "@djmike", "soundcloud": "djmike"}', 15420, true, true),
('sarabeats@example.com', 'sarabeats', 'Sara Beats', 'House and techno DJ spinning the hottest tracks', '/placeholder.svg?height=100&width=100', '/placeholder.svg?height=400&width=800', 'Miami, FL', 'https://sarabeats.com', '{"instagram": "@sarabeats", "twitter": "@sarabeats"}', 8930, true, true),
('alexrhythm@example.com', 'alexrhythm', 'Alex Rhythm', 'Deep house and progressive DJ from Berlin', '/placeholder.svg?height=100&width=100', '/placeholder.svg?height=400&width=800', 'Berlin, Germany', 'https://alexrhythm.de', '{"instagram": "@alexrhythm", "soundcloud": "alexrhythm"}', 12750, false, true),
('bassqueen@example.com', 'bassqueen', 'Bass Queen', 'Dubstep and bass music specialist', '/placeholder.svg?height=100&width=100', '/placeholder.svg?height=400&width=800', 'London, UK', 'https://bassqueen.co.uk', '{"instagram": "@bassqueen", "twitter": "@bassqueen", "youtube": "bassqueen"}', 22100, true, true);

-- Insert sample tracks
INSERT INTO tracks (user_id, title, description, genre, tags, audio_url, cover_image_url, duration, play_count, like_count, is_public, price) VALUES
((SELECT id FROM users WHERE username = 'djmike'), 'Midnight Drive', 'A smooth electronic journey through the night', 'Electronic', ARRAY['electronic', 'chill', 'night'], '/placeholder.svg?height=300&width=300', '/placeholder.svg?height=300&width=300', 240, 1250, 89, true, 0),
((SELECT id FROM users WHERE username = 'djmike'), 'Neon Lights', 'Upbeat synthwave track perfect for late night drives', 'Synthwave', ARRAY['synthwave', 'retro', 'upbeat'], '/placeholder.svg?height=300&width=300', '/placeholder.svg?height=300&width=300', 195, 2100, 156, true, 1.99),
((SELECT id FROM users WHERE username = 'sarabeats'), 'House Party', 'Get the party started with this house anthem', 'House', ARRAY['house', 'party', 'dance'], '/placeholder.svg?height=300&width=300', '/placeholder.svg?height=300&width=300', 320, 3400, 234, true, 0),
((SELECT id FROM users WHERE username = 'sarabeats'), 'Deep Vibes', 'Deep house track with soulful vocals', 'Deep House', ARRAY['deep house', 'soulful', 'vocals'], '/placeholder.svg?height=300&width=300', '/placeholder.svg?height=300&width=300', 280, 1890, 145, true, 2.49),
((SELECT id FROM users WHERE username = 'alexrhythm'), 'Berlin Nights', 'Progressive house inspired by Berlin club scene', 'Progressive House', ARRAY['progressive', 'berlin', 'club'], '/placeholder.svg?height=300&width=300', '/placeholder.svg?height=300&width=300', 420, 980, 67, true, 0),
((SELECT id FROM users WHERE username = 'bassqueen'), 'Drop the Bass', 'Heavy dubstep track with massive drops', 'Dubstep', ARRAY['dubstep', 'heavy', 'drops'], '/placeholder.svg?height=300&width=300', '/placeholder.svg?height=300&width=300', 180, 5600, 445, true, 1.49);

-- Insert sample live streams
INSERT INTO live_streams (user_id, title, description, genre, tags, thumbnail_url, is_live, viewer_count, started_at) VALUES
((SELECT id FROM users WHERE username = 'djmike'), 'Late Night Electronic Session', 'Chilled electronic beats for your late night vibes', 'Electronic', ARRAY['electronic', 'chill', 'late night'], '/placeholder.svg?height=200&width=300', true, 234, NOW() - INTERVAL '2 hours'),
((SELECT id FROM users WHERE username = 'sarabeats'), 'House Music Marathon', 'Non-stop house music for 4 hours straight', 'House', ARRAY['house', 'marathon', 'dance'], '/placeholder.svg?height=200&width=300', true, 567, NOW() - INTERVAL '1 hour'),
((SELECT id FROM users WHERE username = 'bassqueen'), 'Bass Drop Friday', 'Heavy bass and dubstep to end the week right', 'Dubstep', ARRAY['dubstep', 'bass', 'friday'], '/placeholder.svg?height=200&width=300', true, 892, NOW() - INTERVAL '30 minutes');

-- Insert upcoming live streams
INSERT INTO live_streams (user_id, title, description, genre, tags, thumbnail_url, is_live, scheduled_for) VALUES
((SELECT id FROM users WHERE username = 'alexrhythm'), 'Progressive Journey', 'A progressive house journey through different moods', 'Progressive House', ARRAY['progressive', 'journey', 'house'], '/placeholder.svg?height=200&width=300', false, NOW() + INTERVAL '3 hours'),
((SELECT id FROM users WHERE username = 'djmike'), 'Synthwave Sunday', 'Retro synthwave session for Sunday relaxation', 'Synthwave', ARRAY['synthwave', 'retro', 'sunday'], '/placeholder.svg?height=200&width=300', false, NOW() + INTERVAL '1 day'),
((SELECT id FROM users WHERE username = 'sarabeats'), 'Techno Tuesday', 'Hard hitting techno to power through Tuesday', 'Techno', ARRAY['techno', 'hard', 'tuesday'], '/placeholder.svg?height=200&width=300', false, NOW() + INTERVAL '2 days');

-- Insert sample merchandise
INSERT INTO merchandise (user_id, name, description, price, image_url, category, sizes, colors, stock_quantity) VALUES
((SELECT id FROM users WHERE username = 'djmike'), 'DJ Mike Logo T-Shirt', 'Official DJ Mike merchandise t-shirt', 25.00, '/placeholder.svg?height=300&width=300', 'Apparel', ARRAY['S', 'M', 'L', 'XL'], ARRAY['Black', 'White', 'Navy'], 50),
((SELECT id FROM users WHERE username = 'djmike'), 'Neon Lights Hoodie', 'Limited edition hoodie from Neon Lights EP', 45.00, '/placeholder.svg?height=300&width=300', 'Apparel', ARRAY['S', 'M', 'L', 'XL', 'XXL'], ARRAY['Black', 'Purple'], 25),
((SELECT id FROM users WHERE username = 'sarabeats'), 'Sara Beats Vinyl Collection', 'Limited vinyl pressing of greatest hits', 35.00, '/placeholder.svg?height=300&width=300', 'Music', ARRAY[], ARRAY['Black'], 100),
((SELECT id FROM users WHERE username = 'bassqueen'), 'Bass Queen Snapback', 'Embroidered snapback hat with Bass Queen logo', 30.00, '/placeholder.svg?height=300&width=300', 'Accessories', ARRAY[], ARRAY['Black', 'Red', 'Blue'], 75);

-- Insert sample events
INSERT INTO events (user_id, title, description, venue, location, event_date, ticket_price, ticket_url, image_url) VALUES
((SELECT id FROM users WHERE username = 'djmike'), 'Electronic Nights at The Warehouse', 'DJ Mike live at The Warehouse with special guests', 'The Warehouse', 'Los Angeles, CA', NOW() + INTERVAL '2 weeks', 25.00, 'https://tickets.example.com/djmike-warehouse', '/placeholder.svg?height=400&width=600'),
((SELECT id FROM users WHERE username = 'sarabeats'), 'Miami Music Week 2024', 'Sara Beats headlining Miami Music Week', 'Ultra Music Festival', 'Miami, FL', NOW() + INTERVAL '1 month', 150.00, 'https://tickets.example.com/sarabeats-mmw', '/placeholder.svg?height=400&width=600'),
((SELECT id FROM users WHERE username = 'alexrhythm'), 'Berlin Underground', 'Exclusive underground set in Berlin', 'Berghain', 'Berlin, Germany', NOW() + INTERVAL '3 weeks', 20.00, 'https://tickets.example.com/alexrhythm-berlin', '/placeholder.svg?height=400&width=600'),
((SELECT id FROM users WHERE username = 'bassqueen'), 'Bass Festival UK', 'Bass Queen closing out Bass Festival', 'Alexandra Palace', 'London, UK', NOW() + INTERVAL '6 weeks', 75.00, 'https://tickets.example.com/bassqueen-festival', '/placeholder.svg?height=400&width=600');

-- Insert sample chat messages for live streams
INSERT INTO chat_messages (stream_id, user_id, message) VALUES
((SELECT id FROM live_streams WHERE title = 'Late Night Electronic Session'), (SELECT id FROM users WHERE username = 'sarabeats'), 'This track is amazing! 🔥'),
((SELECT id FROM live_streams WHERE title = 'Late Night Electronic Session'), (SELECT id FROM users WHERE username = 'alexrhythm'), 'Perfect vibes for tonight'),
((SELECT id FROM live_streams WHERE title = 'House Music Marathon'), (SELECT id FROM users WHERE username = 'djmike'), 'Sara killing it as always! 💪'),
((SELECT id FROM live_streams WHERE title = 'House Music Marathon'), (SELECT id FROM users WHERE username = 'bassqueen'), 'This is my jam!'),
((SELECT id FROM live_streams WHERE title = 'Bass Drop Friday'), (SELECT id FROM users WHERE username = 'djmike'), 'That drop was insane! 🎵'),
((SELECT id FROM live_streams WHERE title = 'Bass Drop Friday'), (SELECT id FROM users WHERE username = 'sarabeats'), 'Bass Queen never disappoints');

-- Insert some follows
INSERT INTO follows (follower_id, following_id) VALUES
((SELECT id FROM users WHERE username = 'sarabeats'), (SELECT id FROM users WHERE username = 'djmike')),
((SELECT id FROM users WHERE username = 'alexrhythm'), (SELECT id FROM users WHERE username = 'djmike')),
((SELECT id FROM users WHERE username = 'bassqueen'), (SELECT id FROM users WHERE username = 'djmike')),
((SELECT id FROM users WHERE username = 'djmike'), (SELECT id FROM users WHERE username = 'sarabeats')),
((SELECT id FROM users WHERE username = 'alexrhythm'), (SELECT id FROM users WHERE username = 'sarabeats')),
((SELECT id FROM users WHERE username = 'bassqueen'), (SELECT id FROM users WHERE username = 'sarabeats'));

-- Insert some likes
INSERT INTO likes (user_id, track_id) VALUES
((SELECT id FROM users WHERE username = 'sarabeats'), (SELECT id FROM tracks WHERE title = 'Midnight Drive')),
((SELECT id FROM users WHERE username = 'alexrhythm'), (SELECT id FROM tracks WHERE title = 'Midnight Drive')),
((SELECT id FROM users WHERE username = 'bassqueen'), (SELECT id FROM tracks WHERE title = 'Neon Lights')),
((SELECT id FROM users WHERE username = 'djmike'), (SELECT id FROM tracks WHERE title = 'House Party')),
((SELECT id FROM users WHERE username = 'alexrhythm'), (SELECT id FROM tracks WHERE title = 'Deep Vibes')),
((SELECT id FROM users WHERE username = 'sarabeats'), (SELECT id FROM tracks WHERE title = 'Berlin Nights'));
