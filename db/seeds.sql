INSERT INTO department (name)
VALUES
('Finance & Accounting'),
('IT'),
('Marketing'),
('Operations');

INSERT INTO role (title, salary, department_id)
VALUES
('Accountant', 75000, 1),
('Accounting Manager', 120000, 1),
('Front End Developer', 111000, 2),
('Back End Developer', 111000, 2),
('Marketing Coordiantator', 80000, 3),
('Marketing Specialist', 90000, 3),
('Operations Manager', 120000, 4),
('Director of Operations', 180000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
('AAron', 'Parker', 1, 1),
('Gita', 'Veit', 1, null),
('Diwota', 'Jona', 7, 2),
('Amaka', 'Ebdulla', 3, null),
('Radmila', 'Lauma', 4, null),
('Vlado', 'Elouise', 5, null),
('Sophronia', 'Nikephoros', 8, 3),
('Pan', 'Jyotsana', 1, null);