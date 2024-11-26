import express from "express";
import cors from 'cors';
import routes from "./src/routes/postsRoutes.js";

const app = express();

const corsOptions = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200
}

app.use(express.json());
app.use(express.static('uploads'));
app.use(cors(corsOptions));

routes(app);

const port = 3000;

app.listen(port, () => console.log(`Servidor Escutando na porta ${port}!`));
