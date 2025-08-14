import express from 'express';
import Response_genrator from './Response_genrator.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Configure CORS to allow requests from your frontend URL
const corsOptions = {
    origin: 'https://chai-aur-baatcheet-app.onrender.com'
};

app.use(cors(corsOptions));
app.use(express.json());

app.post('/hiteshsir', async (req, res) => {
    const { question, history } = req.body;
    const response = await Response_genrator("Hitesh Choudhary", question, history);
    res.send(response);
});

app.post('/piyushsir', async (req, res) => {
    const { question, history } = req.body;
    const response = await Response_genrator("Piyush Garg", question, history);
    res.send(response);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});