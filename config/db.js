const dotenv = require('dotenv');
dotenv.config();

const {Pool}= require('pg');

const pool = new Pool({
    dhost:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USERNAME,//correto apenas db_user NUNCA db_username
    database:process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
})

pool.connect().then(()=>console.log("Banco postgreSQL conectado"))
.catch(err=>(console.log("Banco não conetado, contate o suporte")));

pool.query(`
    SET search_path TO netflix, public`);

    module.exports=pool;


    
