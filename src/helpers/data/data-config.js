const options = {
  encrypt: true,
  enableArithAbort: false
}

//conecion a la base de datos main
const getDataConfig = () => ({
  kanba:{
    name: process.env.SQL_KANBA_NAME,
    config:{
      driver: process.env.SQL_KANBA_DRIVER,
      server: process.env.SQL_KANBA_SERVER,
      database: process.env.SQL_KANBA_DATABASE,
      user: process.env.SQL_KANBA_UID,
      password: process.env.SQL_KANBA_PWD,
      options: options
    }
  },
})

module.exports = getDataConfig