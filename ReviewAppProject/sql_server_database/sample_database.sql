INSERT Faculties (FacultyName) VALUES ('Business School');
INSERT Faculties (FacultyName) VALUES ('Engineering and Natural Sciences');


INSERT Professors (FirstName, LastName, Email, FacultyId, ReviewsCount, Rating, WouldTakeAgainPercentage, DifficultyPercentage) VALUES 
('Alikhan', 'Nurlanuly', 'an@gmail.com', 2, 0, 0.0, 0.0, 0.0);
INSERT Professors (FirstName, LastName, Email, FacultyId, ReviewsCount, Rating, WouldTakeAgainPercentage, DifficultyPercentage) VALUES 
('Abylay', 'Omarov', 'alikhanOmarov@gmail.com', 2, 0, 0.0, 0.0, 0.0);
INSERT Professors (FirstName, LastName, Email, FacultyId, ReviewsCount, Rating, WouldTakeAgainPercentage, DifficultyPercentage) VALUES 
('Larissa', 'Bazarbayeva', 'l_bazarbayeva@gmail.com', 2, 0, 0.0, 0.0, 0.0);
INSERT Professors (FirstName, LastName, Email, FacultyId, ReviewsCount, Rating, WouldTakeAgainPercentage, DifficultyPercentage) VALUES 
('Shyngys', 'Adilkhan', 'sa@gmail.com', 2, 0, 0.0, 0.0, 0.0);
INSERT Professors (FirstName, LastName, Email, FacultyId, ReviewsCount, Rating, WouldTakeAgainPercentage, DifficultyPercentage) VALUES 
('Mariya', 'Li', 'zd@gmail.com', 2, 0, 0.0, 0.0, 0.0);

DELETE FROM Professors;
TRUNCATE TABLE Professors;
DBCC CHECKIDENT (Professors, RESEED, 0)
SELECT * FROM Professors;

INSERT INTO Courses (CourseCode, CourseName, FacultyId) VALUES
('CSS101', 'Course 101', 2),
('CSS102', 'Course 102', 2),
('CSS103', 'Course 103', 2),
('CSS104', 'Course 104', 2),
('CSS105', 'Course 105', 2);

SELECT * FROM Courses;

INSERT INTO CourseProfessor(CoursesCourseId, ProfessorsProfessorId) VALUES
(1, 1), (2, 1), (3, 1),
(4, 2), (5, 2), (5, 1);

SELECT * FROM CourseProfessor;

INSERT INTO Tags (Tag) VALUES
('Tough Grader'),('Get Ready to Read'),('Participation Matters'),('Group Projects'),
('Amazing Lessons'),('Clear Grading Criteria'),('Inspirational'),('Lots of Homework'),
('Funny'),('Beware of Many Quizzes'),('So Many Papers'),('Respected'),('Hard Tests'),
('Bonus Points'),('Great Explanations');

SELECT * FROM TAGS;
DELETE FROM TAGS WHERE (Id = 1);

SELECT * FROM ReviewsTags
SELECT * FROM UserReviewLikes
SELECT * FROM UserReviewDislikes
DELETE FROM ReviewProfessors WHERE Id = 4

