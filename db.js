import mysql from "mysql"
import { config } from 'dotenv'
config()

export const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    ssl: {
        rejectUnauthorized: false,
    }
})

