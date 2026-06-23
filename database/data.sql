INSERT INTO quizzes (id, title)
VALUES (1, 'Recycling and Waste Management Quiz');

INSERT INTO questions
(id, quiz_id, question_text, order_number)
VALUES
(1, 1, 'When should Montclair residents put their garbage out for collection?', 1),
(2, 1, 'Which of the following items is currently NOT accepted for recycling in Montclair?', 2),
(3, 1, 'How many large household items (mattress, box spring, etc.) may a Montclair resident leave at the curb for bulky waste collection?', 3),
(4, 1, 'What must residents do with mattresses and box springs before putting them out for collection?', 4),
(5, 1, 'During which two periods does Montclair collect loose leaves at the curb?', 5);

INSERT INTO answers
(id, question_id, answer_text, is_correct)
VALUES
-- Question 1
(1, 1, 'Anytime during the day', FALSE),
(2, 1, 'Between 6 a.m. and noon on collection day', FALSE),
(3, 1, 'Between 6 p.m. the day before and 6 a.m. the day of collection', TRUE),
(4, 1, 'Only after 8 p.m. the night before', FALSE),

-- Question 2
(5, 2, 'Glass bottles', FALSE),
(6, 2, 'Aluminum cans', FALSE),
(7, 2, 'Mixed paper', FALSE),
(8, 2, 'Styrofoam', TRUE),

-- Question 3
(9, 3, '1', FALSE),
(10, 3, '2', FALSE),
(11, 3, '3', TRUE),
(12, 3, '5', FALSE),

-- Question 4
(13, 4, 'Wrap them in cardboard', FALSE),
(14, 4, 'Place them in a plastic bag', TRUE),
(15, 4, 'Place them in a biodegradable paper bag', FALSE),
(16, 4, 'Call ahead to schedule a pickup', FALSE),

-- Question 5
(17, 5, 'Oct 15 – Dec 1 and April 1 – April 30', TRUE),
(18, 5, 'Sept 1 – Nov 30 and March 1 – March 31', FALSE),
(19, 5, 'Oct 1 – Nov 30 and March 15 – April 15', FALSE),
(20, 5, 'Nov 1 – Dec 15 and April 1 – April 30', FALSE);