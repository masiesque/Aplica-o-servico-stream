const dotenv = require('dotenv');
dotenv.config();

const {Pool}= require('pg');

const pool = new Pool({
       db_host:process.env.DB_HOST,
    db_port:process.env.DB_PORT,
    db_username:process.env.DB_USERNAME,
    db_database:process.env.DB_DATABASE,
    db_password: process.env.DB_PASSWORD
})


    
