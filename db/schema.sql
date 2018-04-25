CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(25) NOT NULL,
    fullname TEXT,
    profile_pic TEXT,
    date_created DATE NOT NULL,
    curr_pro INTEGER,
    curr_carb INTEGER,
    curr_fat INTEGER,
    curr_mes_id INTEGER ,
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
    ingredients TEXT,
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
CREATE TABLE workouts (
    workout_id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    author_id INTEGER,
    exercises TEXT,
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
    waist INTEGER,
    neck INTEGER,
    chest INTEGER,
    height INTEGER,
    weight INTEGER,
    bf INTEGER,
    date_taken DATE,
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
    meals TEXT,
    author_id INTEGER    
);


