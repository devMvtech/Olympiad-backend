-- Create a table to store quizzes
CREATE TABLE quizzes (
    quiz_id SERIAL PRIMARY KEY,
    quiz_name VARCHAR(100) NOT NULL,
    description TEXT,
    level INT NOT NULL, -- Level of the quiz
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a table to store questions
CREATE TABLE questions (
    question_id SERIAL PRIMARY KEY,
    quiz_id INT NOT NULL,
    question_text TEXT NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id) ON DELETE CASCADE
);

-- Create a table to store options for each question
CREATE TABLE options (
    option_id SERIAL PRIMARY KEY,
    question_id INT NOT NULL,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE
);

-- Create a table to store user responses
CREATE TABLE user_responses (
    response_id SERIAL PRIMARY KEY,
    quiz_id INT NOT NULL,
    question_id INT NOT NULL,
    option_id INT NOT NULL,
    user_id INT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    response_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE,
    FOREIGN KEY (option_id) REFERENCES options(option_id) ON DELETE CASCADE
);

-- Create a table to store student progress
CREATE TABLE student_progress (
    progress_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    quiz_id INT NOT NULL,
    level INT NOT NULL, -- Level of the quiz
    passed BOOLEAN DEFAULT FALSE, -- Whether the student passed the quiz
    progress_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id) ON DELETE CASCADE
);

-- Create a table to store users
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    standard VARCHAR(50),
    school VARCHAR(100),
    aoi VARCHAR(100), -- Area of interest
    parents VARCHAR(100),
    number VARCHAR(20),
    address TEXT
);

