const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('index page');
});

router.get('/upload', (req, res) => {
    res.render('upload');
});

router.post('/upload', (req, res) => {
    console.log(req.file);
    res.send('uploads');
});

router.get('/image/:id',(req, res) => {
    res.send('imagen sola');
});

router.get('/image/:id/delete', (req, res) =>{
    res.send('delete');
});


module.exports = router;