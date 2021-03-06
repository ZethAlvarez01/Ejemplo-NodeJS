const express = require('express');
const colors = require('colors');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const uuid = require('uuid');
const { format } = require('timeago.js');

//Inicializaciones
const app = express();
require('./database');

//Configuraciones
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','ejs');


//Middlewares
app.use(morgan('dev')); //que esta pasando en el server
app.use(express.urlencoded({extended: false}));
const storage  = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, uuid.v4() + path.extname(file.originalname));
    }
});

app.use(multer({
    storage: storage
}).single('image'));


//Variables globales
app.use((req,res,next) => {
    app.locals.format = format;
    next();
});

//Routes
app.use(require('./routes/index'));

//Archivos estaticos
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(__dirname + '/public'));             /// CARGO LA CARPETA PUBLIC PARA ARCHIVOS JS Y CSS

//Start server
app.listen(app.get('port'), ()=> {
    console.log('Server on'.green, app.get('port'));
    
});

app.use(function (req, res) {
    res.status(404).send('error');
});