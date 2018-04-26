CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(25) NOT NULL,
    fullname TEXT,
    profile_pic TEXT,
    date_created DATE NOT NULL,
    curr_pro INTEGER DEFAULT 0,
    curr_carb INTEGER DEFAULT 0,
    curr_fat INTEGER DEFAULT 0,
    curr_mes_id INTEGER DEFAULT 0,
    auth_id TEXT NOT NULL
);

CREATE TABLE measurements (
    mes_id SERIAL PRIMARY KEY,
    waist REAL,
    neck REAL,
    chest REAL,
    height REAL,
    weight REAL,
    bf REAL,
    date_taken TEXT,
    member_id INTEGER
);

CREATE TABLE meals (
    meal_id SERIAL PRIMARY KEY,
    title VARCHAR(25) NOT NULL,
    author_id INTEGER ,
    total_p INTEGER NOT NULL,
    total_c INTEGER NOT NULL,
    total_f INTEGER NOT NULL,
    total_fib INTEGER,
    img_url TEXT
);

CREATE TABLE foods (
    food_id SERIAL PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    author_id INTEGER,
    pro INTEGER NOT NULL,
    carb INTEGER NOT NULL,
    fat INTEGER NOT NULL,
    fiber INTEGER,
    img TEXT
);

CREATE TABLE meal_foods (
    meal_food_id SERIAL PRIMARY KEY,
    meal_id INTEGER,
    food_id INTEGER,
    quantity INTEGER DEFAULT 1
);

CREATE TABLE macro_calcs (
    macro_id SERIAL PRIMARY KEY,
    p INTEGER,
    c INTEGER,
    f INTEGER,
    date_calced DATE,
    member_id TEXT
);

CREATE TABLE day_menus (
    menu_id SERIAL PRIMARY KEY,
    name VARCHAR(60),
    meal_ids INTEGER[],
    author_id INTEGER    
);


CREATE TABLE work_ex (
    work_ex_id SERIAL PRIMARY KEY,
    meal_id INTEGER,
    food_id INTEGER
);
    
CREATE TABLE workouts (
    workout_id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    author_id INTEGER,
    date_created TEXT
);

CREATE TABLE exercises (
    ex_id SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    type VARCHAR(25) NOT NULL,
    author_id INTEGER,
    img TEXT,
    video_url TEXT
);
CREATE TABLE progress_pics (
    pic_id SERIAL PRIMARY KEY,
    url TEXT,
    member_id INTEGER    
);


INSERT INTO measurements (waist, neck, chest, height, weight, bf, date_taken, member_id)
VALUES (32, 17, 48, 75, 250, 20, '04-25-2017', 1)
returning *
INSERT INTO measurements (waist, neck, chest, height, weight, bf, date_taken, member_id)
VALUES (34, 16.5, 47, 75, 255, 21, '05-25-2017', 1)
returning *
INSERT INTO measurements (waist, neck, chest, height, weight, bf, date_taken, member_id)
VALUES (35, 16, 46.5, 75, 257, 21.5, '06-25-2017', 1)
returning *


INSERT INTO foods (name, pro, carb, fat, fiber, img)
VALUES ('lucy', 17, 48, 75, 20, 'something yummy');
INSERT INTO foods (name, pro, carb, fat, fiber, img)
VALUES ('nasty', 1, 61, 7, 2, 'something nasty');
INSERT INTO foods (name, pro, carb, fat, fiber, img)
VALUES ('tatste', 17, 48, 75, 20, 'something tasty');
INSERT INTO foods (name, pro, carb, fat, fiber, img)
VALUES ('junk', 17, 84, 35, 0, 'glorious yummy');


INSERT INTO meals (title, total_p, total_c, total_f, total_fib, img_url)
VALUES ('junk', 7, 84, 5, 9, 'awesome carbs');
INSERT INTO meals (title, total_p, total_c, total_f, total_fib, img_url)
VALUES ('junk', 83, 143, 69, 10, 'greatness');


INSERT INTO meal_foods (meal_id, food_id)
VALUES (1, 1);
INSERT INTO meal_foods (meal_id, food_id)
VALUES (2, 2);
INSERT INTO meal_foods (meal_id, food_id)
VALUES (2, 1);
INSERT INTO meal_foods (meal_id, food_id)
VALUES (3, 1);
INSERT INTO meal_foods (meal_id, food_id)
VALUES (1, 3);
INSERT INTO meal_foods (meal_id, food_id)
VALUES (1, 4);
INSERT INTO meal_foods (meal_id, food_id)
VALUES (1, 5);