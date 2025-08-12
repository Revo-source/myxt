-- Function to increment like count
CREATE OR REPLACE FUNCTION increment_like_count(track_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE tracks 
  SET like_count = like_count + 1 
  WHERE id = track_id;
END;
$$ LANGUAGE plpgsql;

-- Function to decrement like count
CREATE OR REPLACE FUNCTION decrement_like_count(track_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE tracks 
  SET like_count = GREATEST(like_count - 1, 0)
  WHERE id = track_id;
END;
$$ LANGUAGE plpgsql;

-- Function to increment play count
CREATE OR REPLACE FUNCTION increment_play_count(track_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE tracks 
  SET play_count = play_count + 1 
  WHERE id = track_id;
END;
$$ LANGUAGE plpgsql;

-- Function to update follower counts
CREATE OR REPLACE FUNCTION update_follower_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Increment following count for follower
    UPDATE users 
    SET following_count = following_count + 1 
    WHERE id = NEW.follower_id;
    
    -- Increment follower count for followed user
    UPDATE users 
    SET follower_count = follower_count + 1 
    WHERE id = NEW.following_id;
    
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    -- Decrement following count for follower
    UPDATE users 
    SET following_count = GREATEST(following_count - 1, 0)
    WHERE id = OLD.follower_id;
    
    -- Decrement follower count for followed user
    UPDATE users 
    SET follower_count = GREATEST(follower_count - 1, 0)
    WHERE id = OLD.following_id;
    
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for follower count updates
CREATE TRIGGER update_follower_counts_trigger
  AFTER INSERT OR DELETE ON follows
  FOR EACH ROW EXECUTE FUNCTION update_follower_counts();
