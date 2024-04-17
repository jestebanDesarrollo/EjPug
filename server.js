const express = require('express');
const path = require('path') //esta linea es para el manejo de rutas.
const bodyParser = require('body-parser')//Sirve para enviar datos y formularios y json 
const dotenv = require('dotenv') //Manejo de variable de entorno
const app = express();

// arreglo de objetos

let users = [
    {username:'tv',password:'11',name:'Teresa Valencia'},
    {username:'fz',password:'22',name:'Faustino Zapata'},
]

// Settings
dotenv.config() //configura a dotenv para reconocer variables de entorno
app.set('view engine','pug'); // motor de plantillas
app.set('views','views'); // vistas, es decir donde se ubican los archivos pug.

// Middlewares
app.use(express.static('public')); // carpeta estatica para css, imagenes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({urlencoded:true})) //estas dos es para llevar informacion en formato json
port = process.env.PORT || 3000;

// endPoints
app.get('/',(req, res)=>{
    res.render('index')
})

app.get('/login',(req, res)=>{
    res.render('login',{errormess:""})
})

app.post('/login',(req, res)=>{
    let {username, password} = req.body
    let findUser = users.find(user => user.username === username && user.password === password);
    if (findUser !== undefined){
        let name = findUser.name
        res.render('profile',{name:name})
    }
    else{
        res.render('login',{errormess:"Usuario no Existe, Inténtelo con otro..."})
    }
})

app.listen(port, ()=>{
    console.log(`Server is running in http://localhost:${port}`)
})