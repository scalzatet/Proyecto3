const router = require('express').Router();

const { vLogin } = require('../middlewares/user');

const access = require('../db/access/user');

router.post('/login', vLogin, async (req, res) => {
    //console.log(req.body);
    try {
        const user = await access.findUser(req.body);
        console.log(user);
    } catch (error) {
        res.send('mal');
    }
    /* console.log('Todo bien');
    res.send('Usuario y contraseña bien'); */
});




module.exports = router;

