const pool = require('../../config/db');
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");


const createProfile= async (req,res)=>
{
    try{
        const{name,avatar,kids,language} = req.body;

        const result = await pool.query(`INSERT INTO netflix.profiles (id_user,profile_name,avatar,kids,language)
            VALUES($1,%2,$3,$4,$5)
            RETURNING profile_name,avatar,kids,language`
        [req.user.id, name,avatar,kids,language])

        res.status(201).json(result.rows[0]);

    }catch(err)
    {
        res.status(500).json({erro:err.message});
    }
};


const getAllProfilesInOneUser = async(req,res)=>{
    try
    {
        const result= await pool.query(`
            SELECT * FROM netflix.profiles WHERE id_user = $1
            `,[req.user.id]);
    }

    catch(err)
    {
        res.status(500),json({erro:err.message});
    }


};


module.exports={
    createProfile,
    getAllProfilesInOneUser,
};