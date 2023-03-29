import express from "express";
import userRoutes from "./routes/users.js";
import subjectRoutes from "./routes/subjects.js";
import cors from "cors";
import { config } from 'dotenv'
config()

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

app.use("/", userRoutes)
app.use("/calculation", subjectRoutes)

