-- Test database integrity and relationships
-- This script verifies all table relationships and constraints

-- Test 1: Verify foreign key relationships
SELECT 
  tc.table_name, 
  kcu.column_name, 
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name 
FROM 
  information_schema.table_constraints AS tc 
  JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
  JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
  AND tc.table_schema = 'public';

-- Test 2: Check for orphaned records
-- Tracks without users
SELECT COUNT(*) as orphaned_tracks 
FROM tracks t 
LEFT JOIN users u ON t.user_id = u.id 
WHERE u.id IS NULL;

-- Likes without tracks or users
SELECT COUNT(*) as orphaned_likes_tracks
FROM likes l 
LEFT JOIN tracks t ON l.track_id = t.id 
WHERE t.id IS NULL;

SELECT COUNT(*) as orphaned_likes_users
FROM likes l 
LEFT JOIN users u ON l.user_id = u.id 
WHERE u.id IS NULL;

-- Test 3: Verify data consistency
-- Check if like_count matches actual likes
SELECT 
  t.id,
  t.title,
  t.like_count as stored_count,
  COUNT(l.id) as actual_count,
  (t.like_count - COUNT(l.id)) as difference
FROM tracks t
LEFT JOIN likes l ON t.id = l.track_id
GROUP BY t.id, t.title, t.like_count
HAVING t.like_count != COUNT(l.id);

-- Test 4: Check for duplicate follows
SELECT follower_id, following_id, COUNT(*) as duplicate_count
FROM follows
GROUP BY follower_id, following_id
HAVING COUNT(*) > 1;

-- Test 5: Verify user stats consistency
SELECT 
  u.id,
  u.username,
  u.follower_count as stored_followers,
  COUNT(f.id) as actual_followers,
  (u.follower_count - COUNT(f.id)) as difference
FROM users u
LEFT JOIN follows f ON u.id = f.following_id
GROUP BY u.id, u.username, u.follower_count
HAVING u.follower_count != COUNT(f.id);
