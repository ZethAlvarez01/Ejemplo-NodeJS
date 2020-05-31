const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pinterest', {
    useNewUrlParser:  true
})
    .then(db => console.log('DB conectada'))
    .catch(err => console.log('Error al conectar db'));
