const express = require("express");
require("dotenv").config();
//app->aplication
const app= express();

app.use(express.json());

app.use("/", require("./routes/routeTotal"));




const port = process.env.PORT || 3000;
app.listen(port,()=>
{
    console.log("servidor conectado na porta:",port);
})