CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    coach_id INTEGER DEFAULT 0,
    is_admin BOOLEAN DEFAULT false
    username VARCHAR(45) NOT NULL,
    email VARCHAR(125),
    fullname VARCHAR(100),
    profile_pic TEXT,
    date_created INTEGER NOT NULL,
    curr_pro REAL DEFAULT 0,
    curr_carb REAL DEFAULT 0,
    curr_fat REAL DEFAULT 0,
    curr_mes_id INTEGER DEFAULT 0,
    auth_id TEXT NOT NULL,
    last_login INTEGER
);

CREATE TABLE measurements (
    mes_id SERIAL PRIMARY KEY,
    waist REAL,
    neck REAL,
    chest REAL,
    height REAL,
    weight REAL,
    bf REAL,
    date_taken INTEGER,
    member_id INTEGER
);

CREATE TABLE meals (
    meal_id SERIAL PRIMARY KEY,
    title VARCHAR(75) NOT NULL,
    author_id INTEGER ,
    total_p REAL NOT NULL,
    total_c REAL NOT NULL,
    total_f REAL NOT NULL,
    total_fib REAL,
    img_url TEXT
);

CREATE TABLE foods (
    food_id SERIAL PRIMARY KEY,
    name VARCHAR(75) NOT NULL,
    author_id INTEGER,
    pro REAL NOT NULL,
    carb REAL NOT NULL,
    fat REAL NOT NULL,
    fiber REAL,
    img TEXT
);

CREATE TABLE meal_foods (
    meal_food_id SERIAL PRIMARY KEY,
    meal_id INTEGER,
    food_id INTEGER,
    quantity INTEGER DEFAULT 1,
    units VARC
);

CREATE TABLE macro_calcs (
    macro_id SERIAL PRIMARY KEY,
    p REAL,
    c REAL,
    f REAL,
    date_calced INTEGER,
    member_id TEXT
);

CREATE TABLE menu_meals (
    menu_meals_id SERIAL PRIMARY KEY,
    menu_id INTEGER,
    meal_id INTEGER
);

CREATE TABLE menus (
    menu_id SERIAL PRIMARY KEY,
    title VARCHAR(75),
    author_id INTEGER,
    total_p REAL NOT NULL,
    total_c REAL NOT NULL,
    total_f REAL NOT NULL,
    total_fib REAL,
    img TEXT    
);
---------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------
CREATE TABLE workout_ex (
    workout_ex_id SERIAL PRIMARY KEY,
    workout_id INTEGER,
    ex_order INTEGER,
    reps INTEGER,
    sets INTEGER,
    rest_time INTEGER,
    weight INTEGER,
    ex_id INTEGER,
    notes TEXT
);

CREATE TABLE exercises (
    ex_id SERIAL PRIMARY KEY,
    name VARCHAR(75) NOT NULL,
    type VARCHAR(30) NOT NULL,
    main_muscle_group VARCHAR(25),
    author_id INTEGER,
    img TEXT,
    video TEXT
);
    
CREATE TABLE workouts (
    workout_id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    author_id INTEGER,
    img TEXT,
    type VARCHAR(45),
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_workout (
    user_workout_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    workout_id INTEGER,
    current BOOLEAN DEFAULT true,
    assigned BOOLEAN DEFAULT false
);

CREATE TABLE coach_requests (
    req_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    accepted BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT false,
    processing BOOLEAN DEFAULT true
);

CREATE TABLE user_menu (
    user_menu_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    menu_id INTEGER,
    current BOOLEAN DEFAULT true,
    assigned BOOLEAN DEFAULT false
);

CREATE TABLE client_coach (
    client_coach_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    coach_id INTEGER,
    current BOOLEAN DEFAULT true,
);



CREATE TABLE photos (
    photo_id SERIAL PRIMARY KEY,
    url TEXT,
    member_id INTEGER,
    type VARCHAR(25) DEFAULT 'progress',
    current BOOLEAN DEFAULT true,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- INSERT INTO measurements (waist, neck, chest, height, weight, bf, date_taken, member_id)
-- VALUES (32, 17, 48, 75, 250, 20, '04-25-2017', 1)
-- returning *
-- INSERT INTO measurements (waist, neck, chest, height, weight, bf, date_taken, member_id)
-- VALUES (34, 16.5, 47, 75, 255, 21, '05-25-2017', 1)
-- returning *
-- INSERT INTO measurements (waist, neck, chest, height, weight, bf, date_taken, member_id)
-- VALUES (35, 16, 46.5, 75, 257, 21.5, '06-25-2017', 1)
-- returning *


-- INSERT INTO foods (name, pro, carb, fat, fiber, img)
-- VALUES ('lucy', 17, 48, 75, 20, 'something yummy');
-- INSERT INTO foods (name, pro, carb, fat, fiber, img)
-- VALUES ('nasty', 1, 61, 7, 2, 'something nasty');
-- INSERT INTO foods (name, pro, carb, fat, fiber, img)
-- VALUES ('tatste', 17, 48, 75, 20, 'something tasty');
-- INSERT INTO foods (name, pro, carb, fat, fiber, img)
-- VALUES ('junk', 17, 84, 35, 0, 'glorious yummy');


-- INSERT INTO meals (title, total_p, total_c, total_f, total_fib, img_url)
-- VALUES ('junk', 7, 84, 5, 9, 'awesome carbs');
-- INSERT INTO meals (title, total_p, total_c, total_f, total_fib, img_url)
-- VALUES ('junk', 83, 143, 69, 10, 'greatness');


-- INSERT INTO meal_foods (meal_id, food_id)
-- VALUES (1, 1);
-- INSERT INTO meal_foods (meal_id, food_id)
-- VALUES (2, 2);
-- INSERT INTO meal_foods (meal_id, food_id)
-- VALUES (2, 1);
-- INSERT INTO meal_foods (meal_id, food_id)
-- VALUES (3, 1);
-- INSERT INTO meal_foods (meal_id, food_id)
-- VALUES (1, 3);
-- INSERT INTO meal_foods (meal_id, food_id)
-- VALUES (1, 4);
-- INSERT INTO meal_foods (meal_id, food_id)
-- VALUES (1, 5);

-- INSERT INTO photos (url, MEMBER_id, type)
-- VALUES ('test', 4, 'progress');
