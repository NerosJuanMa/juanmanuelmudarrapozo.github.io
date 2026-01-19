// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import likesRoutes from './routes/likes.routes.js';

const PORT = 3000;
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.send('API Node + MySQL - LIKES');
});

// Rutas de la API
app.use('/api/likes', likesRoutes); 



app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});


