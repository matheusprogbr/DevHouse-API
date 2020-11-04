import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';
import init from './services/mongo';

const server = express();

init();
server.use(cors());
server.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
server.use(express.json());
server.use(routes);

server.listen(3333, () => {
  console.log('Server is running!');
});
