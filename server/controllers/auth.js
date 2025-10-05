import { db } from "../db.js"
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import {validationResult } from 'express-validator';

export const signUp =  (req, res)=> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // check if user exist 
    const q = "SELECT * FROM users WHERE email=?";
    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.json({errors:err})
        if (data.length) return res.status(400).json("User already exists!")

        //Hash the password and create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const q = "INSERT INTO users(`email`,`password`) VALUES (?)";
        const values = [req.body.email, hash];
        db.query(q, [values], (err, data) => {
            if (err) return res.json(err);
            return res.status(201).json("User has been created!");
        })
    });

}


export const login = (req, res) => {
    // Check User
      const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const q = "SELECT * FROM users WHERE email =?";
    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json("User not found!");
        // check password

        const isPasswordCorrect = bcrypt.compare(req.body.password, data[0].password);
        if (!isPasswordCorrect) return res.status(400).json({error:"Wrong username or password"});
        const token = jwt.sign({ id: data[0].id }, "key", { expiresIn: '30m' });
        res.status(200).json({ token: token });
    })
}
export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: "No Token Provided" })
        }
        const decoded = jwt.verify(token, "key")
        req.userId = decoded.id;
        next()
    } catch (err) {
        return res.status(500).json({ message: "server error" })
    }
}

