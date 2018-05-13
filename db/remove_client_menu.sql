UPDATE user_menus SET current = false
WHERE user_menu_id = $2;
SELECT m.*, um.user_menu_id FROM menus m
JOIN user_menus um ON um.menu_id = m.menu_id
WHERE um.user_menu_id IN (SELECT user_menu_id FROM user_menus
                    WHERE user_id = $1 AND current = true AND assigned = true)