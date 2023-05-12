const express = require('express')
require('dotenv').config();
const cors = require('cors')
const path = require('path');
const asignarDB = require('./middlewares/asignar-db');
const DbConnectionFactory = require('./helpers/data/DbConnectionFactory');
//const morgan = require('morgan')


(async () => {
  await DbConnectionFactory.startAllConnections();

  const app = express();

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  //app.use(morgan("dev"))
  app.use(cors());


  app.use(asignarDB);

  app.use('/api/auth', require('./routes/auth.routes'))



  app.get('/test', function (req, res) {
    res.serverError('hello world');
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server started running on ${process.env.PORT} for ${process.env.NODE_ENV}`);
  });
})();