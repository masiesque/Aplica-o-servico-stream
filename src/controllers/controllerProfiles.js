const pool = require('../../config/db');
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");


const createProfile= async (req,res)=>
{
    try{
        const{name,avatar,kids,language} = req.body;

        const result = await pool.query(`INSERT INTO netflix.profiles (id_user,profile_name,avatar,kids,language)
            VALUES($1,$2,$3,$4,$5)
            RETURNING profile_name,avatar,kids,language`,
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
const uptadeProfile = async ( req,res)=>
        
    {
        try{

            const {profileId} = req.params//requição enviada como parametro pela rota;
            const{name,avatar,kids, language} = req.body;

            const result = pool.query(`
                UPDATE netflix.profiles
                SET profile_name= $1, avatar= $2, kids= $3, language= $4
                WHERE id_profile = $5, AND id_user = $6`,
            [name,avatar,kids,language,profileId,req.user.id]);

            if(result.rows[0]===0)
                return res.status(401).json({message:"Profile not founds"});

            res.status(200).json(result.rows[0]);
        }catch(err){
            res.status(500).json({erro:err.message});
        }
        
    }



module.exports={
    createProfile,
    getAllProfilesInOneUser,
    uptadeProfile,
    //deleteProfile,
};