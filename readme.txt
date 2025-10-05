For running project locally
1. Create database in mysql named reactlogin
CREATE DATABASE reactlogin
2. Create table users in reactlogin database conatins fields like id(auto_increment) ,email(varchar(50)),password(varchar(50))
CREATE TABLE users ( id INT NOT NULL AUTO_INCREMENT , email VARCHAR(50) NOT NULL , password VARCHAR(50) NOT NULL , PRIMARY KEY (id));
3. In client folder run command npm install  then npm run dev
4. In server folder run command npm istall in file db.js set own credentials for your database
export const db = mysql.createConnection({
    host: 'your host',
    user: 'your username',
    password: 'your password',
    database: 'reactlogin'
});

then npm start

