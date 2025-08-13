-- Create missing database functions for proper API functionality

-- Function to increment play count
CREATE OR REPLACE FUNCTION increment_play_count(track_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE tracks 
  SET play_count = play_count + 1,
      updated_at = NOW()
  WHERE id = track_id;
END;
$$ LANGUAGE plpgsql;

-- Function to increment like count
CREATE OR REPLACE FUNCTION increment_like_count(track_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE tracks 
  SET like_count = like_count + 1,
      updated_at = NOW()
  WHERE id = track_id;
END;
$$ LANGUAGE plpgsql;

-- Function to decrement like count
CREATE OR REPLACE FUNCTION decrement_like_count(track_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE tracks 
  SET like_count = GREATEST(like_count - 1, 0),
      updated_at = NOW()
  WHERE id = track_id;
END;
$$ LANGUAGE plpgsql;

-- Function to update follower counts
CREATE OR REPLACE FUNCTION update_follower_counts()
RETURNS void AS $$
BEGIN
  -- Update follower counts for all users
  UPDATE users 
  SET follower_count = (
    SELECT COUNT(*) 
    FROM follows 
    WHERE following_id = users.id
  ),
  following_count = (
    SELECT COUNT(*) 
    FROM follows 
    WHERE follower_id = users.id
  ),
  updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Function to update track counts in playlists
CREATE OR REPLACE FUNCTION update_playlist_track_count(playlist_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE playlists 
  SET track_count = (
    SELECT COUNT(*) 
    FROM playlist_tracks 
    WHERE playlist_tracks.playlist_id = playlists.id
  ),
  updated_at = NOW()
  WHERE id = playlist_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update follower counts
CREATE OR REPLACE FUNCTION trigger_update_follower_counts()
RETURNS trigger AS $$
BEGIN
  -- Update the followed user's follower count
  IF TG_OP = 'INSERT' THEN
    UPDATE users 
    SET follower_count = follower_count + 1,
        updated_at = NOW()
    WHERE id = NEW.following_id;
    
    UPDATE users 
    SET following_count = following_count + 1,
        updated_at = NOW()
    WHERE id = NEW.follower_id;
    
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE users 
    SET follower_count = GREATEST(follower_count - 1, 0),
        updated_at = NOW()
    WHERE id = OLD.following_id;
    
    UPDATE users 
    SET following_count = GREATEST(following_count - 1, 0),
        updated_at = NOW()
    WHERE id = OLD.follower_id;
    
    RETURN OLD;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
DROP TRIGGER IF EXISTS update_follower_counts_trigger ON follows;
CREATE TRIGGER update_follower_counts_trigger
  AFTER INSERT OR DELETE ON follows
  FOR EACH ROW
  EXECUTE FUNCTION trigger_update_follower_counts();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tracks_user_id ON tracks(user_id);
CREATE INDEX IF NOT EXISTS idx_tracks_genre ON tracks(genre);
CREATE INDEX IF NOT EXISTS idx_tracks_is_public ON tracks(is_public);
CREATE INDEX IF NOT EXISTS idx_tracks_created_at ON tracks(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_likes_user_track ON likes(user_id, track_id);
CREATE INDEX IF NOT EXISTS idx_follows_follower ON follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following ON follows(following_id);
CREATE INDEX IF NOT EXISTS idx_streams_is_live ON live_streams(is_live);
CREATE INDEX IF NOT EXISTS idx_streams_user_id ON live_streams(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_stream ON chat_messages(stream_id, created_at);
