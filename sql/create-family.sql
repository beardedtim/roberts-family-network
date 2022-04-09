-- Create all of the users with their
-- emails associated with a username
--
-- The username is what is displayed and
-- the email is what associates them with
-- the Auth0 service (_our authentication service_)
--
--
-- NOTICE HOW LOU IS MISSING...OF COURSE
INSERT INTO users
  (username, email)
VALUES
  ('sara', 'sara_spires@yahoo.com'),
  ('mikey', 'mikeydavidr@gmail.com'),
  ('katie', 'katrynroberts@gmail.com'),
  ('cyn', 'cyn@cynandlar.com');


WITH
  sara_user AS (
    SELECT id FROM users WHERE username = 'sara'
  ),
  mikey_user AS (
    SELECT id FROM users WHERE username = 'mikey'
  ),
  katie_user AS (
    SELECT id FROM users WHERE username = 'katie'
  ),
  cyn_user AS (
    SELECT id FROM users WHERE username = 'cyn'
  ),
  admin_id AS (
    SELECT id FROM roles WHERE name = 'admin'
  )
INSERT INTO user_roles
  (user_id, role_id)
VALUES
  ((SELECT id FROM sara_user), (SELECT id FROM admin_id)),
  ((SELECT id FROM mikey_user), (SELECT id FROM admin_id)),
  ((SELECT id FROM katie_user), (SELECT id FROM admin_id)),
  ((SELECT id FROM cyn_user), (SELECT id FROM admin_id));
