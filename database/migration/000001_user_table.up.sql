CREATE TABLE `users` (
  `id` integer UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `fullname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `birthdate` date NOT NULL,
  `phone` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT (now())
);

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Erick Braun', 'Erick.Huel@gmail.com', STR_TO_DATE('14/12/1978', '%d/%m/%Y'), '9901292779');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Friedrich Corwin', 'Friedrich59@yahoo.com', STR_TO_DATE('24/05/1975', '%d/%m/%Y'), '5367257300');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Mr. Tyrell Abshire', 'Tyrell_Buckridge61@hotmail.com', STR_TO_DATE('04/10/1997', '%d/%m/%Y'), '5167894774');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Mr. Aliyah Gutkowski', 'Aliyah35@hotmail.com', STR_TO_DATE('07/03/2006', '%d/%m/%Y'), '4860040662');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Ursula Gleason', 'Ursula_Oberbrunner@yahoo.com', STR_TO_DATE('17/09/1960', '%d/%m/%Y'), '7412779039');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Jacky Littel', 'Jacky25@gmail.com', STR_TO_DATE('02/03/1970', '%d/%m/%Y'), '3871191614');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Mara Barton', 'Mara.Hyatt55@hotmail.com', STR_TO_DATE('11/04/1991', '%d/%m/%Y'), '9875463755');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Ethyl Ruecker V', 'Ethyl_Heidenreich@yahoo.com', STR_TO_DATE('16/06/1997', '%d/%m/%Y'), '1506968451');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Rubie Boehm', 'Rubie19@yahoo.com', STR_TO_DATE('03/05/1997', '%d/%m/%Y'), '5865365784');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Novella Lebsack', 'Novella_Doyle@hotmail.com', STR_TO_DATE('02/07/1991', '%d/%m/%Y'), '0250218707');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Alfreda Beer', 'Alfreda_Roob58@yahoo.com', STR_TO_DATE('16/01/2004', '%d/%m/%Y'), '2351072304');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Dave Beier', 'Dave50@hotmail.com', STR_TO_DATE('27/08/1975', '%d/%m/%Y'), '5016765650');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Elton Jones', 'Elton_Barrows@hotmail.com', STR_TO_DATE('08/08/1970', '%d/%m/%Y'), '9884759460');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Kathryn Klein', 'Kathryn.Stamm@hotmail.com', STR_TO_DATE('28/12/1999', '%d/%m/%Y'), '6340497430');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Lauryn McCullough', 'Lauryn_Leffler@gmail.com', STR_TO_DATE('04/06/2004', '%d/%m/%Y'), '8975352279');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Dana Lubowitz', 'Dana61@gmail.com', STR_TO_DATE('22/08/1986', '%d/%m/%Y'), '4854438378');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Damion Halvorson', 'Damion85@gmail.com', STR_TO_DATE('18/02/2006', '%d/%m/%Y'), '6901153835');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Dr. Ulices Weimann', 'Ulices.Mante@hotmail.com', STR_TO_DATE('27/12/1977', '%d/%m/%Y'), '7075304396');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Abbie Schulist IV', 'Abbie.Abshire@hotmail.com', STR_TO_DATE('31/10/1974', '%d/%m/%Y'), '4149474946');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Ayden Howe Jr.', 'Ayden.Runolfsdottir@yahoo.com', STR_TO_DATE('20/01/1992', '%d/%m/%Y'), '3641662282');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Natalia Lind PhD', 'Natalia.Nienow75@yahoo.com', STR_TO_DATE('08/05/1993', '%d/%m/%Y'), '0778798895');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ("Melba D'Amore", 'Melba95@yahoo.com', STR_TO_DATE('25/07/1970', '%d/%m/%Y'), '0912174749');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Brenda Kub', 'Brenda_Daniel@hotmail.com', STR_TO_DATE('11/12/1977', '%d/%m/%Y'), '7280247367');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Nelson Friesen', 'Nelson5@hotmail.com', STR_TO_DATE('12/08/1984', '%d/%m/%Y'), '1066654952');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Sonny Mante-Klocko', 'Sonny_Moen@gmail.com', STR_TO_DATE('25/11/2005', '%d/%m/%Y'), '2066386522');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Amy Auer', 'Amy27@hotmail.com', STR_TO_DATE('06/04/1980', '%d/%m/%Y'), '9277924639');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Maryam Strosin', 'Maryam_Cole@gmail.com', STR_TO_DATE('28/05/1970', '%d/%m/%Y'), '6090092638');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Jedediah Sipes', 'Jedediah.Toy16@yahoo.com', STR_TO_DATE('07/05/1989', '%d/%m/%Y'), '0172587648');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Mr. Claire Boyer', 'Claire55@yahoo.com', STR_TO_DATE('04/01/1987', '%d/%m/%Y'), '6419742536');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Dolly Will', 'Dolly71@yahoo.com', STR_TO_DATE('24/11/1980', '%d/%m/%Y'), '8780608626');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Adrienne Cummings', 'Adrienne.Flatley20@yahoo.com', STR_TO_DATE('22/06/1966', '%d/%m/%Y'), '0545589334');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Peyton Yost Sr.', 'Peyton.Barton71@hotmail.com', STR_TO_DATE('09/10/2000', '%d/%m/%Y'), '2324459435');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Lazaro Blick', 'Lazaro.Senger@hotmail.com', STR_TO_DATE('15/10/1986', '%d/%m/%Y'), '0812134784');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Heber Skiles', 'Heber93@gmail.com', STR_TO_DATE('28/06/1988', '%d/%m/%Y'), '2033260404');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Major Wolf', 'Major.Spencer83@gmail.com', STR_TO_DATE('30/12/1994', '%d/%m/%Y'), '5195838054');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Claude Pouros PhD', 'Claude99@gmail.com', STR_TO_DATE('30/09/1971', '%d/%m/%Y'), '9839839007');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Jesus Carroll', 'Jesus3@yahoo.com', STR_TO_DATE('11/10/1993', '%d/%m/%Y'), '2956104607');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Bryana Wiegand', 'Bryana61@hotmail.com', STR_TO_DATE('05/10/1978', '%d/%m/%Y'), '6620863723');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Cordell Ryan', 'Cordell.Conn96@hotmail.com', STR_TO_DATE('28/11/1981', '%d/%m/%Y'), '8873621388');

INSERT INTO users(fullname, email, birthdate, phone) VALUES ('Fred Shields', 'Fred.Murray@gmail.com', STR_TO_DATE('27/01/1967', '%d/%m/%Y'), '2829285366');
