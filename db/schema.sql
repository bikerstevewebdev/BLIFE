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
    fiber INTEGER
);

CREATE TABLE meal_foods (
    meal_food_id SERIAL PRIMARY KEY,
    meal_id INTEGER,
    food_id INTEGER
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
    ex_ids INTEGER[],
    date_created DATE
);
CREATE TABLE exercises (
    ex_id SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    type VARCHAR(25) NOT NULL,
    author_id INTEGER,
    img TEXT,
    video_url TEXT
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
CREATE TABLE macro_calcs (
    macro_id SERIAL PRIMARY KEY,
    p INTEGER,
    c INTEGER,
    f INTEGER,
    date_calced DATE,
    member_id TEXT
);
CREATE TABLE progress_pics (
    pic_id SERIAL PRIMARY KEY,
    url TEXT,
    member_id INTEGER    
);
CREATE TABLE day_menus (
    menu_id SERIAL PRIMARY KEY,
    name VARCHAR(60),
    meal_ids INTEGER[],
    author_id INTEGER    
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
