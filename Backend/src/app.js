const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}))

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "healthy" })
})

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

/* Global Centralized Error Handling Middleware */
app.use((err, req, res, next) => {
    console.error("Centralized Error Handler:", err);
    
    const statusCode = err.status || err.statusCode || 500;
    const message = err.message || "An unexpected server error occurred.";
    
    res.status(statusCode).json({
        success: false,
        message,
        error: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
});

module.exports = app