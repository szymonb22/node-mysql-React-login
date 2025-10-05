import { db } from "../db.js"
export const getUser = (req, res) => {
    const q = "SELECT * FROM users WHERE id = ?"
    db.query(q, [req.userId], (err, data) => {
        if (err) return res.json(err)
        if (data.length) {
            const { password, ...other } = data[0]
            res.status(200).json(other);
        }
    })
}