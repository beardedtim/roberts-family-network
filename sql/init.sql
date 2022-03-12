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