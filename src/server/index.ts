import express from 'express';
import path from 'path';
import contactRoutes from './routes/contactRoutes';
import { initializeDatabase } from './config/database';
import cartRoutes from './routes/cartRoutes';
import { initializeProducts } from './config/initData';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/styles', express.static(path.join(__dirname, '../../public/styles')));
app.use('/assets', express.static(path.join(__dirname, '../../public/assets')));
app.use(express.static('src/client/pages'));

initializeDatabase()
    .then(async () => {
        await initializeProducts();
        app.use('/api', cartRoutes);
        app.use('/api', contactRoutes);

        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/pages/index.html'));
        });

        app.listen(port, () => {
            console.log(`Serveur en cours d'exécution sur le port ${port}`);
        });
    })
    .catch(err => {
        console.error('Erreur d\'initialisation:', err);
    }); 