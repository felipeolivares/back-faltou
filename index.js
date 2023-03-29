import express from "express";
import userRoutes from "./routes/users.js";
import subjectRoutes from "./routes/subjects.js";
import cors from "cors";
import { config } from 'dotenv'
config()

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});

app.use("/", userRoutes)
app.use("/calculation", subjectRoutes)

