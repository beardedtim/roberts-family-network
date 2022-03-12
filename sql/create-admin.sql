-- We want to be able to just run this 
-- whenever we start the system from scratch
-- so that I know there are the correct roles
-- and they are attached correct

-- First create some users
INSERT INTO users
  (username, email)
VALUES
  ('tim', 'tim@mck-p.com'),
  ('kit', 'kristenroberts@fastmail.org'),
  ('lar', 'lar@cynandlar.com');


-- Then create some roles
INSERT INTO roles
  (name)
VALUES
  ('overlord'),
  ('admin');

-- And now attach them
WITH
  tim_user AS (
    SELECT id FROM users WHERE username = 'tim'
  ),
  kit_user AS (
    SELECT id FROM users WHERE username = 'kit'
  ),
  lar_user AS (
    SELECT id FROM users WHERE username = 'lar'
  ),
  overlord_id AS (
    SELECT id FROM roles WHERE name = 'overlord'
  ),
  admin_id AS (
    SELECT id FROM roles WHERE name = 'admin'
  )
INSERT INTO user_roles
  (user_id, role_id)
VALUES
  ((SELECT id FROM tim_user), (SELECT id FROM overlord_id)),
  ((SELECT id FROM tim_user), (SELECT id FROM admin_id)),
  ((SELECT id FROM kit_user), (SELECT id FROM admin_id)),
  ((SELECT id FROM lar_user), (SELECT id FROM admin_id));