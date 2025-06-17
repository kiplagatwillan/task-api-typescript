import express from 'express';


const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Root route
app.get("/", (_req, res) => {
    res.send("<h1>Flashcards API in TS and Express</h1>");
});

// Flashcards route
app.get('/flashcards', async (_req, res) => {
    try {
        
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch flashcards" });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));