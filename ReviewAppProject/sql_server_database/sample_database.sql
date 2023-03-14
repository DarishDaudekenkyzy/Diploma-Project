INSERT Faculties (FacultyName) VALUES ('Business School');
INSERT Faculties (FacultyName) VALUES ('Engineering and Natural Sciences');


INSERT Professors (FirstName, LastName, Email, FacultyId, ReviewsCount, Rating, WouldTakeAgainPercentage) VALUES 
('Farukh', 'Mashurov', 'fm@gmail.com', 2, 0, 0.0, 0.0);
INSERT Professors (FirstName, LastName, Email, FacultyId, ReviewsCount, Rating, WouldTakeAgainPercentage) VALUES 
('Abylay', 'Omarov', 'alikhanOmarov@gmail.com', 2, 0, 0.0, 0.0);
INSERT Professors (FirstName, LastName, Email, FacultyId, ReviewsCount, Rating, WouldTakeAgainPercentage) VALUES 
('Larissa', 'Bazarbayeva', 'l_bazarbayeva@gmail.com', 2, 0, 0.0, 0.0);
INSERT Professors (FirstName, LastName, Email, FacultyId, ReviewsCount, Rating, WouldTakeAgainPercentage) VALUES 
('Shyngys', 'Adilkhan', 'sa@gmail.com', 2, 0, 0.0, 0.0);
INSERT Professors (FirstName, LastName, Email, FacultyId, ReviewsCount, Rating, WouldTakeAgainPercentage) VALUES 
('Zhasdauren', 'Duisebekov', 'zd@gmail.com', 2, 0, 0.0, 0.0);

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

INSERT INTO CoursesProfessors(CourseId, ProfessorId) VALUES
(1, 2), (2, 2), (3, 2),
(4, 3), (5, 3), (6, 3);

SELECT * FROM CoursesProfessors;

