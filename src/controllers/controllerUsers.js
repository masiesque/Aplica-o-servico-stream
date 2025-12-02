const pool = require('../../config/db');
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const createUser = async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const hashed = await bcrypt.hash(password, 10);

            const result = await pool.query(    
                `INSERT INTO netflix.users (name, email, password)
                 VALUES ($1, $2, $3)
                 RETURNING id, name, email`,
                [name, email, hashed]
            );

            res.status(201).json({
                user: result.rows[0],
                token: generateToken(result.rows[0].id),
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    };

    const loginUser = async(req, res)=>{

        try{

            const{email,password}=req.body;

            const result = await pool.query(`SELECT * FROM netflix.users 
                WHERE email = $1
                `,
                [email]);

                if (!email)
                    return res.status(401).json("User not found");
                
                const user = result.rows[0];

                const validation = await bcrypt.compare(password,user.password);

                if(!validation)
                {
                    res.status(400).json("Passowrd not found");
                }
                res.status(201).json(user,"Logado");

                const token = generateToken ;
                return res.status(201).json({
                    message:"login sucessfuly",
                    user:{
                        id:user.id,
                        name: user.name,
                        email: user.email
                    },
                    token: token
                });

        }catch(err){
            res.status(500).json({erro:err.message});
        }

    };


    

module.exports = {
    createUser,
    loginUser,
    
};


//LOGICA DE CRIAÇÃO E VERIFICAÇÃO DO TOKEN(ENTRE O MIDDLEWARE E O CONTROLLER):
// ┌──────────────────────────┐
// │        Usuário           │
// │   (faz login ou signup)  │
// └──────────────┬───────────┘
//                │ envia email/senha
//                ▼
//       ┌───────────────────────┐
//       │   CONTROLLER LOGIN    │
//       │  (ou CreateUser)      │
//       └──────────┬────────────┘
//                  │
//                  │ valida senha, pega user.id
//                  ▼
//       ┌───────────────────────┐
//       │     generateToken     │
//       │  (gera JWT com userID)│
//       └──────────┬────────────┘
//                  │
//                  │ devolve { user, token }
//                  ▼
// ┌─────────────────────────────────────┐
// │     Cliente recebe o TOKEN JWT      │
// │ (Postman, navegador, mobile, etc.)  │
// └───────────────┬────────────────────┘
//                 │
//                 │ envia requisição protegida
//                 │ com:
//                 │     Authorization: Bearer TOKEN
//                 ▼
//        ┌─────────────────────────┐
//        │     MIDDLEWARE AUTH     │
//        └───────────┬─────────────┘
//                    │ valida TOKEN
//                    │ jwt.verify()
//                    ▼
//        ┌─────────────────────────┐
//        │  Token válido?          │
//        └────────────┬────────────┘
//                     │
//             ┌───────┴───────────┐
//             │                   │
//          NÃO                    SIM
//             │                   │
//             ▼                   ▼
//  ┌───────────────────┐   ┌───────────────────────┐
//  │  401 Token inválido│   │ req.user.id = userId  │
//  └───────────────────┘   └───────────┬───────────┘
//                                      │ chama next()
//                                      ▼
//                          ┌──────────────────────────┐
//                          │   CONTROLLER PROTEGIDO   │
//                          │ (ex: createProfile)      │
//                          └───────────┬──────────────┘
//                                      │ usa req.user.id
//                                      ▼
//                          ┌──────────────────────────┐
//                          │   BANCO / LÓGICA FINAL   │
//                          └──────────────────────────┘

