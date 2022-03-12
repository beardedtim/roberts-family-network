-- Anyone that wants to perform an action
-- will need to have been attached to some
-- user, even if that is a guest or "dark"
-- user
CREATE TABLE IF NOT EXISTS users (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

-- Users can have roles, which are ways
-- to attach actions to specific users
CREATE TABLE IF NOT EXISTS roles (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

-- And we create a joining table so
-- that we can see what roles a user
-- has or what users are associated
-- with what roles
CREATE TABLE IF NOT EXISTS user_roles (
  role_id UUID NOT NULL,
  user_id UUID NOT NULL 
);

-- We want to allow users to create
-- Items that are shared with others
CREATE TABLE IF NOT EXISTS items (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  created_at timestamp NOT NULL DEFAULT NOW(),
  last_updated timestamp NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id),
  FOREIGN KEY (creator_id) REFERENCES users(id)
);