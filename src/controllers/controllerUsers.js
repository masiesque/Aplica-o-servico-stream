const pool = require('../config/db');
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");


const createUser = async (req,res)=>{

    try{
        const {password,name,email}= req.body;
        
        const result= pool.query(`INSERT INTO netflix.users(name,password,email)
            VALUES($1,$2,$3)
            RETURNING *`,
            [name,password,email]);

            res.status(201).json(result.rows[0]);
    }catch(err)
    {
        res.status(500).jsop({erro:err.message});
    }
}



module.exports={
    createUser,
}