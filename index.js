import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import tourismdb from './src/config/mysql.js';
import firebase from './src/config/firebase.js';
import dotenv  from 'dotenv';

dotenv.config();

const app = express();

const server = new ApolloServer({
  context: () => ({
    db: tourismdb,
    firebase
  }),
});

await server.start();
server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
