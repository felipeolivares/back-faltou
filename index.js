import express from "express";
import userRoutes from "./routes/users.js";
import subjectRoutes from "./routes/subjects.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3001);

app.use("/", userRoutes)
app.use("/calculation", subjectRoutes)

