INSERT INTO user_menus (user_id, menu_id)
VALUES ($1, $2);
SELECT m.*, um.user_menu_id FROM menus m
JOIN user_menus um ON um.menu_id = m.menu_id
WHERE um.user_menu_id IN (SELECT user_menu_id FROM user_menus
                    WHERE user_id = $1 and current = true)