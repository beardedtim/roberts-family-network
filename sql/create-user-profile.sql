-- We want to allow users to have
-- some generic, not really defined
-- grouping of key/value pairs
ALTER TABLE
  users
ADD
  profile JSONB DEFAULT '{}';