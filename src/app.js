const express = require("express");
//app->aplication
const app= express();

app.listen(3000,()=>
{
    console.log("servidor conectado na porta 3000");
})