const express = require('express');
const router = express.Router();

//Rutas sin acceso
router.get('*', (req, res = express.response) => {
    res.send('<h1>404 - Content not found</h1>');
});

module.exports = router;