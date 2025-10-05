import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/usersRoute.js';
import authRoutes from './routes/authRoute.js';
const app = express();

const PORT = process.env.PORT || 8800;
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);


app.listen(PORT,()=>console.log(`Server is running on ${PORT}`))